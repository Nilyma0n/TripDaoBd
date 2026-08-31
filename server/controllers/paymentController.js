import pool from "../config/db.js";

// =====================================================
// CREATE PAYMENT
// POST /api/payments
// =====================================================
export const createPayment = async (req, res) => {
  let connection;

  try {
    const userId = req.user?.id || req.user?.userId;

    // ---------------------------------------------------
    // Authentication check
    // ---------------------------------------------------
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    const {
      booking_id,
      amount,
      payment_method,
      transaction_id,
    } = req.body;

    // ---------------------------------------------------
    // Validate required fields
    // ---------------------------------------------------
    if (
      !booking_id ||
      amount === undefined ||
      amount === null ||
      !payment_method
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking ID, amount and payment method are required.",
      });
    }

    // ---------------------------------------------------
    // Validate booking ID
    // ---------------------------------------------------
    const bookingId = Number(booking_id);

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID.",
      });
    }

    // ---------------------------------------------------
    // Validate payment method
    // ---------------------------------------------------
    const allowedMethods = [
      "bkash",
      "nagad",
      "card",
      "bank",
    ];

    if (!allowedMethods.includes(payment_method)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    // ---------------------------------------------------
    // Validate amount
    // ---------------------------------------------------
    const paymentAmount = Number(amount);

    if (
      !Number.isFinite(paymentAmount) ||
      paymentAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be greater than 0.",
      });
    }

    // ---------------------------------------------------
    // Get database connection
    // ---------------------------------------------------
    connection = await pool.getConnection();

    // Start transaction
    await connection.beginTransaction();

    // ---------------------------------------------------
    // Check booking ownership
    // ---------------------------------------------------
    const [bookingRows] = await connection.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      AND user_id = ?
      LIMIT 1
      `,
      [bookingId, userId]
    );

    if (bookingRows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const booking = bookingRows[0];

    // ---------------------------------------------------
    // Prevent payment for cancelled booking
    // ---------------------------------------------------
    if (booking.status === "Cancelled") {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "Payment cannot be made for a cancelled booking.",
      });
    }

    // ---------------------------------------------------
    // Prevent payment for already confirmed booking
    // ---------------------------------------------------
    if (booking.status === "Confirmed") {
      const [confirmedPayment] = await connection.query(
        `
        SELECT *
        FROM payments
        WHERE booking_id = ?
        AND user_id = ?
        AND payment_status = 'Paid'
        LIMIT 1
        `,
        [bookingId, userId]
      );

      if (confirmedPayment.length > 0) {
        await connection.rollback();

        return res.status(400).json({
          success: false,
          message: "This booking has already been paid.",
          payment: confirmedPayment[0],
        });
      }
    }

    // ---------------------------------------------------
    // Prevent duplicate paid payment
    // ---------------------------------------------------
    const [existingPaidPayment] =
      await connection.query(
        `
        SELECT *
        FROM payments
        WHERE booking_id = ?
        AND user_id = ?
        AND payment_status = 'Paid'
        LIMIT 1
        `,
        [bookingId, userId]
      );

    if (existingPaidPayment.length > 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "This booking has already been paid.",
        payment: existingPaidPayment[0],
      });
    }

    // ---------------------------------------------------
    // Check booking total
    // ---------------------------------------------------
    const bookingTotal = Number(booking.total_price);

    if (!Number.isFinite(bookingTotal)) {
      await connection.rollback();

      return res.status(500).json({
        success: false,
        message: "Invalid booking total price.",
      });
    }

    // Compare amounts in paisa/cents-style integer form
    const paymentAmountInMinor = Math.round(
      paymentAmount * 100
    );

    const bookingTotalInMinor = Math.round(
      bookingTotal * 100
    );

    if (
      paymentAmountInMinor !== bookingTotalInMinor
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Payment amount must be ${bookingTotal}.`,
      });
    }

    // ---------------------------------------------------
    // Validate transaction ID if provided
    // ---------------------------------------------------
    let generatedTransactionId =
      transaction_id?.toString().trim();

    if (!generatedTransactionId) {
      generatedTransactionId = `TRIP-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;
    }

    // ---------------------------------------------------
    // Check duplicate transaction ID
    // ---------------------------------------------------
    const [existingTransaction] =
      await connection.query(
        `
        SELECT *
        FROM payments
        WHERE transaction_id = ?
        LIMIT 1
        `,
        [generatedTransactionId]
      );

    if (existingTransaction.length > 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "This transaction ID has already been used.",
        payment: existingTransaction[0],
      });
    }

    // ---------------------------------------------------
    // Insert payment
    // ---------------------------------------------------
    const [paymentResult] =
      await connection.query(
        `
        INSERT INTO payments
        (
          booking_id,
          user_id,
          amount,
          payment_method,
          transaction_id,
          payment_status,
          paid_at
        )
        VALUES (?, ?, ?, ?, ?, 'Paid', NOW())
        `,
        [
          bookingId,
          userId,
          paymentAmount,
          payment_method,
          generatedTransactionId,
        ]
      );

    // ---------------------------------------------------
    // Update booking status
    // ---------------------------------------------------
    await connection.query(
      `
      UPDATE bookings
      SET status = 'Confirmed'
      WHERE id = ?
      AND user_id = ?
      `,
      [bookingId, userId]
    );

    // ---------------------------------------------------
    // Create notification
    // ---------------------------------------------------
    await connection.query(
      `
      INSERT INTO notifications
      (
        user_id,
        title,
        message,
        type,
        link
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        userId,
        "Payment Successful",
        `Payment of BDT ${paymentAmount.toLocaleString(
          "en-BD",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )} for booking #${String(bookingId).padStart(
          5,
          "0"
        )} was successful.`,
        "payment",
        "/dashboard/bookings",
      ]
    );

    // ---------------------------------------------------
    // Get created payment
    // ---------------------------------------------------
    const [paymentRows] =
      await connection.query(
        `
        SELECT
          id,
          booking_id,
          user_id,
          amount,
          payment_method,
          transaction_id,
          payment_status,
          paid_at,
          created_at
        FROM payments
        WHERE id = ?
        LIMIT 1
        `,
        [paymentResult.insertId]
      );

    // ---------------------------------------------------
    // Commit transaction
    // ---------------------------------------------------
    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Payment completed successfully.",
      payment: paymentRows[0],
    });
  } catch (error) {
    // ---------------------------------------------------
    // Rollback transaction if active
    // ---------------------------------------------------
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error(
          "Payment Rollback Error:",
          rollbackError
        );
      }
    }

    console.error("Create Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process payment.",
      error: error.message,
    });
  } finally {
    // ---------------------------------------------------
    // Release connection
    // ---------------------------------------------------
    if (connection) {
      connection.release();
    }
  }
};

// =====================================================
// GET MY PAYMENTS
// GET /api/payments
// =====================================================
export const getMyPayments = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;

    // ---------------------------------------------------
    // Authentication check
    // ---------------------------------------------------
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    // ---------------------------------------------------
    // Get user's payments
    // ---------------------------------------------------
    const [rows] = await pool.query(
      `
      SELECT
        p.id,
        p.booking_id,
        p.user_id,
        p.amount,
        p.payment_method,
        p.transaction_id,
        p.payment_status,
        p.paid_at,
        p.created_at,
        b.destination,
        b.location,
        b.check_in,
        b.check_out,
        b.status AS booking_status
      FROM payments p
      LEFT JOIN bookings b
        ON p.booking_id = b.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      payments: rows,
    });
  } catch (error) {
    console.error("Get My Payments Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load payments.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE PAYMENT
// GET /api/payments/:id
// =====================================================
export const getPaymentById = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const paymentId = Number(req.params.id);

    // ---------------------------------------------------
    // Authentication check
    // ---------------------------------------------------
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    // ---------------------------------------------------
    // Validate payment ID
    // ---------------------------------------------------
    if (!Number.isInteger(paymentId) || paymentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID.",
      });
    }

    // ---------------------------------------------------
    // Get payment
    // ---------------------------------------------------
    const [rows] = await pool.query(
      `
      SELECT
        p.id,
        p.booking_id,
        p.user_id,
        p.amount,
        p.payment_method,
        p.transaction_id,
        p.payment_status,
        p.paid_at,
        p.created_at,
        b.destination,
        b.location,
        b.check_in,
        b.check_out,
        b.status AS booking_status
      FROM payments p
      LEFT JOIN bookings b
        ON p.booking_id = b.id
      WHERE p.id = ?
      AND p.user_id = ?
      LIMIT 1
      `,
      [paymentId, userId]
    );

    // ---------------------------------------------------
    // Payment not found
    // ---------------------------------------------------
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      payment: rows[0],
    });
  } catch (error) {
    console.error("Get Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load payment.",
      error: error.message,
    });
  }
};