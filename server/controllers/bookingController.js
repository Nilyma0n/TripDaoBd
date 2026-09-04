import pool from "../config/db.js";

// =====================================================
// BOOKING PRICE CONFIGURATION
// =====================================================

// Base room price PER ROOM PER NIGHT
const BASE_ROOM_PRICE = 8500;

// Service fee percentage
const SERVICE_FEE_RATE = 0.05;

// VAT percentage
const VAT_RATE = 0.075;

// Minimum number of nights
const MIN_NIGHTS = 2;


// =====================================================
// HELPER: GET USER ID
// =====================================================

const getAuthenticatedUserId = (req) => {
  return req.user?.id || req.user?.userId;
};


// =====================================================
// HELPER: NORMALIZE DATE
// =====================================================

const normalizeDate = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    const year = value.getFullYear();

    const month = String(
      value.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      value.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const stringValue = String(value).trim();

  if (!stringValue) {
    return null;
  }

  const dateOnlyMatch = stringValue.match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  );

  if (dateOnlyMatch) {
    return stringValue;
  }

  const mysqlDateMatch = stringValue.match(
    /^(\d{4})-(\d{2})-(\d{2})/
  );

  if (mysqlDateMatch) {
    return `${mysqlDateMatch[1]}-${mysqlDateMatch[2]}-${mysqlDateMatch[3]}`;
  }

  const parsed = new Date(stringValue);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const year = parsed.getFullYear();

  const month = String(
    parsed.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsed.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


// =====================================================
// HELPER: CREATE LOCAL DATE
// =====================================================

const createLocalDate = (value) => {
  const normalized = normalizeDate(value);

  if (!normalized) {
    return null;
  }

  const [year, month, day] = normalized
    .split("-")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};


// =====================================================
// HELPER: CALCULATE NIGHTS
// =====================================================

const calculateNights = (
  checkIn,
  checkOut
) => {
  const start = createLocalDate(checkIn);
  const end = createLocalDate(checkOut);

  if (!start || !end) {
    return 0;
  }

  const difference =
    end.getTime() - start.getTime();

  return Math.round(
    difference /
      (1000 * 60 * 60 * 24)
  );
};


// =====================================================
// HELPER: ROUND MONEY
// =====================================================

const roundMoney = (amount) => {
  return (
    Math.round(
      Number(amount) * 100
    ) / 100
  );
};


// =====================================================
// HELPER: CREATE NOTIFICATION
// =====================================================

const createBookingNotification = async ({
  userId,
  title,
  message,
  link = "/dashboard/bookings",
}) => {
  if (!userId) {
    return;
  }

  await pool.query(
    `
    INSERT INTO notifications (
      user_id,
      title,
      message,
      type,
      link
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      userId,
      title,
      message,
      "booking",
      link,
    ]
  );
};


// =====================================================
// CREATE BOOKING
// POST /api/bookings
// =====================================================

export const createBooking = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const {
      full_name,
      email,
      phone,
      guests,
      rooms,
      check_in,
      check_out,
      special_request,
      destination,
      location,
    } = req.body;

    if (
      !full_name ||
      !email ||
      !phone ||
      !check_in ||
      !check_out
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide full name, email, phone, check-in and check-out dates.",
      });
    }

    const normalizedCheckIn =
      normalizeDate(check_in);

    const normalizedCheckOut =
      normalizeDate(check_out);

    if (
      !normalizedCheckIn ||
      !normalizedCheckOut
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid check-in and check-out dates.",
      });
    }

    const guestCount =
      Number(guests) || 1;

    const roomCount =
      Number(rooms) || 1;

    if (guestCount < 1) {
      return res.status(400).json({
        success: false,
        message:
          "At least 1 guest is required.",
      });
    }

    if (roomCount < 1) {
      return res.status(400).json({
        success: false,
        message:
          "At least 1 room is required.",
      });
    }

    const nights =
      calculateNights(
        normalizedCheckIn,
        normalizedCheckOut
      );

    if (nights <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out date must be after check-in date.",
      });
    }

    if (nights < MIN_NIGHTS) {
      return res.status(400).json({
        success: false,
        message:
          `Minimum stay is ${MIN_NIGHTS} nights.`,
      });
    }

    // Backend calculates price.
    const roomSubtotal =
      roundMoney(
        BASE_ROOM_PRICE *
          roomCount *
          nights
      );

    const serviceFee =
      roundMoney(
        roomSubtotal *
          SERVICE_FEE_RATE
      );

    const vatAmount =
      roundMoney(
        (roomSubtotal +
          serviceFee) *
          VAT_RATE
      );

    const totalAmount =
      roundMoney(
        roomSubtotal +
          serviceFee +
          vatAmount
      );

    const bookingDestination =
      destination ||
      "Cox's Bazar Retreat";

    const bookingLocation =
      location ||
      "Cox's Bazar, Bangladesh";

    const [result] =
      await pool.query(
        `
        INSERT INTO bookings (
          user_id,
          full_name,
          email,
          phone,
          guests,
          rooms,
          check_in,
          check_out,
          special_request,
          destination,
          location,
          room_price,
          service_fee,
          vat,
          total_price,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          full_name,
          email,
          phone,
          guestCount,
          roomCount,
          normalizedCheckIn,
          normalizedCheckOut,
          special_request || null,
          bookingDestination,
          bookingLocation,
          roomSubtotal,
          serviceFee,
          vatAmount,
          totalAmount,
          "Pending",
        ]
      );

    const [rows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        LIMIT 1
        `,
        [result.insertId]
      );

    if (rows.length === 0) {
      return res.status(500).json({
        success: false,
        message:
          "Booking was created but could not be retrieved.",
      });
    }

    const createdBooking =
      rows[0];

    await createBookingNotification({
      userId,

      title:
        "Booking Request Submitted",

      message:
        `Your booking for ${bookingDestination} from ${normalizedCheckIn} to ${normalizedCheckOut} has been submitted successfully. Booking #${String(
          result.insertId
        ).padStart(5, "0")}.`,
    });

    return res.status(201).json({
      success: true,

      message:
        "Booking request submitted successfully.",

      booking:
        createdBooking,

      pricing: {
        room_price_per_night:
          BASE_ROOM_PRICE,

        rooms:
          roomCount,

        nights,

        room_subtotal:
          roomSubtotal,

        service_fee:
          serviceFee,

        vat:
          vatAmount,

        total_price:
          totalAmount,
      },

      payment: {
        status:
          "Pending",

        message:
          "Payment can be completed after your booking is confirmed.",
      },
    });

  } catch (error) {
    console.error(
      "Create Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create booking.",
      error: error.message,
    });
  }
};


// =====================================================
// GET MY BOOKINGS
// GET /api/bookings/my
// =====================================================

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const [rows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId]
      );

    return res.status(200).json({
      success: true,
      count:
        rows.length,
      bookings:
        rows,
    });

  } catch (error) {
    console.error(
      "Get Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load bookings.",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// =====================================================

export const getBookingById = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    const bookingId =
      req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const [rows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        AND user_id = ?
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
          "Booking not found.",
      });
    }

    const booking =
      rows[0];

    const normalizedCheckIn =
      normalizeDate(
        booking.check_in
      );

    const normalizedCheckOut =
      normalizeDate(
        booking.check_out
      );

    const nights =
      calculateNights(
        normalizedCheckIn,
        normalizedCheckOut
      );

    return res.status(200).json({
      success: true,

      booking: {
        ...booking,

        check_in:
          normalizedCheckIn,

        check_out:
          normalizedCheckOut,
      },

      pricing: {
        nights,

        room_price_per_night:
          BASE_ROOM_PRICE,

        rooms:
          Number(booking.rooms) || 1,

        room_subtotal:
          Number(
            booking.room_price
          ) || 0,

        service_fee:
          Number(
            booking.service_fee
          ) || 0,

        vat:
          Number(
            booking.vat
          ) || 0,

        total_price:
          Number(
            booking.total_price
          ) || 0,
      },
    });

  } catch (error) {
    console.error(
      "Get Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load booking.",
      error: error.message,
    });
  }
};


// =====================================================
// CANCEL OWN BOOKING
// PUT /api/bookings/:id/cancel
// =====================================================

export const cancelBooking = async (
  req,
  res
) => {
  try {
    const userId =
      getAuthenticatedUserId(req);

    const bookingId =
      req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const [bookingRows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        AND user_id = ?
        LIMIT 1
        `,
        [
          bookingId,
          userId,
        ]
      );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found.",
      });
    }

    const booking =
      bookingRows[0];

    if (
      booking.status !== "Pending" &&
      booking.status !== "Confirmed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This booking cannot be cancelled.",
      });
    }

    const [result] =
      await pool.query(
        `
        UPDATE bookings
        SET status = 'Cancelled'
        WHERE id = ?
        AND user_id = ?
        `,
        [
          bookingId,
          userId,
        ]
      );

    if (
      result.affectedRows === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be cancelled.",
      });
    }

    await createBookingNotification({
      userId,

      title:
        "Booking Cancelled",

      message:
        `Your booking #${String(
          bookingId
        ).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } has been cancelled successfully.`,
    });

    return res.status(200).json({
      success: true,

      message:
        "Booking cancelled successfully.",

      booking_id:
        bookingId,

      status:
        "Cancelled",
    });

  } catch (error) {
    console.error(
      "Cancel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to cancel booking.",
      error: error.message,
    });
  }
};


// =====================================================
// ADMIN: GET ALL BOOKINGS
// GET /api/bookings/admin/all
//
// Requires:
// - Authentication
// - booking.view_all
// =====================================================

export const getAllBookings = async (
  req,
  res
) => {
  try {
    const [rows] =
      await pool.query(
        `
        SELECT
          b.*,
          u.full_name AS user_full_name,
          u.email AS user_email,
          u.phone AS user_phone
        FROM bookings b
        LEFT JOIN users u
          ON u.id = b.user_id
        ORDER BY b.created_at DESC
        `
      );

    return res.status(200).json({
      success: true,

      count:
        rows.length,

      bookings:
        rows,
    });

  } catch (error) {
    console.error(
      "Get All Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load all bookings.",
      error: error.message,
    });
  }
};


// =====================================================
// ADMIN: CONFIRM BOOKING
// PUT /api/bookings/admin/:id/confirm
//
// Requires:
// - Authentication
// - booking.confirm
// =====================================================

export const confirmBooking = async (
  req,
  res
) => {
  try {
    const bookingId =
      req.params.id;

    const [bookingRows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        LIMIT 1
        `,
        [bookingId]
      );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found.",
      });
    }

    const booking =
      bookingRows[0];

    if (
      booking.status !== "Pending"
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Booking cannot be confirmed because its current status is "${booking.status}".`,
      });
    }

    const [result] =
      await pool.query(
        `
        UPDATE bookings
        SET status = 'Confirmed'
        WHERE id = ?
        AND status = 'Pending'
        `,
        [bookingId]
      );

    if (
      result.affectedRows === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be confirmed.",
      });
    }

    await createBookingNotification({
      userId:
        booking.user_id,

      title:
        "Booking Confirmed",

      message:
        `Your booking #${String(
          bookingId
        ).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } has been confirmed.`,

      link:
        `/dashboard/bookings/${bookingId}`,
    });

    return res.status(200).json({
      success: true,

      message:
        "Booking confirmed successfully.",

      booking_id:
        bookingId,

      status:
        "Confirmed",
    });

  } catch (error) {
    console.error(
      "Confirm Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to confirm booking.",
      error: error.message,
    });
  }
};


// =====================================================
// ADMIN: REJECT BOOKING
// PUT /api/bookings/admin/:id/reject
//
// Requires:
// - Authentication
// - booking.reject
// =====================================================

export const rejectBooking = async (
  req,
  res
) => {
  try {
    const bookingId =
      req.params.id;

    const [bookingRows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        LIMIT 1
        `,
        [bookingId]
      );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found.",
      });
    }

    const booking =
      bookingRows[0];

    if (
      booking.status !== "Pending"
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Booking cannot be rejected because its current status is "${booking.status}".`,
      });
    }

    const [result] =
      await pool.query(
        `
        UPDATE bookings
        SET status = 'Rejected'
        WHERE id = ?
        AND status = 'Pending'
        `,
        [bookingId]
      );

    if (
      result.affectedRows === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be rejected.",
      });
    }

    await createBookingNotification({
      userId:
        booking.user_id,

      title:
        "Booking Rejected",

      message:
        `Your booking #${String(
          bookingId
        ).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } has been rejected.`,

      link:
        `/dashboard/bookings/${bookingId}`,
    });

    return res.status(200).json({
      success: true,

      message:
        "Booking rejected successfully.",

      booking_id:
        bookingId,

      status:
        "Rejected",
    });

  } catch (error) {
    console.error(
      "Reject Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to reject booking.",
      error: error.message,
    });
  }
};


// =====================================================
// ADMIN: CANCEL ANY BOOKING
// PUT /api/bookings/admin/:id/cancel
//
// Requires:
// - Authentication
// - booking.cancel_any
// =====================================================

export const cancelBookingAny = async (
  req,
  res
) => {
  try {
    const bookingId =
      req.params.id;

    const [bookingRows] =
      await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id = ?
        LIMIT 1
        `,
        [bookingId]
      );

    if (bookingRows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found.",
      });
    }

    const booking =
      bookingRows[0];

    if (
      booking.status === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This booking is already cancelled.",
      });
    }

    if (
      booking.status === "Rejected"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rejected bookings cannot be cancelled.",
      });
    }

    const [result] =
      await pool.query(
        `
        UPDATE bookings
        SET status = 'Cancelled'
        WHERE id = ?
        AND status <> 'Cancelled'
        `,
        [bookingId]
      );

    if (
      result.affectedRows === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking could not be cancelled.",
      });
    }

    await createBookingNotification({
      userId:
        booking.user_id,

      title:
        "Booking Cancelled",

      message:
        `Your booking #${String(
          bookingId
        ).padStart(
          5,
          "0"
        )} for ${
          booking.destination ||
          "your selected destination"
        } has been cancelled by the administrator.`,

      link:
        `/dashboard/bookings/${bookingId}`,
    });

    return res.status(200).json({
      success: true,

      message:
        "Booking cancelled successfully by admin.",

      booking_id:
        bookingId,

      status:
        "Cancelled",
    });

  } catch (error) {
    console.error(
      "Admin Cancel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to cancel booking.",
      error: error.message,
    });
  }
};