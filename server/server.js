import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import flightSellerRoutes from "./routes/flightSellerRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";

dotenv.config();

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// =====================================================
// AUTHENTICATION ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

// =====================================================
// BOOKING ROUTES
// =====================================================

app.use("/api/bookings", bookingRoutes);

app.use(
  "/api/admin/bookings",
  adminBookingRoutes
);

// =====================================================
// NOTIFICATION ROUTES
// =====================================================

app.use("/api/notifications", notificationRoutes);

// =====================================================
// PAYMENT ROUTES
// =====================================================

app.use("/api/payments", paymentRoutes);

app.use(
  "/api/payment-methods",
  paymentMethodRoutes
);

// =====================================================
// DESTINATION ROUTES
// =====================================================

app.use(
  "/api/destinations",
  destinationRoutes
);

// =====================================================
// TRANSPORT ROUTES
// =====================================================

app.use(
  "/api/transport",
  transportRoutes
);

// =====================================================
// FLIGHT SELLER MARKETPLACE ROUTES
// =====================================================
//
// Seller:
// POST /api/flight-sellers/register
// GET  /api/flight-sellers/me
// PUT  /api/flight-sellers/me
//
// Admin:
// GET /api/flight-sellers/admin/all
// PUT /api/flight-sellers/admin/:id/approve
// PUT /api/flight-sellers/admin/:id/reject
// PUT /api/flight-sellers/admin/:id/toggle-selling
//
// =====================================================

app.use(
  "/api/flight-sellers",
  flightSellerRoutes
);

app.use("/api/flights", flightRoutes);
// =====================================================
// TEST SERVER + DATABASE CONNECTION
// =====================================================

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT NOW() AS currentTime"
    );

    res.json({
      success: true,
      message: "TripDaoBD Backend Running",
      database: "Connected",
      time: rows[0].currentTime,
    });
  } catch (error) {
    console.error(
      "Database Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error(
    "Server Error:",
    err
  );

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});