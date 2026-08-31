import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
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
// GET SINGLE BOOKING
// GET /api/bookings/:id
//
// Requires:
// - Authentication
// - booking.view_own
//
// Controller also verifies ownership.
// =====================================================

router.get(
  "/:id",
  requirePermission("booking.view_own"),
  getBookingById
);

// =====================================================
// CANCEL BOOKING
// PUT /api/bookings/:id/cancel
//
// Requires:
// - Authentication
// - booking.cancel_own
//
// Controller also verifies ownership.
// =====================================================

router.put(
  "/:id/cancel",
  requirePermission("booking.cancel_own"),
  cancelBooking
);

export default router;