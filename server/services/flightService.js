import dotenv from "dotenv";

dotenv.config();

const DUFFEL_API_BASE_URL = "https://api.duffel.com";
const DUFFEL_API_VERSION =
  process.env.DUFFEL_API_VERSION || "v2";

/**
 * Check whether Duffel credentials are configured.
 */
const isDuffelConfigured = () => {
  return Boolean(process.env.DUFFEL_API_KEY);
};

/**
 * Create common headers for Duffel API requests.
 */
const getDuffelHeaders = () => {
  if (!isDuffelConfigured()) {
    throw new Error(
      "Duffel API key is not configured."
    );
  }

  return {
    Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
    "Duffel-Version": DUFFEL_API_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

/**
 * Search available flights through Duffel.
 *
 * @param {Object} params
 * @param {string} params.origin
 * @param {string} params.destination
 * @param {string} params.departureDate - YYYY-MM-DD
 * @param {number} params.passengers
 */
export const searchFlights = async ({
  origin,
  destination,
  departureDate,
  passengers = 1,
}) => {
  if (!origin || !destination || !departureDate) {
    throw new Error(
      "Origin, destination and departure date are required."
    );
  }

  const passengerCount = Number(passengers);

  if (
    !Number.isInteger(passengerCount) ||
    passengerCount < 1 ||
    passengerCount > 9
  ) {
    throw new Error(
      "Passenger count must be between 1 and 9."
    );
  }

  if (!isDuffelConfigured()) {
    return {
      configured: false,
      message:
        "Flight provider is not configured yet. Add DUFFEL_API_KEY to the server environment.",
      offers: [],
    };
  }

  const response = await fetch(
    `${DUFFEL_API_BASE_URL}/air/offer_requests`,
    {
      method: "POST",
      headers: getDuffelHeaders(),
      body: JSON.stringify({
        data: {
          slices: [
            {
              origin: origin.toUpperCase(),
              destination:
                destination.toUpperCase(),
              departure_date: departureDate,
            },
          ],

          passengers: Array.from(
            { length: passengerCount },
            () => ({
              type: "adult",
            })
          ),

          cabin_class:
            "economy",
        },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const providerMessage =
      result?.errors?.[0]?.message ||
      result?.message ||
      "Duffel flight search failed.";

    throw new Error(providerMessage);
  }

  return {
    configured: true,
    offers: result?.data?.offers || [],
    offerRequest: result?.data || null,
    raw: result,
  };
};

/**
 * Retrieve a single flight offer.
 */
export const getFlightOffer = async (
  offerId
) => {
  if (!offerId) {
    throw new Error(
      "Flight offer ID is required."
    );
  }

  if (!isDuffelConfigured()) {
    return {
      configured: false,
      message:
        "Flight provider is not configured yet.",
      offer: null,
    };
  }

  const response = await fetch(
    `${DUFFEL_API_BASE_URL}/air/offers/${encodeURIComponent(
      offerId
    )}`,
    {
      method: "GET",
      headers: getDuffelHeaders(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const providerMessage =
      result?.errors?.[0]?.message ||
      result?.message ||
      "Unable to retrieve flight offer.";

    throw new Error(providerMessage);
  }

  return {
    configured: true,
    offer: result?.data || null,
    raw: result,
  };
};

/**
 * Create a flight order.
 *
 * NOTE:
 * Actual order creation will be connected
 * after passenger/payment architecture is ready.
 */
export const createFlightOrder = async ({
  selectedOfferId,
  passengers,
}) => {
  if (!selectedOfferId) {
    throw new Error(
      "Selected flight offer ID is required."
    );
  }

  if (
    !Array.isArray(passengers) ||
    passengers.length === 0
  ) {
    throw new Error(
      "At least one passenger is required."
    );
  }

  if (!isDuffelConfigured()) {
    return {
      configured: false,
      message:
        "Flight provider is not configured yet.",
      order: null,
    };
  }

  /*
   * We intentionally keep order creation isolated.
   *
   * Before enabling live booking, we will add:
   * - passenger validation
   * - payment flow
   * - price revalidation
   * - idempotency protection
   * - booking persistence
   * - provider error handling
   */

  throw new Error(
    "Flight order creation is not enabled yet. Complete payment and passenger integration first."
  );
};