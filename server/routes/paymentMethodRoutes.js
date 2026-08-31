import express from "express";

import {
  getMyPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethodController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { requirePermission } from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// GET MY PAYMENT METHODS
// GET /api/payment-methods
// Permission: payment.view_own
// =====================================================

router.get(
  "/",
  authMiddleware,
  requirePermission("payment.view_own"),
  getMyPaymentMethods
);

// =====================================================
// ADD PAYMENT METHOD
// POST /api/payment-methods
// Permission: payment.create
// =====================================================

router.post(
  "/",
  authMiddleware,
  requirePermission("payment.create"),
  addPaymentMethod
);

// =====================================================
// SET DEFAULT PAYMENT METHOD
// PATCH /api/payment-methods/:id/default
// Permission: payment.create
// =====================================================

router.patch(
  "/:id/default",
  authMiddleware,
  requirePermission("payment.create"),
  setDefaultPaymentMethod
);

// =====================================================
// DELETE PAYMENT METHOD
// DELETE /api/payment-methods/:id
// Permission: payment.create
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  requirePermission("payment.create"),
  deletePaymentMethod
);

export default router;