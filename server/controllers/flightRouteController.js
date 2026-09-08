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

const validateRouteData = ({
  origin_code,
  origin_name,
  destination_code,
  destination_name,
  airline_name,
}) => {
  if (
    !origin_code ||
    !origin_name ||
    !destination_code ||
    !destination_name ||
    !airline_name
  ) {
    return "origin_code, origin_name, destination_code, destination_name and airline_name are required.";
  }

  if (
    String(origin_code).length > 10 ||
    String(destination_code).length > 10
  ) {
    return "Airport codes must not exceed 10 characters.";
  }

  if (String(origin_code).toUpperCase() === String(destination_code).toUpperCase()) {
    return "Origin and destination cannot be the same.";
  }

  return null;
};

// ============================================================
// CREATE ROUTE
// ============================================================

export const createFlightRoute = async (req, res) => {
  try {
    const userId = req.user?.id;

    const seller = await getCurrentSeller(userId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    if (!seller.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your flight seller account is inactive.",
      });
    }

    if (seller.verification_status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your flight seller account is not approved yet.",
      });
    }

    if (!seller.selling_enabled) {
      return res.status(403).json({
        success: false,
        message: "Flight selling is currently disabled for your account.",
      });
    }

    const {
      origin_code,
      origin_name,
      destination_code,
      destination_name,
      airline_name,
      airline_code,
      flight_number,
    } = req.body;

    const validationError = validateRouteData({
      origin_code,
      origin_name,
      destination_code,
      destination_name,
      airline_name,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO flight_routes (
        seller_id,
        origin_code,
        origin_name,
        destination_code,
        destination_name,
        airline_name,
        airline_code,
        flight_number,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
      `,
      [
        seller.id,
        String(origin_code).trim().toUpperCase(),
        String(origin_name).trim(),
        String(destination_code).trim().toUpperCase(),
        String(destination_name).trim(),
        String(airline_name).trim(),
        airline_code ? String(airline_code).trim().toUpperCase() : null,
        flight_number ? String(flight_number).trim() : null,
      ]
    );

    const [rows] = await db.execute(
      `
      SELECT *
      FROM flight_routes
      WHERE id = ?
      `,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Flight route created successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Create Flight Route Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating flight route.",
    });
  }
};

// ============================================================
// GET MY ROUTES
// ============================================================

export const getMyFlightRoutes = async (req, res) => {
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
        fr.*,
        fs.verification_status,
        fs.selling_enabled AS seller_selling_enabled
      FROM flight_routes fr
      JOIN flight_sellers fs
        ON fs.id = fr.seller_id
      WHERE fr.seller_id = ?
      ORDER BY fr.created_at DESC
      `,
      [seller.id]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get My Flight Routes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching flight routes.",
    });
  }
};

// ============================================================
// UPDATE ROUTE
// ============================================================

export const updateFlightRoute = async (req, res) => {
  try {
    const userId = req.user?.id;
    const routeId = Number(req.params.id);

    if (!Number.isInteger(routeId) || routeId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid route ID.",
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
      SELECT *
      FROM flight_routes
      WHERE id = ?
        AND seller_id = ?
      LIMIT 1
      `,
      [routeId, seller.id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight route not found.",
      });
    }

    const {
      origin_code,
      origin_name,
      destination_code,
      destination_name,
      airline_name,
      airline_code,
      flight_number,
      is_active,
    } = req.body;

    const current = existingRows[0];

    const updated = {
      origin_code:
        origin_code !== undefined
          ? String(origin_code).trim().toUpperCase()
          : current.origin_code,

      origin_name:
        origin_name !== undefined
          ? String(origin_name).trim()
          : current.origin_name,

      destination_code:
        destination_code !== undefined
          ? String(destination_code).trim().toUpperCase()
          : current.destination_code,

      destination_name:
        destination_name !== undefined
          ? String(destination_name).trim()
          : current.destination_name,

      airline_name:
        airline_name !== undefined
          ? String(airline_name).trim()
          : current.airline_name,

      airline_code:
        airline_code !== undefined
          ? airline_code
            ? String(airline_code).trim().toUpperCase()
            : null
          : current.airline_code,

      flight_number:
        flight_number !== undefined
          ? flight_number
            ? String(flight_number).trim()
            : null
          : current.flight_number,

      is_active:
        is_active !== undefined
          ? Boolean(is_active)
          : current.is_active,
    };

    const validationError = validateRouteData(updated);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    await db.execute(
      `
      UPDATE flight_routes
      SET
        origin_code = ?,
        origin_name = ?,
        destination_code = ?,
        destination_name = ?,
        airline_name = ?,
        airline_code = ?,
        flight_number = ?,
        is_active = ?
      WHERE id = ?
        AND seller_id = ?
      `,
      [
        updated.origin_code,
        updated.origin_name,
        updated.destination_code,
        updated.destination_name,
        updated.airline_name,
        updated.airline_code,
        updated.flight_number,
        updated.is_active ? 1 : 0,
        routeId,
        seller.id,
      ]
    );

    const [rows] = await db.execute(
      `
      SELECT *
      FROM flight_routes
      WHERE id = ?
      `,
      [routeId]
    );

    return res.status(200).json({
      success: true,
      message: "Flight route updated successfully.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Update Flight Route Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating flight route.",
    });
  }
};

// ============================================================
// DELETE ROUTE
// ============================================================

export const deleteFlightRoute = async (req, res) => {
  try {
    const userId = req.user?.id;
    const routeId = Number(req.params.id);

    if (!Number.isInteger(routeId) || routeId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid route ID.",
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
      DELETE FROM flight_routes
      WHERE id = ?
        AND seller_id = ?
      `,
      [routeId, seller.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight route not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flight route deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Flight Route Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting flight route.",
    });
  }
};