import express from "express";

import {
  getDestinations,
  getDestinationBySlug,
  getDestinationTransportOptions,
} from "../controllers/destinationController.js";

const router = express.Router();

/**
 * ============================================================
 * GET /api/destinations
 *
 * Examples:
 *
 * /api/destinations
 * /api/destinations?page=1&limit=9
 * /api/destinations?division=Sylhet
 * /api/destinations?district=Sylhet
 * /api/destinations?category=Waterfall
 * /api/destinations?featured=true
 * /api/destinations?popular=true
 * /api/destinations?search=jaflong
 * ============================================================
 */
router.get(
  "/",
  getDestinations
);


/**
 * ============================================================
 * GET /api/destinations/:slug/transport-options
 *
 * Example:
 *
 * /api/destinations/jaflong/transport-options
 *
 * Returns:
 * How To Get There
 * Transport type
 * Estimated time
 * Estimated cost
 * Instructions
 * ============================================================
 */
router.get(
  "/:slug/transport-options",
  getDestinationTransportOptions
);


/**
 * ============================================================
 * GET /api/destinations/:slug
 *
 * Examples:
 *
 * /api/destinations/coxs-bazar
 * /api/destinations/jaflong
 * ============================================================
 */
router.get(
  "/:slug",
  getDestinationBySlug
);


export default router;