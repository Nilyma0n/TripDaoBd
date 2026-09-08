import db from "../config/db.js";

const SERVICE_FEE_RATE = 0.05;
const TAX_RATE = 0.075;

const getUserId = (req) => req.user?.id || req.user?.userId;

const roundMoney = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const generateReferenceCode = () => {
  const timestamp = Date.now().toString(36).toUpperCase();

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `TDB-FLT-${timestamp}-${random}`;
};

const parsePassengerDetails = (value) => {
  if (!Array.isArray(value)) {
    return null;
  }

  return value;
};

/*
|--------------------------------------------------------------------------
| Create Flight Booking
|--------------------------------------------------------------------------
*/

export const createFlightBooking = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      inventory_id,
      passenger_count,
      passenger_details,
    } = req.body;

    const inventoryId = Number(inventory_id);
    const passengerCount = Number(passenger_count);

    if (!Number.isInteger(inventoryId) || inventoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid inventory_id is required.",
      });
    }

    if (
      !Number.isInteger(passengerCount) ||
      passengerCount < 1 ||
      passengerCount > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Passenger count must be between 1 and 20.",
      });
    }

    const passengers = parsePassengerDetails(
      passenger_details
    );

    if (!passengers || passengers.length !== passengerCount) {
      return res.status(400).json({
        success: false,
        message:
          "Passenger details must be provided for every passenger.",
      });
    }

    await connection.beginTransaction();

    /*
    |--------------------------------------------------------------------------
    | Lock inventory row
    |--------------------------------------------------------------------------
    */

    const [inventoryRows] = await connection.execute(
      `
      SELECT
        fi.id AS inventory_id,
        fi.schedule_id,
        fi.cabin_class,
        fi.total_seats,
        fi.available_seats,
        fi.booked_seats,
        fi.currency,
        fi.price_per_seat,
        fi.selling_enabled,
        fi.status AS inventory_status,

        fs.departure_date,
        fs.departure_time,
        fs.arrival_time,
        fs.duration_minutes,
        fs.status AS schedule_status,
        fs.is_active AS schedule_active,

        fr.id AS route_id,
        fr.origin_code,
        fr.origin_name,
        fr.destination_code,
        fr.destination_name,
        fr.airline_name,
        fr.airline_code,
        fr.flight_number,
        fr.is_active AS route_active,

        fsell.id AS seller_id,
        fsell.business_name AS seller_name,
        fsell.verification_status,
        fsell.selling_enabled AS seller_selling_enabled,
        fsell.is_active AS seller_active

      FROM flight_inventory fi

      INNER JOIN flight_schedules fs
        ON fs.id = fi.schedule_id

      INNER JOIN flight_routes fr
        ON fr.id = fs.route_id

      INNER JOIN flight_sellers fsell
        ON fsell.id = fr.seller_id

      WHERE fi.id = ?

      FOR UPDATE
      `,
      [inventoryId]
    );

    if (inventoryRows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Flight inventory not found.",
      });
    }

    const flight = inventoryRows[0];

    /*
    |--------------------------------------------------------------------------
    | Validate Seller
    |--------------------------------------------------------------------------
    */

    if (
      flight.verification_status !== "approved" ||
      Number(flight.seller_selling_enabled) !== 1 ||
      Number(flight.seller_active) !== 1
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This flight seller is not currently accepting bookings.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Route
    |--------------------------------------------------------------------------
    */

    if (Number(flight.route_active) !== 1) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "This flight route is no longer active.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Schedule
    |--------------------------------------------------------------------------
    */

    if (
      Number(flight.schedule_active) !== 1 ||
      flight.schedule_status === "cancelled"
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This flight schedule is not available for booking.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Inventory
    |--------------------------------------------------------------------------
    */

    if (
      Number(flight.selling_enabled) !== 1 ||
      flight.inventory_status !== "available"
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "This flight is not currently available for booking.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Seat Availability
    |--------------------------------------------------------------------------
    */

    const availableSeats = Number(
      flight.available_seats
    );

    if (availableSeats < passengerCount) {
      await connection.rollback();

      return res.status(409).json({
        success: false,
        message:
          `Only ${availableSeats} seat(s) are currently available.`,
        available_seats: availableSeats,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Price Snapshot
    |--------------------------------------------------------------------------
    */

    const pricePerSeat = Number(
      flight.price_per_seat
    );

    const baseAmount = roundMoney(
      pricePerSeat * passengerCount
    );

    const serviceFee = roundMoney(
      baseAmount * SERVICE_FEE_RATE
    );

    const taxAmount = roundMoney(
      (baseAmount + serviceFee) * TAX_RATE
    );

    const totalAmount = roundMoney(
      baseAmount +
        serviceFee +
        taxAmount
    );

    const referenceCode =
      generateReferenceCode();

    /*
    |--------------------------------------------------------------------------
    | Update Inventory
    |--------------------------------------------------------------------------
    */

    const newAvailableSeats =
      availableSeats - passengerCount;

    const newBookedSeats =
      Number(flight.booked_seats) +
      passengerCount;

    const newInventoryStatus =
      newAvailableSeats === 0
        ? "sold_out"
        : "available";

    await connection.execute(
      `
      UPDATE flight_inventory
      SET
        available_seats = ?,
        booked_seats = ?,
        status = ?
      WHERE id = ?
      `,
      [
        newAvailableSeats,
        newBookedSeats,
        newInventoryStatus,
        inventoryId,
      ]
    );

    /*
    |--------------------------------------------------------------------------
    | Create Booking
    |--------------------------------------------------------------------------
    */

    const [bookingResult] =
      await connection.execute(
        `
        INSERT INTO flight_bookings (
          user_id,
          seller_id,
          inventory_id,
          schedule_id,
          reference_code,
          passenger_count,
          passenger_details,
          currency,
          price_per_seat,
          base_amount,
          service_fee,
          tax_amount,
          total_amount,
          payment_status,
          booking_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          flight.seller_id,
          inventoryId,
          flight.schedule_id,
          referenceCode,
          passengerCount,
          JSON.stringify(passengers),
          flight.currency,
          pricePerSeat,
          baseAmount,
          serviceFee,
          taxAmount,
          totalAmount,
          "Pending",
          "Pending",
        ]
      );

    await connection.commit();

    return res.status(201).json({
      success: true,

      message:
        "Flight booking created successfully. Please complete payment.",

      data: {
        booking_id:
          bookingResult.insertId,

        reference_code:
          referenceCode,

        flight: {
          airline_name:
            flight.airline_name,

          airline_code:
            flight.airline_code,

          flight_number:
            flight.flight_number,

          origin_code:
            flight.origin_code,

          origin_name:
            flight.origin_name,

          destination_code:
            flight.destination_code,

          destination_name:
            flight.destination_name,

          departure_date:
            flight.departure_date,

          departure_time:
            flight.departure_time,

          arrival_time:
            flight.arrival_time,

          duration_minutes:
            flight.duration_minutes,

          cabin_class:
            flight.cabin_class,
        },

        seller: {
          id: flight.seller_id,

          business_name:
            flight.seller_name,
        },

        pricing: {
          currency:
            flight.currency,

          price_per_seat:
            pricePerSeat,

          passenger_count:
            passengerCount,

          base_amount:
            baseAmount,

          service_fee:
            serviceFee,

          tax_amount:
            taxAmount,

          total_amount:
            totalAmount,
        },

        seats: {
          booked:
            passengerCount,

          remaining:
            newAvailableSeats,
        },

        payment_status:
          "Pending",

        booking_status:
          "Pending",
      },
    });
  } catch (error) {
    await connection.rollback();

    console.error(
      "Create Flight Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while creating flight booking.",
    });
  } finally {
    connection.release();
  }
};

/*
|--------------------------------------------------------------------------
| Get My Flight Bookings
|--------------------------------------------------------------------------
*/

export const getMyFlightBookings = async (
  req,
  res
) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        fb.id,
        fb.reference_code,
        fb.passenger_count,

        fb.currency,
        fb.price_per_seat,
        fb.base_amount,
        fb.service_fee,
        fb.tax_amount,
        fb.total_amount,

        fb.payment_status,
        fb.booking_status,

        fb.passenger_details,

        fb.created_at,
        fb.updated_at,

        fsell.id AS seller_id,
        fsell.business_name AS seller_name,

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

        fi.cabin_class

      FROM flight_bookings fb

      INNER JOIN flight_sellers fsell
        ON fsell.id = fb.seller_id

      INNER JOIN flight_schedules fs
        ON fs.id = fb.schedule_id

      INNER JOIN flight_routes fr
        ON fr.id = fs.route_id

      INNER JOIN flight_inventory fi
        ON fi.id = fb.inventory_id

      WHERE fb.user_id = ?

      ORDER BY fb.created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Get My Flight Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while retrieving flight bookings.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Flight Booking By ID
|--------------------------------------------------------------------------
*/

export const getFlightBookingById = async (
  req,
  res
) => {
  try {
    const userId = getUserId(req);

    const bookingId =
      Number(req.params.id);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    if (
      !Number.isInteger(bookingId) ||
      bookingId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid booking ID.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        fb.id,
        fb.user_id,
        fb.seller_id,
        fb.inventory_id,
        fb.schedule_id,

        fb.reference_code,
        fb.passenger_count,
        fb.passenger_details,

        fb.currency,
        fb.price_per_seat,
        fb.base_amount,
        fb.service_fee,
        fb.tax_amount,
        fb.total_amount,

        fb.payment_status,
        fb.booking_status,

        fb.seller_notes,
        fb.admin_notes,

        fb.created_at,
        fb.updated_at,

        fsell.business_name AS seller_name,

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

        fi.cabin_class

      FROM flight_bookings fb

      INNER JOIN flight_sellers fsell
        ON fsell.id = fb.seller_id

      INNER JOIN flight_schedules fs
        ON fs.id = fb.schedule_id

      INNER JOIN flight_routes fr
        ON fr.id = fs.route_id

      INNER JOIN flight_inventory fi
        ON fi.id = fb.inventory_id

      WHERE fb.id = ?
        AND fb.user_id = ?

      LIMIT 1
      `,
      [
        bookingId,
        userId,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Flight booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(
      "Get Flight Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while retrieving flight booking.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Seller: Get Flight Bookings
|--------------------------------------------------------------------------
*/

export const getSellerFlightBookings =
  async (req, res) => {
    try {
      const userId = getUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      const [sellerRows] =
        await db.execute(
          `
          SELECT id
          FROM flight_sellers
          WHERE user_id = ?
            AND is_active = 1
          LIMIT 1
          `,
          [userId]
        );

      if (sellerRows.length === 0) {
        return res.status(403).json({
          success: false,
          message:
            "Flight seller profile not found.",
        });
      }

      const sellerId =
        sellerRows[0].id;

      const [rows] =
        await db.execute(
          `
          SELECT
            fb.id,
            fb.reference_code,
            fb.user_id,

            fb.passenger_count,
            fb.passenger_details,

            fb.currency,
            fb.price_per_seat,
            fb.base_amount,
            fb.service_fee,
            fb.tax_amount,
            fb.total_amount,

            fb.payment_status,
            fb.booking_status,

            fb.seller_notes,
            fb.admin_notes,

            fb.created_at,
            fb.updated_at,

            u.full_name AS traveler_name,
            u.email AS traveler_email,
            u.phone AS traveler_phone,

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

            fi.cabin_class

          FROM flight_bookings fb

          INNER JOIN users u
            ON u.id = fb.user_id

          INNER JOIN flight_schedules fs
            ON fs.id = fb.schedule_id

          INNER JOIN flight_routes fr
            ON fr.id = fs.route_id

          INNER JOIN flight_inventory fi
            ON fi.id = fb.inventory_id

          WHERE fb.seller_id = ?

          ORDER BY fb.created_at DESC
          `,
          [sellerId]
        );

      return res.status(200).json({
        success: true,
        count: rows.length,
        data: rows,
      });
    } catch (error) {
      console.error(
        "Get Seller Flight Bookings Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while retrieving seller bookings.",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Seller: Confirm Booking
|--------------------------------------------------------------------------
*/

export const confirmSellerFlightBooking =
  async (req, res) => {
    try {
      const userId = getUserId(req);

      const bookingId =
        Number(req.params.id);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      if (
        !Number.isInteger(bookingId) ||
        bookingId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid booking ID.",
        });
      }

      const [sellerRows] =
        await db.execute(
          `
          SELECT id
          FROM flight_sellers
          WHERE user_id = ?
            AND verification_status = 'approved'
            AND selling_enabled = 1
            AND is_active = 1
          LIMIT 1
          `,
          [userId]
        );

      if (sellerRows.length === 0) {
        return res.status(403).json({
          success: false,
          message:
            "Approved flight seller access is required.",
        });
      }

      const sellerId =
        sellerRows[0].id;

      const [bookingRows] =
        await db.execute(
          `
          SELECT
            id,
            user_id,
            reference_code,
            total_amount,
            booking_status,
            payment_status
          FROM flight_bookings
          WHERE id = ?
            AND seller_id = ?
          LIMIT 1
          `,
          [
            bookingId,
            sellerId,
          ]
        );

      if (bookingRows.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Flight booking not found.",
        });
      }

      const booking =
        bookingRows[0];

      if (
        booking.booking_status !==
        "Pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only pending bookings can be confirmed.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Payment must be completed first
      |--------------------------------------------------------------------------
      */

      if (
        booking.payment_status !==
        "Paid"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Booking cannot be confirmed until payment is completed.",
        });
      }

      await db.execute(
        `
        UPDATE flight_bookings
        SET booking_status = 'Confirmed'
        WHERE id = ?
          AND seller_id = ?
          AND booking_status = 'Pending'
        `,
        [
          bookingId,
          sellerId,
        ]
      );

      /*
      |--------------------------------------------------------------------------
      | Traveler Notification
      |--------------------------------------------------------------------------
      */

      await db.execute(
        `
        INSERT INTO notifications (
          user_id,
          title,
          message,
          type,
          link,
          is_read
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          booking.user_id,
          "Flight Booking Confirmed",
          `Your flight booking ${booking.reference_code} has been confirmed by the seller.`,
          "booking",
          `/dashboard/flights/bookings/${bookingId}`,
          0,
        ]
      );

      return res.status(200).json({
        success: true,
        message:
          "Flight booking confirmed successfully.",
        booking: {
          id: bookingId,
          reference_code:
            booking.reference_code,
          booking_status:
            "Confirmed",
          payment_status:
            booking.payment_status,
        },
      });
    } catch (error) {
      console.error(
        "Confirm Seller Flight Booking Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while confirming flight booking.",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Seller: Reject Booking
|--------------------------------------------------------------------------
*/

export const rejectSellerFlightBooking =
  async (req, res) => {
    const connection =
      await db.getConnection();

    try {
      const userId =
        getUserId(req);

      const bookingId =
        Number(req.params.id);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message:
            "Authentication required.",
        });
      }

      if (
        !Number.isInteger(bookingId) ||
        bookingId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid booking ID.",
        });
      }

      const [sellerRows] =
        await connection.execute(
          `
          SELECT id
          FROM flight_sellers
          WHERE user_id = ?
            AND is_active = 1
          LIMIT 1
          `,
          [userId]
        );

      if (sellerRows.length === 0) {
        return res.status(403).json({
          success: false,
          message:
            "Flight seller profile not found.",
        });
      }

      const sellerId =
        sellerRows[0].id;

      await connection.beginTransaction();

      /*
      |--------------------------------------------------------------------------
      | Lock booking
      |--------------------------------------------------------------------------
      */

      const [bookingRows] =
        await connection.execute(
          `
          SELECT
            id,
            user_id,
            inventory_id,
            passenger_count,
            reference_code,
            payment_status,
            booking_status
          FROM flight_bookings
          WHERE id = ?
            AND seller_id = ?
          FOR UPDATE
          `,
          [
            bookingId,
            sellerId,
          ]
        );

      if (bookingRows.length === 0) {
        await connection.rollback();

        return res.status(404).json({
          success: false,
          message:
            "Flight booking not found.",
        });
      }

      const booking =
        bookingRows[0];

      if (
        booking.booking_status !==
        "Pending"
      ) {
        await connection.rollback();

        return res.status(400).json({
          success: false,
          message:
            "Only pending bookings can be rejected.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Lock inventory
      |--------------------------------------------------------------------------
      */

      const [inventoryRows] =
        await connection.execute(
          `
          SELECT
            available_seats,
            booked_seats,
            total_seats
          FROM flight_inventory
          WHERE id = ?
          FOR UPDATE
          `,
          [booking.inventory_id]
        );

      if (inventoryRows.length === 0) {
        await connection.rollback();

        return res.status(404).json({
          success: false,
          message:
            "Flight inventory not found.",
        });
      }

      const inventory =
        inventoryRows[0];

      /*
      |--------------------------------------------------------------------------
      | Restore seats
      |--------------------------------------------------------------------------
      */

      const restoredAvailableSeats =
        Number(
          inventory.available_seats
        ) +
        Number(
          booking.passenger_count
        );

      const newBookedSeats =
        Math.max(
          0,
          Number(
            inventory.booked_seats
          ) -
            Number(
              booking.passenger_count
            )
        );

      const newStatus =
        restoredAvailableSeats > 0
          ? "available"
          : "sold_out";

      await connection.execute(
        `
        UPDATE flight_inventory
        SET
          available_seats = ?,
          booked_seats = ?,
          status = ?
        WHERE id = ?
        `,
        [
          restoredAvailableSeats,
          newBookedSeats,
          newStatus,
          booking.inventory_id,
        ]
      );

      /*
      |--------------------------------------------------------------------------
      | Reject booking
      |--------------------------------------------------------------------------
      */

      await connection.execute(
        `
        UPDATE flight_bookings
        SET booking_status = 'Rejected'
        WHERE id = ?
          AND seller_id = ?
        `,
        [
          bookingId,
          sellerId,
        ]
      );

      /*
      |--------------------------------------------------------------------------
      | Traveler Notification
      |--------------------------------------------------------------------------
      */

      await connection.execute(
        `
        INSERT INTO notifications (
          user_id,
          title,
          message,
          type,
          link,
          is_read
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          booking.user_id,
          "Flight Booking Rejected",
          `Your flight booking ${booking.reference_code} has been rejected by the seller.`,
          "booking",
          `/dashboard/flights/bookings/${bookingId}`,
          0,
        ]
      );

      await connection.commit();

      return res.status(200).json({
        success: true,

        message:
          "Flight booking rejected and seats restored successfully.",

        restored_seats:
          booking.passenger_count,

        booking: {
          id: bookingId,
          reference_code:
            booking.reference_code,
          booking_status:
            "Rejected",
          payment_status:
            booking.payment_status,
        },
      });
    } catch (error) {
      await connection.rollback();

      console.error(
        "Reject Seller Flight Booking Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while rejecting flight booking.",
      });
    } finally {
      connection.release();
    }
  };