import db from "../config/db.js";

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime());
};

export const searchFlights = async (req, res) => {
  try {
    const {
      origin,
      destination,
      date,
      passengers = 1,
      cabin_class,
    } = req.query;

    const normalizedOrigin = String(origin || "")
      .trim()
      .toUpperCase();

    const normalizedDestination = String(destination || "")
      .trim()
      .toUpperCase();

    const passengerCount = Number(passengers);

    if (!normalizedOrigin || !normalizedDestination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination are required.",
      });
    }

    if (normalizedOrigin === normalizedDestination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination cannot be the same.",
      });
    }

    if (!date || !isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "A valid travel date is required. Use YYYY-MM-DD.",
      });
    }

    if (
      !Number.isInteger(passengerCount) ||
      passengerCount < 1 ||
      passengerCount > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Passengers must be between 1 and 20.",
      });
    }

    const allowedCabins = [
      "economy",
      "premium_economy",
      "business",
      "first",
    ];

    if (
      cabin_class &&
      !allowedCabins.includes(String(cabin_class).toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid cabin class.",
      });
    }

    const conditions = [
      "fr.origin_code = ?",
      "fr.destination_code = ?",
      "fs.departure_date = ?",
      "fs.status = 'scheduled'",
      "fs.is_active = 1",
      "fr.is_active = 1",
      "fi.selling_enabled = 1",
      "fi.status = 'available'",
      "fi.available_seats >= ?",
      "fsell.verification_status = 'approved'",
      "fsell.selling_enabled = 1",
      "fsell.is_active = 1",
    ];

    const params = [
      normalizedOrigin,
      normalizedDestination,
      date,
      passengerCount,
    ];

    if (cabin_class) {
      conditions.push("fi.cabin_class = ?");
      params.push(String(cabin_class).toLowerCase());
    }

    const [rows] = await db.execute(
      `
      SELECT
        fi.id AS inventory_id,
        fs.id AS schedule_id,
        fr.id AS route_id,

        fsell.id AS seller_id,
        fsell.business_name AS seller_name,
        fsell.seller_type,

        fr.airline_name,
        fr.airline_code,
        fr.flight_number,

        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,

        fs.departure_date,
        fs.departure_time,
        fs.arrival_time,
        fs.duration_minutes,
        fs.status AS schedule_status,

        fi.cabin_class,
        fi.total_seats,
        fi.available_seats,
        fi.currency,
        fi.price_per_seat,

        CASE
          WHEN fi.available_seats = 0 THEN 'sold_out'
          WHEN fi.available_seats <= 5 THEN 'limited'
          ELSE 'available'
        END AS availability_status

      FROM flight_inventory fi

      INNER JOIN flight_schedules fs
        ON fs.id = fi.schedule_id

      INNER JOIN flight_routes fr
        ON fr.id = fs.route_id

      INNER JOIN flight_sellers fsell
        ON fsell.id = fr.seller_id

      WHERE ${conditions.join(" AND ")}

      ORDER BY
        fs.departure_time ASC,
        fi.price_per_seat ASC,
        fsell.business_name ASC
      `,
      params
    );

    return res.status(200).json({
      success: true,
      message:
        rows.length > 0
          ? "Available flights retrieved successfully."
          : "No available flights found.",
      search: {
        origin: normalizedOrigin,
        destination: normalizedDestination,
        date,
        passengers: passengerCount,
        cabin_class: cabin_class
          ? String(cabin_class).toLowerCase()
          : null,
      },
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Flight Search Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while searching flights.",
    });
  }
};