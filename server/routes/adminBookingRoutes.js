import express from "express";

import {
  getAllBookings,
  getAdminBookingById,
  confirmBooking,
  rejectBooking,
} from "../controllers/adminBookingController.js";

import  authMiddleware  from "../middleware/authMiddleware.js";

import {
  requireRole,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// ADMIN AUTHORIZATION
// =====================================================
//
// Every route below requires:
// 1. Valid JWT
// 2. admin OR super_admin role
//
// =====================================================

router.use(authMiddleware);

router.use(
  requireRole(
    "admin",
    "super_admin"
  )
);


// =====================================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// =====================================================

router.get(
  "/",
  getAllBookings
);


// =====================================================
// GET SINGLE BOOKING
// GET /api/admin/bookings/:id
// =====================================================

router.get(
  "/:id",
  getAdminBookingById
);


// =====================================================
// CONFIRM BOOKING
// PUT /api/admin/bookings/:id/confirm
// =====================================================

router.put(
  "/:id/confirm",
  confirmBooking
);


// =====================================================
// REJECT BOOKING
// PUT /api/admin/bookings/:id/reject
// =====================================================

router.put(
  "/:id/reject",
  rejectBooking
);


export default router;