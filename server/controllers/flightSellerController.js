import db from "../config/db.js";

// =====================================================
// FLIGHT SELLER CONTROLLER
// =====================================================

// -----------------------------------------------------
// POST /api/flight-sellers/register
// Register current authenticated user as a flight seller
// -----------------------------------------------------

export const registerFlightSeller = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      business_name,
      seller_type = "travel_agency",
      contact_person,
      business_email,
      business_phone,
      address,
      city,
    } = req.body;

    if (!business_name || !business_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Business name is required.",
      });
    }

    // -------------------------------------------------
    // Check whether user already has a seller profile
    // -------------------------------------------------

    const [existingSeller] = await db.execute(
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

    if (existingSeller.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You already have a flight seller profile.",
        seller: existingSeller[0],
      });
    }

    // -------------------------------------------------
    // Create seller
    // -------------------------------------------------

    const [result] = await db.execute(
      `
      INSERT INTO flight_sellers (
        user_id,
        business_name,
        seller_type,
        contact_person,
        business_email,
        business_phone,
        address,
        city,
        verification_status,
        selling_enabled,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, 1)
      `,
      [
        userId,
        business_name.trim(),
        seller_type,
        contact_person || null,
        business_email || null,
        business_phone || null,
        address || null,
        city || null,
      ]
    );

    const [sellerRows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        seller_type,
        contact_person,
        business_email,
        business_phone,
        address,
        city,
        verification_status,
        selling_enabled,
        admin_notes,
        is_active,
        created_at,
        updated_at
      FROM flight_sellers
      WHERE id = ?
      `,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message:
        "Flight seller application submitted successfully. Please wait for admin verification.",
      seller: sellerRows[0],
    });
  } catch (error) {
    console.error("Register Flight Seller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while registering flight seller.",
    });
  }
};

// -----------------------------------------------------
// GET /api/flight-sellers/me
// Get current user's seller profile
// -----------------------------------------------------

export const getMyFlightSeller = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        seller_type,
        contact_person,
        business_email,
        business_phone,
        address,
        city,
        verification_status,
        selling_enabled,
        admin_notes,
        is_active,
        created_at,
        updated_at
      FROM flight_sellers
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    return res.json({
      success: true,
      seller: rows[0],
    });
  } catch (error) {
    console.error("Get My Flight Seller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching flight seller profile.",
    });
  }
};

// -----------------------------------------------------
// PUT /api/flight-sellers/me
// Update current user's seller profile
// -----------------------------------------------------

export const updateMyFlightSeller = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      business_name,
      seller_type,
      contact_person,
      business_email,
      business_phone,
      address,
      city,
    } = req.body;

    if (!business_name || !business_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Business name is required.",
      });
    }

    // -------------------------------------------------
    // Only allow seller-owned profile fields to change.
    //
    // verification_status
    // selling_enabled
    // admin_notes
    // is_active
    //
    // cannot be changed by seller.
    // -------------------------------------------------

    const [result] = await db.execute(
      `
      UPDATE flight_sellers
      SET
        business_name = ?,
        seller_type = ?,
        contact_person = ?,
        business_email = ?,
        business_phone = ?,
        address = ?,
        city = ?
      WHERE user_id = ?
      `,
      [
        business_name.trim(),
        seller_type || "travel_agency",
        contact_person || null,
        business_email || null,
        business_phone || null,
        address || null,
        city || null,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight seller profile not found.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        seller_type,
        contact_person,
        business_email,
        business_phone,
        address,
        city,
        verification_status,
        selling_enabled,
        admin_notes,
        is_active,
        created_at,
        updated_at
      FROM flight_sellers
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );

    return res.json({
      success: true,
      message: "Flight seller profile updated successfully.",
      seller: rows[0],
    });
  } catch (error) {
    console.error("Update My Flight Seller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating flight seller profile.",
    });
  }
};

// =====================================================
// ADMIN
// =====================================================

// -----------------------------------------------------
// GET /api/flight-sellers/admin/all
// -----------------------------------------------------

export const getAllFlightSellers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT
        fs.id,
        fs.user_id,
        fs.business_name,
        fs.seller_type,
        fs.contact_person,
        fs.business_email,
        fs.business_phone,
        fs.address,
        fs.city,
        fs.verification_status,
        fs.selling_enabled,
        fs.admin_notes,
        fs.is_active,
        fs.created_at,
        fs.updated_at,
        u.full_name,
        u.email
      FROM flight_sellers fs
      JOIN users u
        ON u.id = fs.user_id
      ORDER BY fs.created_at DESC
      `
    );

    return res.json({
      success: true,
      count: rows.length,
      sellers: rows,
    });
  } catch (error) {
    console.error("Get All Flight Sellers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching flight sellers.",
    });
  }
};

// -----------------------------------------------------
// PUT /api/flight-sellers/admin/:id/approve
// -----------------------------------------------------

export const approveFlightSeller = async (req, res) => {
  try {
    const sellerId = Number(req.params.id);

    if (!Number.isInteger(sellerId) || sellerId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE flight_sellers
      SET
        verification_status = 'approved',
        admin_notes = NULL
      WHERE id = ?
      `,
      [sellerId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight seller not found.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        seller_type,
        verification_status,
        selling_enabled,
        is_active,
        updated_at
      FROM flight_sellers
      WHERE id = ?
      `,
      [sellerId]
    );

    return res.json({
      success: true,
      message: "Flight seller approved successfully.",
      seller: rows[0],
    });
  } catch (error) {
    console.error("Approve Flight Seller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while approving flight seller.",
    });
  }
};

// -----------------------------------------------------
// PUT /api/flight-sellers/admin/:id/reject
// -----------------------------------------------------

export const rejectFlightSeller = async (req, res) => {
  try {
    const sellerId = Number(req.params.id);
    const { admin_notes } = req.body;

    if (!Number.isInteger(sellerId) || sellerId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE flight_sellers
      SET
        verification_status = 'rejected',
        selling_enabled = 0,
        admin_notes = ?
      WHERE id = ?
      `,
      [admin_notes || null, sellerId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight seller not found.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        seller_type,
        verification_status,
        selling_enabled,
        admin_notes,
        is_active,
        updated_at
      FROM flight_sellers
      WHERE id = ?
      `,
      [sellerId]
    );

    return res.json({
      success: true,
      message: "Flight seller rejected successfully.",
      seller: rows[0],
    });
  } catch (error) {
    console.error("Reject Flight Seller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while rejecting flight seller.",
    });
  }
};

// -----------------------------------------------------
// PUT /api/flight-sellers/admin/:id/toggle-selling
// -----------------------------------------------------

export const toggleFlightSellerSelling = async (req, res) => {
  try {
    const sellerId = Number(req.params.id);

    if (!Number.isInteger(sellerId) || sellerId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID.",
      });
    }

    const [sellerRows] = await db.execute(
      `
      SELECT
        id,
        verification_status,
        selling_enabled,
        is_active
      FROM flight_sellers
      WHERE id = ?
      LIMIT 1
      `,
      [sellerId]
    );

    if (sellerRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Flight seller not found.",
      });
    }

    const seller = sellerRows[0];

    // -------------------------------------------------
    // Only approved + active seller can sell flights.
    // -------------------------------------------------

    if (seller.verification_status !== "approved") {
      return res.status(400).json({
        success: false,
        message:
          "Only an approved flight seller can have selling enabled.",
      });
    }

    if (!seller.is_active) {
      return res.status(400).json({
        success: false,
        message:
          "This flight seller is inactive and cannot sell flights.",
      });
    }

    const newSellingStatus = seller.selling_enabled ? 0 : 1;

    await db.execute(
      `
      UPDATE flight_sellers
      SET selling_enabled = ?
      WHERE id = ?
      `,
      [newSellingStatus, sellerId]
    );

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        business_name,
        verification_status,
        selling_enabled,
        is_active,
        updated_at
      FROM flight_sellers
      WHERE id = ?
      `,
      [sellerId]
    );

    return res.json({
      success: true,
      message: newSellingStatus
        ? "Flight seller selling has been enabled."
        : "Flight seller selling has been disabled.",
      seller: rows[0],
    });
  } catch (error) {
    console.error("Toggle Flight Seller Selling Error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while changing flight seller selling status.",
    });
  }
};