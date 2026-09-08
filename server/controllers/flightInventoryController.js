import db from "../config/db.js";

const getCurrentSeller = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT
      id,
      user_id,
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

const getInventoryWithDetails = async (inventoryId) => {
  const [rows] = await db.execute(
    `
    SELECT
      fi.*,

      fs.departure_date,
      fs.departure_time,
      fs.arrival_time,
      fs.duration_minutes,
      fs.status AS schedule_status,

      fr.id AS route_id,
      fr.origin_code,
      fr.origin_name,
      fr.destination_code,
      fr.destination_name,
      fr.airline_name,
      fr.airline_code,
      fr.flight_number,

      fsl.id AS seller_id,
      fsl.business_name AS seller_business_name,
      fsl.verification_status,
      fsl.selling_enabled AS seller_selling_enabled

    FROM flight_inventory fi

    JOIN flight_schedules fs
      ON fs.id = fi.schedule_id

    JOIN flight_routes fr
      ON fr.id = fs.route_id

    JOIN flight_sellers fsl
      ON fsl.id = fr.seller_id

    WHERE fi.id = ?
    LIMIT 1
    `,
    [inventoryId]
  );

  return rows[0] || null;
};

// ============================================================
// CREATE INVENTORY
// ============================================================

export const createFlightInventory = async (req, res) => {
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
      schedule_id,
      cabin_class,
      total_seats,
      available_seats,
      booked_seats,
      currency,
      price_per_seat,
      selling_enabled,
      status,
    } = req.body;

    const scheduleId = Number(schedule_id);
    const totalSeats = Number(total_seats);
    const availableSeats =
      available_seats === undefined
        ? totalSeats
        : Number(available_seats);

    const bookedSeats =
      booked_seats === undefined
        ? 0
        : Number(booked_seats);

    const pricePerSeat = Number(price_per_seat);

    if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid schedule_id is required.",
      });
    }

    if (!Number.isInteger(totalSeats) || totalSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "total_seats must be greater than zero.",
      });
    }

    if (
      !Number.isInteger(availableSeats) ||
      availableSeats < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "available_seats must be zero or greater.",
      });
    }

    if (
      !Number.isInteger(bookedSeats) ||
      bookedSeats < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "booked_seats must be zero or greater.",
      });
    }

    if (availableSeats + bookedSeats > totalSeats) {
      return res.status(400).json({
        success: false,
        message:
          "Available seats plus booked seats cannot exceed total seats.",
      });
    }

    if (!Number.isFinite(pricePerSeat) || pricePerSeat < 0) {
      return res.status(400).json({
        success: false,
        message: "price_per_seat must be zero or greater.",
      });
    }

    const finalCabinClass = cabin_class || "economy";
    const finalCurrency = currency || "BDT";
    const finalStatus = status || "available";

    const allowedCabins = [
      "economy",
      "premium_economy",
      "business",
      "first",
    ];

    const allowedStatuses = [
      "available",
      "sold_out",
      "closed",
    ];

    if (!allowedCabins.includes(finalCabinClass)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cabin class.",
      });
    }

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inventory status.",
      });
    }

    // ----------------------------------------------------------
    // Verify schedule belongs to seller
    // ----------------------------------------------------------

    const [scheduleRows] = await db.execute(
      `
      SELECT
        fs.id,
        fs.route_id,
        fs.status,
        fs.is_active,
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

    if (scheduleRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight schedule not found.",
      });
    }

    const schedule = scheduleRows[0];

    if (!schedule.is_active) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot create inventory for an inactive schedule.",
      });
    }

    if (schedule.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Cannot create inventory for a cancelled schedule.",
      });
    }

    // ----------------------------------------------------------
    // Prevent duplicate cabin inventory
    // ----------------------------------------------------------

    const [existingRows] = await db.execute(
      `
      SELECT id
      FROM flight_inventory
      WHERE schedule_id = ?
        AND cabin_class = ?
      LIMIT 1
      `,
      [scheduleId, finalCabinClass]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Inventory already exists for this schedule and cabin class.",
      });
    }

    const finalSellingEnabled =
      selling_enabled === undefined
        ? true
        : Boolean(selling_enabled);

    const finalInventoryStatus =
      availableSeats === 0
        ? "sold_out"
        : finalStatus;

    const [result] = await db.execute(
      `
      INSERT INTO flight_inventory (
        schedule_id,
        cabin_class,
        total_seats,
        available_seats,
        booked_seats,
        currency,
        price_per_seat,
        selling_enabled,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        scheduleId,
        finalCabinClass,
        totalSeats,
        availableSeats,
        bookedSeats,
        finalCurrency.toUpperCase(),
        pricePerSeat,
        finalSellingEnabled ? 1 : 0,
        finalInventoryStatus,
      ]
    );

    const inventory = await getInventoryWithDetails(
      result.insertId
    );

    return res.status(201).json({
      success: true,
      message:
        "Flight inventory created successfully.",
      data: inventory,
    });
  } catch (error) {
    console.error("Create Flight Inventory Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while creating flight inventory.",
    });
  }
};

// ============================================================
// GET MY INVENTORY
// ============================================================

export const getMyFlightInventory = async (req, res) => {
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
        fi.*,

        fs.departure_date,
        fs.departure_time,
        fs.arrival_time,
        fs.duration_minutes,
        fs.status AS schedule_status,

        fr.id AS route_id,
        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,
        fr.airline_name,
        fr.airline_code,
        fr.flight_number

      FROM flight_inventory fi

      JOIN flight_schedules fs
        ON fs.id = fi.schedule_id

      JOIN flight_routes fr
        ON fr.id = fs.route_id

      WHERE fr.seller_id = ?

      ORDER BY fs.departure_time ASC, fi.cabin_class ASC
      `,
      [seller.id]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get Flight Inventory Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while fetching flight inventory.",
    });
  }
};

// ============================================================
// UPDATE INVENTORY
// ============================================================

export const updateFlightInventory = async (req, res) => {
  try {
    const userId = req.user?.id;
    const inventoryId = Number(req.params.id);

    if (
      !Number.isInteger(inventoryId) ||
      inventoryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inventory ID.",
      });
    }

    const seller = await getCurrentSeller(userId);

    const sellerError = checkSellerAccess(seller);

    if (sellerError) {
      return res.status(seller ? 403 : 404).json({
        success: false,
        message: sellerError,
      });
    }

    const [existingRows] = await db.execute(
      `
      SELECT
        fi.*,
        fr.seller_id
      FROM flight_inventory fi
      JOIN flight_schedules fs
        ON fs.id = fi.schedule_id
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fi.id = ?
        AND fr.seller_id = ?
      LIMIT 1
      `,
      [inventoryId, seller.id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight inventory not found.",
      });
    }

    const current = existingRows[0];

    const {
      total_seats,
      available_seats,
      booked_seats,
      currency,
      price_per_seat,
      selling_enabled,
      status,
    } = req.body;

    const finalTotalSeats =
      total_seats === undefined
        ? current.total_seats
        : Number(total_seats);

    const finalBookedSeats =
      booked_seats === undefined
        ? current.booked_seats
        : Number(booked_seats);

    const finalAvailableSeats =
      available_seats === undefined
        ? current.available_seats
        : Number(available_seats);

    const finalPrice =
      price_per_seat === undefined
        ? Number(current.price_per_seat)
        : Number(price_per_seat);

    if (
      !Number.isInteger(finalTotalSeats) ||
      finalTotalSeats <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "total_seats must be greater than zero.",
      });
    }

    if (
      !Number.isInteger(finalAvailableSeats) ||
      finalAvailableSeats < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "available_seats must be zero or greater.",
      });
    }

    if (
      !Number.isInteger(finalBookedSeats) ||
      finalBookedSeats < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "booked_seats must be zero or greater.",
      });
    }

    if (
      finalAvailableSeats + finalBookedSeats >
      finalTotalSeats
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Available seats plus booked seats cannot exceed total seats.",
      });
    }

    if (!Number.isFinite(finalPrice) || finalPrice < 0) {
      return res.status(400).json({
        success: false,
        message:
          "price_per_seat must be zero or greater.",
      });
    }

    const finalCurrency =
      currency === undefined
        ? current.currency
        : String(currency).trim().toUpperCase();

    const finalSellingEnabled =
      selling_enabled === undefined
        ? Boolean(current.selling_enabled)
        : Boolean(selling_enabled);

    const finalStatus =
      status === undefined
        ? current.status
        : status;

    const allowedStatuses = [
      "available",
      "sold_out",
      "closed",
    ];

    if (!allowedStatuses.includes(finalStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inventory status.",
      });
    }

    const calculatedStatus =
      finalAvailableSeats === 0
        ? "sold_out"
        : finalStatus === "sold_out"
          ? "available"
          : finalStatus;

    await db.execute(
      `
      UPDATE flight_inventory
      SET
        total_seats = ?,
        available_seats = ?,
        booked_seats = ?,
        currency = ?,
        price_per_seat = ?,
        selling_enabled = ?,
        status = ?
      WHERE id = ?
      `,
      [
        finalTotalSeats,
        finalAvailableSeats,
        finalBookedSeats,
        finalCurrency,
        finalPrice,
        finalSellingEnabled ? 1 : 0,
        calculatedStatus,
        inventoryId,
      ]
    );

    const inventory =
      await getInventoryWithDetails(inventoryId);

    return res.status(200).json({
      success: true,
      message:
        "Flight inventory updated successfully.",
      data: inventory,
    });
  } catch (error) {
    console.error("Update Flight Inventory Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while updating flight inventory.",
    });
  }
};

// ============================================================
// TOGGLE INVENTORY SELLING
// ============================================================

export const toggleFlightInventorySelling = async (
  req,
  res
) => {
  try {
    const userId = req.user?.id;
    const inventoryId = Number(req.params.id);

    if (
      !Number.isInteger(inventoryId) ||
      inventoryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inventory ID.",
      });
    }

    const seller = await getCurrentSeller(userId);

    const sellerError = checkSellerAccess(seller);

    if (sellerError) {
      return res.status(seller ? 403 : 404).json({
        success: false,
        message: sellerError,
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        fi.id,
        fi.selling_enabled,
        fi.available_seats,
        fi.status,
        fr.seller_id
      FROM flight_inventory fi
      JOIN flight_schedules fs
        ON fs.id = fi.schedule_id
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fi.id = ?
        AND fr.seller_id = ?
      LIMIT 1
      `,
      [inventoryId, seller.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight inventory not found.",
      });
    }

    const inventory = rows[0];

    if (
      !inventory.selling_enabled &&
      inventory.available_seats <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot enable selling because no seats are available.",
      });
    }

    const newSellingStatus =
      inventory.selling_enabled ? 0 : 1;

    await db.execute(
      `
      UPDATE flight_inventory
      SET
        selling_enabled = ?
      WHERE id = ?
      `,
      [newSellingStatus, inventoryId]
    );

    const updatedInventory =
      await getInventoryWithDetails(inventoryId);

    return res.status(200).json({
      success: true,
      message: newSellingStatus
        ? "Flight inventory selling has been enabled."
        : "Flight inventory selling has been disabled.",
      data: updatedInventory,
    });
  } catch (error) {
    console.error(
      "Toggle Flight Inventory Selling Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while toggling inventory selling.",
    });
  }
};

// ============================================================
// DELETE INVENTORY
// ============================================================

export const deleteFlightInventory = async (req, res) => {
  try {
    const userId = req.user?.id;
    const inventoryId = Number(req.params.id);

    if (
      !Number.isInteger(inventoryId) ||
      inventoryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inventory ID.",
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
      DELETE fi
      FROM flight_inventory fi
      JOIN flight_schedules fs
        ON fs.id = fi.schedule_id
      JOIN flight_routes fr
        ON fr.id = fs.route_id
      WHERE fi.id = ?
        AND fr.seller_id = ?
      `,
      [inventoryId, seller.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight inventory not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Flight inventory deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Flight Inventory Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while deleting flight inventory.",
    });
  }
};