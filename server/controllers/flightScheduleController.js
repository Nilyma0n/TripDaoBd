import db from "../config/db.js";

const getCurrentSeller = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      user_id,
      business_name,
      verification_status,
      selling_enabled,
      is_active
    FROM flight_sellers
    WHERE user_id = ?
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
};

const checkSellerAccess = (seller) => {
  if (!seller) {
    return "Flight seller profile not found.";
  }

  if (!seller.is_active) {
    return "Your flight seller account is inactive.";
  }

  if (seller.verification_status !== "approved") {
    return "Your flight seller account is not approved yet.";
  }

  if (!seller.selling_enabled) {
    return "Flight selling is currently disabled for your account.";
  }

  return null;
};

const calculateDurationMinutes = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const difference = arrival.getTime() - departure.getTime();

  if (!Number.isFinite(difference) || difference <= 0) {
    return null;
  }

  return Math.round(difference / (1000 * 60));
};

// ============================================================
// CREATE FLIGHT SCHEDULE
// ============================================================

export const createFlightSchedule = async (req, res) => {
  try {
    const userId = req.user?.id;

    const seller = await getCurrentSeller(userId);
    const sellerError = checkSellerAccess(seller);

    if (sellerError) {
      return res.status(seller ? 403 : 404).json({
        success: false,
        message: sellerError,
      });
    }

    const {
      route_id,
      departure_date,
      departure_time,
      arrival_time,
      duration_minutes,
      status,
      is_active,
    } = req.body;

    const routeId = Number(route_id);

    if (!Number.isInteger(routeId) || routeId <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid route_id is required.",
      });
    }

    if (!departure_date || !departure_time || !arrival_time) {
      return res.status(400).json({
        success: false,
        message:
          "departure_date, departure_time and arrival_time are required.",
      });
    }

    // ----------------------------------------------------------
    // Verify route belongs to current seller
    // ----------------------------------------------------------

    const [routeRows] = await db.execute(
      `
      SELECT
        id,
        seller_id,
        origin_code,
        destination_code,
        airline_name,
        flight_number,
        is_active
      FROM flight_routes
      WHERE id = ?
        AND seller_id = ?
      LIMIT 1
      `,
      [routeId, seller.id]
    );

    if (routeRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight route not found.",
      });
    }

    const route = routeRows[0];

    if (!route.is_active) {
      return res.status(400).json({
        success: false,
        message: "Cannot create a schedule for an inactive route.",
      });
    }

    // ----------------------------------------------------------
    // Calculate duration automatically if not supplied
    // ----------------------------------------------------------

    const departureDateTime = `${departure_date} ${departure_time}`;
    const arrivalDateTime = `${departure_date} ${arrival_time}`;

    let finalDuration = duration_minutes
      ? Number(duration_minutes)
      : calculateDurationMinutes(
          departureDateTime,
          arrivalDateTime
        );

    // Handle flights arriving after midnight
    if (
      !duration_minutes &&
      finalDuration === null
    ) {
      const nextDayArrival = new Date(
        `${departure_date} ${arrival_time}`
      );

      nextDayArrival.setDate(nextDayArrival.getDate() + 1);

      finalDuration = calculateDurationMinutes(
        departureDateTime,
        nextDayArrival
      );
    }

    if (
      finalDuration === null ||
      !Number.isFinite(finalDuration) ||
      finalDuration <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid departure/arrival time. Duration must be greater than zero.",
      });
    }

    const finalStatus = status || "scheduled";
    const finalIsActive =
      is_active === undefined ? true : Boolean(is_active);

    const allowedStatuses = [
      "scheduled",
      "boarding",
      "departed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid schedule status.",
      });
    }

    // ----------------------------------------------------------
    // Prevent duplicate schedule
    // ----------------------------------------------------------

    const [duplicateRows] = await db.execute(
      `
      SELECT id
      FROM flight_schedules
      WHERE route_id = ?
        AND departure_time = ?
      LIMIT 1
      `,
      [routeId, departureDateTime]
    );

    if (duplicateRows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "A schedule already exists for this route and departure time.",
      });
    }

    // ----------------------------------------------------------
    // Create schedule
    // ----------------------------------------------------------

    const [result] = await db.execute(
      `
      INSERT INTO flight_schedules (
        route_id,
        departure_date,
        departure_time,
        arrival_time,
        duration_minutes,
        status,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        routeId,
        departure_date,
        departureDateTime,
        arrivalDateTime,
        finalDuration,
        finalStatus,
        finalIsActive ? 1 : 0,
      ]
    );

    const [rows] = await db.execute(
      `
      SELECT
        fs.*,
        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,
        fr.airline_name,
        fr.airline_code,
        fr.flight_number
      FROM flight_schedules fs
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fs.id = ?
      `,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Flight schedule created successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Create Flight Schedule Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while creating flight schedule.",
    });
  }
};

// ============================================================
// GET MY FLIGHT SCHEDULES
// ============================================================

export const getMyFlightSchedules = async (req, res) => {
  try {
    const userId = req.user?.id;

    const seller = await getCurrentSeller(userId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        fs.*,
        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,
        fr.airline_name,
        fr.airline_code,
        fr.flight_number
      FROM flight_schedules fs
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fr.seller_id = ?
      ORDER BY fs.departure_time ASC
      `,
      [seller.id]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get Flight Schedules Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching flight schedules.",
    });
  }
};

// ============================================================
// UPDATE FLIGHT SCHEDULE
// ============================================================

export const updateFlightSchedule = async (req, res) => {
  try {
    const userId = req.user?.id;
    const scheduleId = Number(req.params.id);

    if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule ID.",
      });
    }

    const seller = await getCurrentSeller(userId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    const [existingRows] = await db.execute(
      `
      SELECT
        fs.*,
        fr.seller_id
      FROM flight_schedules fs
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fs.id = ?
        AND fr.seller_id = ?
      LIMIT 1
      `,
      [scheduleId, seller.id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight schedule not found.",
      });
    }

    const current = existingRows[0];

    const {
      departure_date,
      departure_time,
      arrival_time,
      duration_minutes,
      status,
      is_active,
    } = req.body;

    const finalDepartureDate =
      departure_date || current.departure_date;

    const currentDepartureTime = new Date(
      current.departure_time
    );

    const currentArrivalTime = new Date(
      current.arrival_time
    );

    const formattedCurrentDepartureTime =
      currentDepartureTime
        .toISOString()
        .slice(11, 19);

    const formattedCurrentArrivalTime =
      currentArrivalTime
        .toISOString()
        .slice(11, 19);

    const finalDepartureTime =
      departure_time || formattedCurrentDepartureTime;

    const finalArrivalTime =
      arrival_time || formattedCurrentArrivalTime;

    const finalDepartureDateTime =
      `${finalDepartureDate} ${finalDepartureTime}`;

    const finalArrivalDateTime =
      `${finalDepartureDate} ${finalArrivalTime}`;

    let finalDuration =
      duration_minutes !== undefined
        ? Number(duration_minutes)
        : calculateDurationMinutes(
            finalDepartureDateTime,
            finalArrivalDateTime
          );

    if (
      finalDuration === null ||
      !Number.isFinite(finalDuration) ||
      finalDuration <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid departure/arrival time.",
      });
    }

    const allowedStatuses = [
      "scheduled",
      "boarding",
      "departed",
      "completed",
      "cancelled",
    ];

    const finalStatus =
      status || current.status;

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule status.",
      });
    }

    const finalIsActive =
      is_active === undefined
        ? Boolean(current.is_active)
        : Boolean(is_active);

    await db.execute(
      `
      UPDATE flight_schedules
      SET
        departure_date = ?,
        departure_time = ?,
        arrival_time = ?,
        duration_minutes = ?,
        status = ?,
        is_active = ?
      WHERE id = ?
      `,
      [
        finalDepartureDate,
        finalDepartureDateTime,
        finalArrivalDateTime,
        finalDuration,
        finalStatus,
        finalIsActive ? 1 : 0,
        scheduleId,
      ]
    );

    const [rows] = await db.execute(
      `
      SELECT
        fs.*,
        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,
        fr.airline_name,
        fr.airline_code,
        fr.flight_number
      FROM flight_schedules fs
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fs.id = ?
      `,
      [scheduleId]
    );

    return res.status(200).json({
      success: true,
      message: "Flight schedule updated successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Update Flight Schedule Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while updating flight schedule.",
    });
  }
};

// ============================================================
// DELETE FLIGHT SCHEDULE
// ============================================================

export const deleteFlightSchedule = async (req, res) => {
  try {
    const userId = req.user?.id;
    const scheduleId = Number(req.params.id);

    if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid schedule ID.",
      });
    }

    const seller = await getCurrentSeller(userId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    const [result] = await db.execute(
      `
      DELETE fs
      FROM flight_schedules fs
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fs.id = ?
        AND fr.seller_id = ?
      `,
      [scheduleId, seller.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight schedule not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flight schedule deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Flight Schedule Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while deleting flight schedule.",
    });
  }
};