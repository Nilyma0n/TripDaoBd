import pool from "../config/db.js";

// =====================================================
// GET MY PAYMENT METHODS
// GET /api/payment-methods
// =====================================================

export const getMyPaymentMethods = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    const [rows] = await pool.query(
      `
      SELECT
        id,
        method_type,
        account_name,
        account_number,
        provider,
        is_default,
        created_at
      FROM payment_methods
      WHERE user_id = ?
      ORDER BY is_default DESC, created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      paymentMethods: rows,
    });
  } catch (error) {
    console.error("Get Payment Methods Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load payment methods.",
      error: error.message,
    });
  }
};

// =====================================================
// ADD PAYMENT METHOD
// POST /api/payment-methods
// =====================================================

export const addPaymentMethod = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    const {
      method_type,
      account_name,
      account_number,
      provider,
      is_default,
    } = req.body;

    // -------------------------------------------------
    // Normalize values
    // -------------------------------------------------

    const normalizedMethodType =
      typeof method_type === "string"
        ? method_type.trim().toLowerCase()
        : "";

    const normalizedAccountName =
      typeof account_name === "string"
        ? account_name.trim()
        : "";

    const normalizedAccountNumber =
      typeof account_number === "string"
        ? account_number.trim()
        : String(account_number ?? "").trim();

    const normalizedProvider =
      typeof provider === "string"
        ? provider.trim()
        : "";

    // -------------------------------------------------
    // Required field validation
    // -------------------------------------------------

    if (
      !normalizedMethodType ||
      !normalizedAccountName ||
      !normalizedAccountNumber
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Method type, account name and account number are required.",
      });
    }

    // -------------------------------------------------
    // Validate payment method
    // -------------------------------------------------

    const allowedMethods = [
      "bkash",
      "nagad",
      "card",
      "bank",
    ];

    if (!allowedMethods.includes(normalizedMethodType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment method. Allowed methods are bkash, nagad, card and bank.",
      });
    }

    // -------------------------------------------------
    // Validate account name
    // -------------------------------------------------

    if (normalizedAccountName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Account name must contain at least 2 characters.",
      });
    }

    // -------------------------------------------------
    // Validate account number
    // -------------------------------------------------

    if (
      normalizedAccountNumber.length < 4 ||
      normalizedAccountNumber.length > 50
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Account number must be between 4 and 50 characters.",
      });
    }

    // -------------------------------------------------
    // Check existing payment methods
    // -------------------------------------------------

    const [existingMethods] = await pool.query(
      `
      SELECT
        id,
        is_default
      FROM payment_methods
      WHERE user_id = ?
      ORDER BY is_default DESC, created_at DESC
      `,
      [userId]
    );

    const hasExistingMethods = existingMethods.length > 0;
    const hasDefaultMethod = existingMethods.some(
      (method) => Boolean(method.is_default)
    );

    // -------------------------------------------------
    // First payment method automatically becomes default
    // -------------------------------------------------

    const shouldBeDefault =
      !hasExistingMethods || Boolean(is_default);

    // -------------------------------------------------
    // If new method is default, remove old default
    // -------------------------------------------------

    if (shouldBeDefault && hasDefaultMethod) {
      await pool.query(
        `
        UPDATE payment_methods
        SET is_default = FALSE
        WHERE user_id = ?
        `,
        [userId]
      );
    }

    // -------------------------------------------------
    // Insert payment method
    // -------------------------------------------------

    const [result] = await pool.query(
      `
      INSERT INTO payment_methods
      (
        user_id,
        method_type,
        account_name,
        account_number,
        provider,
        is_default
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        normalizedMethodType,
        normalizedAccountName,
        normalizedAccountNumber,
        normalizedProvider || null,
        shouldBeDefault,
      ]
    );

    // -------------------------------------------------
    // Get created payment method
    // -------------------------------------------------

    const [rows] = await pool.query(
      `
      SELECT
        id,
        method_type,
        account_name,
        account_number,
        provider,
        is_default,
        created_at
      FROM payment_methods
      WHERE id = ?
      AND user_id = ?
      LIMIT 1
      `,
      [result.insertId, userId]
    );

    return res.status(201).json({
      success: true,
      message: "Payment method added successfully.",
      paymentMethod: rows[0],
    });
  } catch (error) {
    console.error("Add Payment Method Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add payment method.",
      error: error.message,
    });
  }
};

// =====================================================
// SET DEFAULT PAYMENT METHOD
// PATCH /api/payment-methods/:id/default
// =====================================================

export const setDefaultPaymentMethod = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const paymentMethodId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    if (!paymentMethodId) {
      return res.status(400).json({
        success: false,
        message: "Payment method ID is required.",
      });
    }

    // -------------------------------------------------
    // Check ownership
    // -------------------------------------------------

    const [existing] = await pool.query(
      `
      SELECT
        id,
        is_default
      FROM payment_methods
      WHERE id = ?
      AND user_id = ?
      LIMIT 1
      `,
      [paymentMethodId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found.",
      });
    }

    // -------------------------------------------------
    // Already default
    // -------------------------------------------------

    if (Boolean(existing[0].is_default)) {
      return res.status(200).json({
        success: true,
        message: "This payment method is already the default.",
      });
    }

    // -------------------------------------------------
    // Remove current default
    // -------------------------------------------------

    await pool.query(
      `
      UPDATE payment_methods
      SET is_default = FALSE
      WHERE user_id = ?
      `,
      [userId]
    );

    // -------------------------------------------------
    // Set selected method as default
    // -------------------------------------------------

    await pool.query(
      `
      UPDATE payment_methods
      SET is_default = TRUE
      WHERE id = ?
      AND user_id = ?
      `,
      [paymentMethodId, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Default payment method updated successfully.",
    });
  } catch (error) {
    console.error(
      "Set Default Payment Method Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update default payment method.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PAYMENT METHOD
// DELETE /api/payment-methods/:id
// =====================================================

export const deletePaymentMethod = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const paymentMethodId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    if (!paymentMethodId) {
      return res.status(400).json({
        success: false,
        message: "Payment method ID is required.",
      });
    }

    // -------------------------------------------------
    // Check ownership and default status
    // -------------------------------------------------

    const [existing] = await pool.query(
      `
      SELECT
        id,
        is_default
      FROM payment_methods
      WHERE id = ?
      AND user_id = ?
      LIMIT 1
      `,
      [paymentMethodId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found.",
      });
    }

    // -------------------------------------------------
    // Prevent deleting default payment method
    // -------------------------------------------------

    if (Boolean(existing[0].is_default)) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot delete your default payment method. Set another payment method as default first.",
      });
    }

    // -------------------------------------------------
    // Delete payment method
    // -------------------------------------------------

    const [result] = await pool.query(
      `
      DELETE FROM payment_methods
      WHERE id = ?
      AND user_id = ?
      `,
      [paymentMethodId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment method deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Payment Method Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete payment method.",
      error: error.message,
    });
  }
};