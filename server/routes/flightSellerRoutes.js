import express from "express";

import {
  registerFlightSeller,
  getMyFlightSeller,
  updateMyFlightSeller,
  getAllFlightSellers,
  approveFlightSeller,
  rejectFlightSeller,
  toggleFlightSellerSelling,
} from "../controllers/flightSellerController.js";

import {
  createFlightRoute,
  getMyFlightRoutes,
  updateFlightRoute,
  deleteFlightRoute,
} from "../controllers/flightRouteController.js";

import {
  createFlightSchedule,
  getMyFlightSchedules,
  updateFlightSchedule,
  deleteFlightSchedule,
} from "../controllers/flightScheduleController.js";

import {
  createFlightInventory,
  getMyFlightInventory,
  updateFlightInventory,
  toggleFlightInventorySelling,
  deleteFlightInventory,
} from "../controllers/flightInventoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  requireRole,
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// SELLER PROFILE
// =====================================================

router.post(
  "/register",
  authMiddleware,
  requirePermission("profile.update"),
  registerFlightSeller
);

router.get(
  "/me",
  authMiddleware,
  requirePermission("profile.view"),
  getMyFlightSeller
);

router.put(
  "/me",
  authMiddleware,
  requirePermission("profile.update"),
  updateMyFlightSeller
);

// =====================================================
// FLIGHT ROUTE MANAGEMENT — SELLER
// =====================================================

router.post(
  "/routes",
  authMiddleware,
  requirePermission("profile.update"),
  createFlightRoute
);

router.get(
  "/routes",
  authMiddleware,
  requirePermission("profile.view"),
  getMyFlightRoutes
);

router.put(
  "/routes/:id",
  authMiddleware,
  requirePermission("profile.update"),
  updateFlightRoute
);

router.delete(
  "/routes/:id",
  authMiddleware,
  requirePermission("profile.update"),
  deleteFlightRoute
);

// =====================================================
// FLIGHT SCHEDULE MANAGEMENT — SELLER
// =====================================================

router.post(
  "/schedules",
  authMiddleware,
  requirePermission("profile.update"),
  createFlightSchedule
);

router.get(
  "/schedules",
  authMiddleware,
  requirePermission("profile.view"),
  getMyFlightSchedules
);

router.put(
  "/schedules/:id",
  authMiddleware,
  requirePermission("profile.update"),
  updateFlightSchedule
);

router.delete(
  "/schedules/:id",
  authMiddleware,
  requirePermission("profile.update"),
  deleteFlightSchedule
);

// =====================================================
// FLIGHT INVENTORY — SELLER
// =====================================================

router.post(
  "/inventory",
  authMiddleware,
  requirePermission("profile.update"),
  createFlightInventory
);

router.get(
  "/inventory",
  authMiddleware,
  requirePermission("profile.view"),
  getMyFlightInventory
);

router.put(
  "/inventory/:id",
  authMiddleware,
  requirePermission("profile.update"),
  updateFlightInventory
);

router.put(
  "/inventory/:id/toggle-selling",
  authMiddleware,
  requirePermission("profile.update"),
  toggleFlightInventorySelling
);

router.delete(
  "/inventory/:id",
  authMiddleware,
  requirePermission("profile.update"),
  deleteFlightInventory
);

// =====================================================
// ADMIN — FLIGHT SELLER MANAGEMENT
// =====================================================

router.get(
  "/admin/all",
  authMiddleware,
  requireRole("admin", "super_admin"),
  getAllFlightSellers
);

router.put(
  "/admin/:id/approve",
  authMiddleware,
  requireRole("admin", "super_admin"),
  approveFlightSeller
);

router.put(
  "/admin/:id/reject",
  authMiddleware,
  requireRole("admin", "super_admin"),
  rejectFlightSeller
);

router.put(
  "/admin/:id/toggle-selling",
  authMiddleware,
  requireRole("admin", "super_admin"),
  toggleFlightSellerSelling
);

export default router;