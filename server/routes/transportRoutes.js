import express from "express";

import {
  searchFlightController,
  getFlightOfferController,
  createFlightOrderController,
} from "../controllers/transportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// FLIGHT SEARCH
// =====================================================

router.get(
  "/flights/search",
  authMiddleware,
  searchFlightController
);

// =====================================================
// SINGLE FLIGHT OFFER
// =====================================================

router.get(
  "/flights/offers/:offerId",
  authMiddleware,
  getFlightOfferController
);

// =====================================================
// FLIGHT BOOKING
// =====================================================

router.post(
  "/flights/book",
  authMiddleware,
  createFlightOrderController
);

export default router;