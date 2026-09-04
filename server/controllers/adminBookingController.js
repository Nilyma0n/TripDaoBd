import pool from "../config/db.js";
import { createNotification } from "./notificationController.js";

// =====================================================
// ADMIN BOOKING CONTROLLER
// =====================================================
//
// Admin / Super Admin can:
// - View all bookings
// - View a single booking
// - Confirm pending booking
// - Reject pending booking
//
// Customer ownership rules do NOT apply here because
// admin access is protected by requireRole() in routes.
//
// =====================================================


// =====================================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// =====================================================

export const getAllBookings = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        b.*,
        u.full_name AS user_name,
        u.email AS user_email
      FROM bookings b
      LEFT JOIN users u
        ON u.id = b.user_id
      ORDER BY b.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      count: rows.length,
      bookings: rows,
    });
  } catch (error) {
    console.error(
      "Admin Get All Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load bookings.",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE BOOKING
// GET /api/admin/bookings/:id
// =====================================================

export const getAdminBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const [rows] = await pool.query(
      `
      SELECT
        b.*,
        u.full_name AS user_name,
        u.email AS user_email
      FROM bookings b
      LEFT JOIN users u
        ON u.id = b.user_id
      WHERE b.id = ?
      LIMIT 1
      `,
      [bookingId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking: rows[0],
    });
  } catch (error) {
    console.error(
      "Admin Get Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load booking.",
      error: error.message,
    });
  }
};


// =====================================================
// CONFIRM BOOKING
// PUT /api/admin/bookings/:id/confirm
// =====================================================

export const confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // -------------------------------------------------
    // FIND BOOKING
    // -------------------------------------------------

    const [bookingRows] = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      LIMIT 1
      `,
      [bookingId]
    );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const booking = bookingRows[0];

    // -------------------------------------------------
    // STATUS VALIDATION
    // -------------------------------------------------

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          `Only pending bookings can be confirmed. Current status: ${booking.status}.`,
      });
    }

    // -------------------------------------------------
    // UPDATE STATUS
    // -------------------------------------------------

    const [result] = await pool.query(
      `
      UPDATE bookings
      SET status = 'Confirmed'
      WHERE id = ?
      AND status = 'Pending'
      `,
      [bookingId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be confirmed.",
      });
    }

    // -------------------------------------------------
    // CUSTOMER NOTIFICATION
    // -------------------------------------------------

    await createNotification({
      userId: booking.user_id,
      title: "Booking Confirmed",
      message:
        `Your booking #${String(bookingId).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } has been confirmed. You can now proceed with payment.`,
      type: "booking",
      link: `/dashboard/bookings/${bookingId}`,
    });

    // -------------------------------------------------
    // GET UPDATED BOOKING
    // -------------------------------------------------

    const [updatedRows] = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      LIMIT 1
      `,
      [bookingId]
    );

    return res.status(200).json({
      success: true,
      message:
        "Booking confirmed successfully.",
      booking: updatedRows[0],
      payment: {
        status: "Available",
        message:
          "Payment can now be completed for this confirmed booking.",
      },
    });
  } catch (error) {
    console.error(
      "Admin Confirm Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to confirm booking.",
      error: error.message,
    });
  }
};


// =====================================================
// REJECT BOOKING
// PUT /api/admin/bookings/:id/reject
// =====================================================
//
// Current bookings table uses:
// Pending / Confirmed / Cancelled
//
// Therefore rejection is represented as Cancelled
// until a dedicated "Rejected" status is introduced.
// =====================================================

export const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // -------------------------------------------------
    // FIND BOOKING
    // -------------------------------------------------

    const [bookingRows] = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      LIMIT 1
      `,
      [bookingId]
    );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const booking = bookingRows[0];

    // -------------------------------------------------
    // STATUS VALIDATION
    // -------------------------------------------------

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          `Only pending bookings can be rejected. Current status: ${booking.status}.`,
      });
    }

    // -------------------------------------------------
    // UPDATE STATUS
    // -------------------------------------------------

    const [result] = await pool.query(
      `
      UPDATE bookings
      SET status = 'Cancelled'
      WHERE id = ?
      AND status = 'Pending'
      `,
      [bookingId]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be rejected.",
      });
    }

    // -------------------------------------------------
    // CUSTOMER NOTIFICATION
    // -------------------------------------------------

    await createNotification({
      userId: booking.user_id,
      title: "Booking Rejected",
      message:
        `Unfortunately, your booking #${String(
          bookingId
        ).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } could not be confirmed.`,
      type: "booking",
      link: "/dashboard/bookings",
    });

    // -------------------------------------------------
    // GET UPDATED BOOKING
    // -------------------------------------------------

    const [updatedRows] = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      LIMIT 1
      `,
      [bookingId]
    );

    return res.status(200).json({
      success: true,
      message:
        "Booking rejected successfully.",
      booking: updatedRows[0],
    });
  } catch (error) {
    console.error(
      "Admin Reject Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to reject booking.",
      error: error.message,
    });
  }
};
