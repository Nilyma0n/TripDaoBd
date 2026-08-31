import express from "express";

import {
  createPayment,
  getMyPayments,
  getPaymentById,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { requirePermission } from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// CREATE PAYMENT
// POST /api/payments
// Permission: payment.create
// =====================================================

router.post(
  "/",
  authMiddleware,
  requirePermission("payment.create"),
  createPayment
);

// =====================================================
// GET MY PAYMENTS
// GET /api/payments
// Permission: payment.view_own
// =====================================================

router.get(
  "/",
  authMiddleware,
  requirePermission("payment.view_own"),
  getMyPayments
);

// =====================================================
// GET SINGLE PAYMENT
// GET /api/payments/:id
// Permission: payment.view_own
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  requirePermission("payment.view_own"),
  getPaymentById
);

export default router;