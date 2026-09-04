import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,

  // Admin booking management
  getAllBookings,
  confirmBooking,
  rejectBooking,
  cancelBookingAny,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();


// =====================================================
// ALL BOOKING ROUTES REQUIRE LOGIN
// =====================================================

router.use(authMiddleware);


// =====================================================
// CREATE BOOKING
// POST /api/bookings
//
// Requires:
// - Authentication
// - booking.create
// =====================================================

router.post(
  "/",
  requirePermission("booking.create"),
  createBooking
);


// =====================================================
// GET CURRENT USER'S BOOKINGS
// GET /api/bookings/my
//
// Requires:
// - Authentication
// - booking.view_own
// =====================================================

router.get(
  "/my",
  requirePermission("booking.view_own"),
  getMyBookings
);


// =====================================================
// ADMIN: GET ALL BOOKINGS
// GET /api/bookings/admin/all
//
// Requires:
// - Authentication
// - booking.view_all
// =====================================================

router.get(
  "/admin/all",
  requirePermission("booking.view_all"),
  getAllBookings
);


// =====================================================
// ADMIN: CONFIRM BOOKING
// PUT /api/bookings/admin/:id/confirm
//
// Requires:
// - Authentication
// - booking.confirm
// =====================================================

router.put(
  "/admin/:id/confirm",
  requirePermission("booking.confirm"),
  confirmBooking
);


// =====================================================
// ADMIN: REJECT BOOKING
// PUT /api/bookings/admin/:id/reject
//
// Requires:
// - Authentication
// - booking.reject
// =====================================================

router.put(
  "/admin/:id/reject",
  requirePermission("booking.reject"),
  rejectBooking
);


// =====================================================
// ADMIN: CANCEL ANY BOOKING
// PUT /api/bookings/admin/:id/cancel
//
// Requires:
// - Authentication
// - booking.cancel_any
// =====================================================

router.put(
  "/admin/:id/cancel",
  requirePermission("booking.cancel_any"),
  cancelBookingAny
);


// =====================================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
//
// Requires:
// - Authentication
// - booking.view_own
//
// Controller verifies ownership.
// =====================================================

router.get(
  "/:id",
  requirePermission("booking.view_own"),
  getBookingById
);


// =====================================================
// CANCEL OWN BOOKING
// PUT /api/bookings/:id/cancel
//
// Requires:
// - Authentication
// - booking.cancel_own
//
// Controller verifies ownership.
// =====================================================

router.put(
  "/:id/cancel",
  requirePermission("booking.cancel_own"),
  cancelBooking
);


export default router;