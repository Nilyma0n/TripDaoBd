import express from "express";
import { body } from "express-validator";

import {
  registerUser,
  loginUser,
  updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  requireRole,
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// TEST AUTH ROUTE
// GET /api/auth/
// =====================================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Authentication Route Working",
  });
});

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================
//
// New users are automatically assigned:
// traveler
//
// Required:
// full_name
// email
// password
// Optional:
// phone
// =====================================================

router.post(
  "/register",
  [
    body("full_name")
      .trim()
      .notEmpty()
      .withMessage("Full name is required."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("phone")
      .optional()
      .trim(),

    body("password")
      .isLength({ min: 6 })
      .withMessage(
        "Password must be at least 6 characters long."
      ),
  ],
  registerUser
);

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================
//
// Login now uses RBAC:
//
// users
//   ↓
// user_roles
//   ↓
// roles
//   ↓
// role_permissions
//   ↓
// permissions
//
// JWT contains:
// id
// email
// roles
// =====================================================

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("password")
      .notEmpty()
      .withMessage("Password is required."),
  ],
  loginUser
);

// =====================================================
// GET CURRENT LOGGED-IN USER
// GET /api/auth/me
// =====================================================
//
// Requires:
// Valid JWT
//
// Returns:
// req.user
// =====================================================

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "You are authenticated.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC PERMISSION TEST
// GET /api/auth/permission-test
// =====================================================
//
// Requires:
// booking.view_own
//
// Traveler has this permission.
// =====================================================

router.get(
  "/permission-test",
  authMiddleware,
  requirePermission("booking.view_own"),
  (req, res) => {
    res.json({
      success: true,
      message: "RBAC permission check passed.",
      user_id: req.user.id,
      permission: "booking.view_own",
    });
  }
);

// =====================================================
// UPDATE PROFILE
// PUT /api/auth/profile
// =====================================================
//
// Requires:
// Valid JWT
//
// RBAC permission:
// profile.update
//
// NOTE:
// The controller currently handles the update.
// We will add the permission middleware here now
// because profile.update already exists in the RBAC database.
// =====================================================

router.put(
  "/profile",
  authMiddleware,
  requirePermission("profile.update"),
  [
    body("full_name")
      .trim()
      .notEmpty()
      .withMessage("Full name is required."),

    body("phone")
      .optional()
      .trim(),
  ],
  updateProfile
);

// =====================================================
// RBAC TEST — GET USER ROLES
// GET /api/auth/roles
// =====================================================
//
// Any valid RBAC role can access this.
//
// Supported roles:
//
// traveler
// travel_host
// hotel
// restaurant
// transportation
// emergency_provider
// photographer
// admin
// super_admin
// =====================================================

router.get(
  "/roles",
  authMiddleware,
  requireRole(
    "traveler",
    "travel_host",
    "hotel",
    "restaurant",
    "transportation",
    "emergency_provider",
    "photographer",
    "admin",
    "super_admin"
  ),
  (req, res) => {
    res.json({
      success: true,
      message: "RBAC role check successful.",
      user_id: req.user.id,
      roles: req.user.roles,
    });
  }
);

// =====================================================
// RBAC TEST — TRAVELER ONLY
// GET /api/auth/test/traveler
// =====================================================
//
// Requires:
// traveler
// =====================================================

router.get(
  "/test/traveler",
  authMiddleware,
  requireRole("traveler"),
  (req, res) => {
    res.json({
      success: true,
      message: "Traveler access granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — ADMIN ONLY
// GET /api/auth/test/admin
// =====================================================
//
// Allows:
// admin
// super_admin
// =====================================================

router.get(
  "/test/admin",
  authMiddleware,
  requireRole(
    "admin",
    "super_admin"
  ),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — BOOKING CREATE
// GET /api/auth/test/booking-create
// =====================================================
//
// Requires:
// booking.create
//
// Traveler has this permission.
// =====================================================

router.get(
  "/test/booking-create",
  authMiddleware,
  requirePermission("booking.create"),
  (req, res) => {
    res.json({
      success: true,
      message: "booking.create permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — BOOKING MANAGEMENT
// GET /api/auth/test/booking-manage
// =====================================================
//
// Requires BOTH:
//
// booking.create
// booking.manage_provider
//
// IMPORTANT:
// "booking.manage" does NOT exist in our permissions table.
//
// The correct permission is:
// booking.manage_provider
// =====================================================

router.get(
  "/test/booking-manage",
  authMiddleware,
  requirePermission(
    "booking.create",
    "booking.manage_provider"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Booking management permissions granted.",
      user: req.user,
      required_permissions: [
        "booking.create",
        "booking.manage_provider",
      ],
    });
  }
);

// =====================================================
// RBAC TEST — VIEW OWN BOOKINGS
// GET /api/auth/test/booking-view
// =====================================================
//
// Requires:
// booking.view_own
//
// This will be useful when we connect the real
// /api/bookings/my endpoint.
// =====================================================

router.get(
  "/test/booking-view",
  authMiddleware,
  requirePermission("booking.view_own"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "booking.view_own permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — CANCEL OWN BOOKING
// GET /api/auth/test/booking-cancel
// =====================================================
//
// Requires:
// booking.cancel_own
// =====================================================

router.get(
  "/test/booking-cancel",
  authMiddleware,
  requirePermission("booking.cancel_own"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "booking.cancel_own permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — PAYMENT CREATE
// GET /api/auth/test/payment-create
// =====================================================
//
// Requires:
// payment.create
//
// Traveler has this permission.
// =====================================================

router.get(
  "/test/payment-create",
  authMiddleware,
  requirePermission("payment.create"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "payment.create permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — PAYMENT VIEW OWN
// GET /api/auth/test/payment-view
// =====================================================
//
// Requires:
// payment.view_own
// =====================================================

router.get(
  "/test/payment-view",
  authMiddleware,
  requirePermission("payment.view_own"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "payment.view_own permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// RBAC TEST — NOTIFICATION VIEW OWN
// GET /api/auth/test/notification-view
// =====================================================
//
// Requires:
// notification.view_own
// =====================================================

router.get(
  "/test/notification-view",
  authMiddleware,
  requirePermission("notification.view_own"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "notification.view_own permission granted.",
      user: req.user,
    });
  }
);

// =====================================================
// EXPORT ROUTER
// =====================================================

export default router;