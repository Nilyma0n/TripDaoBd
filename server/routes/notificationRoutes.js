import express from "express";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();


// =====================================================
// ALL NOTIFICATION ROUTES REQUIRE LOGIN
// =====================================================

router.use(authMiddleware);


// =====================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// =====================================================

router.get(
  "/",
  requirePermission("notification.view_own"),
  getMyNotifications
);


// =====================================================
// MARK ALL AS READ
// PUT /api/notifications/read-all
// =====================================================

router.put(
  "/read-all",
  requirePermission("notification.view_own"),
  markAllNotificationsAsRead
);


// =====================================================
// MARK SINGLE AS READ
// PUT /api/notifications/:id/read
// =====================================================

router.put(
  "/:id/read",
  requirePermission("notification.view_own"),
  markNotificationAsRead
);


export default router;