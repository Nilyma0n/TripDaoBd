import express from "express";

import {
  createPayment,
  createFlightPayment,
  getMyPayments,
  getPaymentById,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  requirePermission,
} from "../middleware/rbacMiddleware.js";

const router = express.Router();

// =====================================================
// CREATE GENERIC PAYMENT
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
// CREATE FLIGHT PAYMENT
// POST /api/payments/flight-booking
// Permission: payment.create
// =====================================================

router.post(
  "/flight-booking",
  authMiddleware,
  requirePermission("payment.create"),
  createFlightPayment
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