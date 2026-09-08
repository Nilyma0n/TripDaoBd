import pool from "../config/db.js";

// =====================================================
// CONSTANTS
// =====================================================

const ALLOWED_PAYMENT_METHODS = [
  "bkash",
  "nagad",
  "card",
  "bank",
];

// =====================================================
// HELPER
// =====================================================

const getUserId = (req) => {
  return req.user?.id || req.user?.userId;
};

const generateTransactionId = (prefix = "TRIP") => {
  return `${prefix}-${Date.now()}-${Math.floor(
    Math.random() * 100000
  )}`;
};

const formatAmount = (amount) => {
  return Number(amount).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// =====================================================
// CREATE GENERIC PAYMENT
// POST /api/payments
// =====================================================

export const createPayment = async (req, res) => {
  let connection;

  try {
    const userId = getUserId(req);

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

    if (!ALLOWED_PAYMENT_METHODS.includes(payment_method)) {
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
    // Prevent cancelled booking payment
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
    // Check existing paid payment
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
    // Transaction ID
    // ---------------------------------------------------

    let generatedTransactionId =
      transaction_id?.toString().trim();

    if (!generatedTransactionId) {
      generatedTransactionId =
        generateTransactionId("TRIP");
    }

    // ---------------------------------------------------
    // Duplicate transaction check
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
        message:
          "This transaction ID has already been used.",
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
    // Update booking
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
    // Notification
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
        `Payment of BDT ${formatAmount(
          paymentAmount
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
    // Commit
    // ---------------------------------------------------

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Payment completed successfully.",
      payment: paymentRows[0],
    });
  } catch (error) {
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
    if (connection) {
      connection.release();
    }
  }
};

// =====================================================
// CREATE FLIGHT PAYMENT
// POST /api/payments/flight-booking
// =====================================================

export const createFlightPayment = async (req, res) => {
  let connection;

  try {
    const userId = getUserId(req);

    // ---------------------------------------------------
    // Authentication
    // ---------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication information is missing.",
      });
    }

    const {
      flight_booking_id,
      amount,
      payment_method,
      transaction_id,
    } = req.body;

    // ---------------------------------------------------
    // Validate required fields
    // ---------------------------------------------------

    if (
      !flight_booking_id ||
      amount === undefined ||
      amount === null ||
      !payment_method
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Flight booking ID, amount and payment method are required.",
      });
    }

    // ---------------------------------------------------
    // Validate flight booking ID
    // ---------------------------------------------------

    const flightBookingId = Number(
      flight_booking_id
    );

    if (
      !Number.isInteger(flightBookingId) ||
      flightBookingId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid flight booking ID.",
      });
    }

    // ---------------------------------------------------
    // Validate payment method
    // ---------------------------------------------------

    if (!ALLOWED_PAYMENT_METHODS.includes(payment_method)) {
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
    // Get connection
    // ---------------------------------------------------

    connection = await pool.getConnection();

    await connection.beginTransaction();

    // ---------------------------------------------------
    // Lock flight booking
    // ---------------------------------------------------

    const [bookingRows] =
      await connection.query(
        `
        SELECT
          fb.id,
          fb.user_id,
          fb.seller_id,
          fb.inventory_id,
          fb.schedule_id,
          fb.reference_code,
          fb.passenger_count,
          fb.base_amount,
          fb.service_fee,
          fb.tax_amount,
          fb.total_amount,
          fb.payment_status,
          fb.booking_status,
          fb.created_at,
          fb.updated_at
        FROM flight_bookings fb
        WHERE fb.id = ?
        AND fb.user_id = ?
        LIMIT 1
        FOR UPDATE
        `,
        [flightBookingId, userId]
      );

    // ---------------------------------------------------
    // Booking not found
    // ---------------------------------------------------

    if (bookingRows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Flight booking not found.",
      });
    }

    const booking = bookingRows[0];

    // ---------------------------------------------------
    // Prevent rejected/cancelled booking payment
    // ---------------------------------------------------

    const normalizedBookingStatus =
      String(
        booking.booking_status || ""
      ).toLowerCase();

    if (
      normalizedBookingStatus === "cancelled" ||
      normalizedBookingStatus === "rejected"
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "Payment cannot be made for a cancelled or rejected flight booking.",
      });
    }

    // ---------------------------------------------------
    // Prevent already paid booking
    // ---------------------------------------------------

    if (
      String(
        booking.payment_status || ""
      ).toLowerCase() === "paid"
    ) {
      const [paidRows] =
        await connection.query(
          `
          SELECT
            id,
            flight_booking_id,
            user_id,
            amount,
            payment_method,
            transaction_id,
            payment_status,
            paid_at,
            created_at
          FROM flight_payments
          WHERE flight_booking_id = ?
          AND user_id = ?
          AND payment_status = 'Paid'
          ORDER BY id DESC
          LIMIT 1
          `,
          [flightBookingId, userId]
        );

      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This flight booking has already been paid.",
        payment: paidRows[0] || null,
      });
    }

    // ---------------------------------------------------
    // Check existing paid flight payment
    // ---------------------------------------------------

    const [existingPaidPayment] =
      await connection.query(
        `
        SELECT
          id,
          flight_booking_id,
          user_id,
          amount,
          payment_method,
          transaction_id,
          payment_status,
          paid_at,
          created_at
        FROM flight_payments
        WHERE flight_booking_id = ?
        AND user_id = ?
        AND payment_status = 'Paid'
        LIMIT 1
        `,
        [flightBookingId, userId]
      );

    if (existingPaidPayment.length > 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This flight booking has already been paid.",
        payment: existingPaidPayment[0],
      });
    }

    // ---------------------------------------------------
    // Validate booking total
    // ---------------------------------------------------

    const bookingTotal = Number(
      booking.total_amount
    );

    if (
      !Number.isFinite(bookingTotal) ||
      bookingTotal <= 0
    ) {
      await connection.rollback();

      return res.status(500).json({
        success: false,
        message:
          "Invalid flight booking total amount.",
      });
    }

    // ---------------------------------------------------
    // Compare amount using minor units
    // ---------------------------------------------------

    const paymentAmountInMinor = Math.round(
      paymentAmount * 100
    );

    const bookingTotalInMinor = Math.round(
      bookingTotal * 100
    );

    if (
      paymentAmountInMinor !==
      bookingTotalInMinor
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: `Payment amount must be ${formatAmount(
          bookingTotal
        )}.`,
      });
    }

    // ---------------------------------------------------
    // Transaction ID
    // ---------------------------------------------------

    let generatedTransactionId =
      transaction_id?.toString().trim();

    if (!generatedTransactionId) {
      generatedTransactionId =
        generateTransactionId("FLIGHT");
    }

    // ---------------------------------------------------
    // Duplicate transaction ID
    // ---------------------------------------------------

    const [existingTransaction] =
      await connection.query(
        `
        SELECT
          id,
          flight_booking_id,
          user_id,
          amount,
          payment_method,
          transaction_id,
          payment_status,
          paid_at,
          created_at
        FROM flight_payments
        WHERE transaction_id = ?
        LIMIT 1
        `,
        [generatedTransactionId]
      );

    if (existingTransaction.length > 0) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This transaction ID has already been used.",
        payment: existingTransaction[0],
      });
    }

    // ---------------------------------------------------
    // Insert flight payment
    // ---------------------------------------------------

    const [paymentResult] =
      await connection.query(
        `
        INSERT INTO flight_payments
        (
          flight_booking_id,
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
          flightBookingId,
          userId,
          paymentAmount,
          payment_method,
          generatedTransactionId,
        ]
      );

    // ---------------------------------------------------
    // Update flight booking payment status
    // ---------------------------------------------------

    await connection.query(
      `
      UPDATE flight_bookings
      SET
        payment_status = 'Paid',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      AND user_id = ?
      `,
      [flightBookingId, userId]
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
        "Flight Payment Successful",
        `Payment of BDT ${formatAmount(
          paymentAmount
        )} for flight booking ${
          booking.reference_code
        } was successful.`,
        "payment",
        `/dashboard/flights/bookings/${flightBookingId}`,
      ]
    );

    // ---------------------------------------------------
    // Get created flight payment
    // ---------------------------------------------------

    const [paymentRows] =
      await connection.query(
        `
        SELECT
          id,
          flight_booking_id,
          user_id,
          amount,
          payment_method,
          transaction_id,
          payment_status,
          paid_at,
          created_at,
          updated_at
        FROM flight_payments
        WHERE id = ?
        LIMIT 1
        `,
        [paymentResult.insertId]
      );

    // ---------------------------------------------------
    // Get updated booking
    // ---------------------------------------------------

    const [updatedBookingRows] =
      await connection.query(
        `
        SELECT
          id,
          user_id,
          seller_id,
          inventory_id,
          schedule_id,
          reference_code,
          passenger_count,
          base_amount,
          service_fee,
          tax_amount,
          total_amount,
          payment_status,
          booking_status,
          created_at,
          updated_at
        FROM flight_bookings
        WHERE id = ?
        LIMIT 1
        `,
        [flightBookingId]
      );

    // ---------------------------------------------------
    // Commit
    // ---------------------------------------------------

    await connection.commit();

    return res.status(201).json({
      success: true,
      message:
        "Flight payment completed successfully.",
      payment: paymentRows[0],
      booking: updatedBookingRows[0],
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error(
          "Flight Payment Rollback Error:",
          rollbackError
        );
      }
    }

    console.error(
      "Create Flight Payment Error:",
      error
    );

    // ---------------------------------------------------
    // Handle duplicate transaction race condition
    // ---------------------------------------------------

    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message:
          "This transaction ID has already been used.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to process flight payment.",
      error: error.message,
    });
  } finally {
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
    const userId = getUserId(req);

    // ---------------------------------------------------
    // Authentication check
    // ---------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
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
    console.error(
      "Get My Payments Error:",
      error
    );

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
    const userId = getUserId(req);
    const paymentId = Number(req.params.id);

    // ---------------------------------------------------
    // Authentication check
    // ---------------------------------------------------

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    // ---------------------------------------------------
    // Validate payment ID
    // ---------------------------------------------------

    if (
      !Number.isInteger(paymentId) ||
      paymentId <= 0
    ) {
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
    console.error(
      "Get Payment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load payment.",
      error: error.message,
    });
  }
};