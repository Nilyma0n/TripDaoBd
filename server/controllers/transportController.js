import {
  searchFlights,
  getFlightOffer,
  createFlightOrder,
} from "../services/flightService.js";

// =====================================================
// SEARCH FLIGHTS
// GET /api/transport/flights/search
// =====================================================

export const searchFlightController = async (
  req,
  res
) => {
  try {
    const {
      origin,
      destination,
      departure_date,
      passengers = 1,
    } = req.query;

    if (
      !origin ||
      !destination ||
      !departure_date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Origin, destination and departure date are required.",
      });
    }

    const result = await searchFlights({
      origin,
      destination,
      departureDate: departure_date,
      passengers,
    });

    return res.status(200).json({
      success: true,
      provider: "duffel",
      configured: result.configured,
      message:
        result.message ||
        "Flight search completed successfully.",
      count: result.offers?.length || 0,
      offers: result.offers || [],
    });
  } catch (error) {
    console.error(
      "Search Flight Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to search flights.",
    });
  }
};

// =====================================================
// GET SINGLE FLIGHT OFFER
// GET /api/transport/flights/offers/:offerId
// =====================================================

export const getFlightOfferController =
  async (req, res) => {
    try {
      const { offerId } = req.params;

      if (!offerId) {
        return res.status(400).json({
          success: false,
          message:
            "Flight offer ID is required.",
        });
      }

      const result =
        await getFlightOffer(offerId);

      return res.status(200).json({
        success: true,
        provider: "duffel",
        configured: result.configured,
        offer: result.offer,
      });
    } catch (error) {
      console.error(
        "Get Flight Offer Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve flight offer.",
      });
    }
  };

// =====================================================
// CREATE FLIGHT ORDER
// POST /api/transport/flights/book
// =====================================================

export const createFlightOrderController =
  async (req, res) => {
    try {
      const {
        selected_offer_id,
        passengers,
      } = req.body;

      const result =
        await createFlightOrder({
          selectedOfferId:
            selected_offer_id,
          passengers,
        });

      return res.status(201).json({
        success: true,
        provider: "duffel",
        configured: result.configured,
        message:
          result.message ||
          "Flight order created successfully.",
        order: result.order,
      });
    } catch (error) {
      console.error(
        "Create Flight Order Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to create flight order.",
      });
    }
  };