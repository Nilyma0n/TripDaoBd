import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  searchFlights,
} from "../controllers/flightSearchController.js";

import {
  createFlightBooking,
  getMyFlightBookings,
  getFlightBookingById,
  getSellerFlightBookings,
  confirmSellerFlightBooking,
  rejectSellerFlightBooking,
} from "../controllers/flightBookingController.js";

import {
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Flight Search
|--------------------------------------------------------------------------
*/

router.get("/search", searchFlights);

/*
|--------------------------------------------------------------------------
| Traveler Flight Bookings
|--------------------------------------------------------------------------
*/

router.post(
  "/bookings",
  authMiddleware,
  requirePermission("booking.create"),
  createFlightBooking
);

router.get(
  "/bookings/my",
  authMiddleware,
  requirePermission("booking.view_own"),
  getMyFlightBookings
);

router.get(
  "/bookings/:id",
  authMiddleware,
  requirePermission("booking.view_own"),
  getFlightBookingById
);

/*
|--------------------------------------------------------------------------
| Seller Flight Bookings
|--------------------------------------------------------------------------
*/

router.get(
  "/seller/bookings",
  authMiddleware,
  requirePermission("profile.view"),
  getSellerFlightBookings
);

router.put(
  "/seller/bookings/:id/confirm",
  authMiddleware,
  requirePermission("profile.update"),
  confirmSellerFlightBooking
);

router.put(
  "/seller/bookings/:id/reject",
  authMiddleware,
  requirePermission("profile.update"),
  rejectSellerFlightBooking
);

export default router;