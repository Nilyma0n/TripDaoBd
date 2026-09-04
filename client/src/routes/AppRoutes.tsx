import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// =====================================================
// HOME
// =====================================================
import Home from "../pages/Home/Home";

// =====================================================
// DESTINATIONS
// =====================================================
import Explore from "../pages/Explore/Explore";
import DestinationDetails from "../pages/Destination/DestinationDetails";

// =====================================================
// HOTELS
// =====================================================
import Hotels from "../pages/Hotels/Hotels";
import HotelDetails from "../pages/Hotels/HotelDetails";

// =====================================================
// RESTAURANTS
// =====================================================
import Restaurants from "../pages/Restaurants/Restaurants";

// =====================================================
// TRANSPORTATION
// =====================================================
import Transportation from "../pages/Transportation/Transportation";
import TransportDetails from "../pages/Transportation/TransportDetails";

// =====================================================
// BOOKING
// =====================================================
import Booking from "../pages/Booking/Booking";

// =====================================================
// GENERAL PAGES
// =====================================================
import Features from "../pages/Features/Features";
import Newsletter from "../pages/Newsletter/NewsletterPage";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";
import Emergency from "../pages/Emergency/Emergency";
import EmergencyDetails from "../pages/Emergency/EmergencyDetails";

// =====================================================
// AUTHENTICATION
// =====================================================
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// =====================================================
// DASHBOARD
// =====================================================
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile";
import MyBookings from "../pages/Dashboard/MyBookings";
import Wishlist from "../pages/Dashboard/Wishlist";
import Settings from "../pages/Dashboard/Settings";
import Messages from "../pages/Dashboard/Messages";
import Notifications from "../pages/Dashboard/Notifications";

// =====================================================
// BOOKING DETAILS
// =====================================================
import BookingDetails from "../pages/Dashboard/BookingDetails/BookingDetails";

// =====================================================
// SETTINGS / ACCOUNT PAGES
// =====================================================
import PaymentMethods from "../pages/Dashboard/PaymentMethods/PaymentMethods";
import ChangePassword from "../pages/Dashboard/ChangePassword";
import Security from "../pages/Dashboard/Security";
import DeleteAccount from "../pages/Dashboard/DeleteAccount";
import Support from "../pages/Dashboard/Support";

// =====================================================
// NOT FOUND
// =====================================================
import NotFound from "../pages/NotFound/NotFound";

// =====================================================
// ROUTER
// =====================================================

export const router = createBrowserRouter([
  // =====================================================
  // MAIN WEBSITE
  // =====================================================

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,

    children: [
      // ===================================================
      // HOME
      // ===================================================

      {
        index: true,
        element: <Home />,
      },

      // ===================================================
      // EXPLORE
      // ===================================================

      {
        path: "explore",
        element: <Explore />,
      },

      // ===================================================
      // DESTINATION
      // ===================================================

      {
        path: "destination/:slug",
        element: <DestinationDetails />,
      },

      // ===================================================
      // HOTELS
      // ===================================================

      {
        path: "hotels",
        element: <Hotels />,
      },

      {
        path: "hotels/:slug",
        element: <HotelDetails />,
      },

      // ===================================================
      // RESTAURANTS
      // ===================================================

      {
        path: "restaurants",
        element: <Restaurants />,
      },

      // ===================================================
      // TRANSPORTATION
      // ===================================================

      {
        path: "transportation",
        element: <Transportation />,
      },

      {
        path: "transportation/:slug",
        element: <TransportDetails />,
      },

      // ===================================================
      // BOOKING
      // ===================================================

      {
        path: "booking",
        element: <Booking />,
      },

      // ===================================================
      // FEATURES
      // ===================================================

      {
        path: "features",
        element: <Features />,
      },

      // ===================================================
      // NEWSLETTER
      // ===================================================

      {
        path: "newsletter",
        element: <Newsletter />,
      },

      // ===================================================
      // EMERGENCY
      // ===================================================

      {
        path: "emergency",
        element: <Emergency />,
      },

      {
        path: "emergency/:slug",
        element: <EmergencyDetails />,
      },

      // ===================================================
      // BLOG
      // ===================================================

      {
        path: "blog",
        element: <Blog />,
      },

      {
        path: "blog/:slug",
        element: <BlogDetails />,
      },

      // ===================================================
      // ABOUT
      // ===================================================

      {
        path: "about",
        element: <About />,
      },

      // ===================================================
      // CONTACT
      // ===================================================

      {
        path: "contact",
        element: <Contact />,
      },

      // ===================================================
      // AUTHENTICATION
      // ===================================================

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      // ===================================================
      // 404 - NOT FOUND (catch-all, must stay last)
      // ===================================================

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // =====================================================
  // PROTECTED DASHBOARD
  // =====================================================

  {
    element: <ProtectedRoute />,

    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,

        children: [
          // =================================================
          // DASHBOARD HOME
          // =================================================

          {
            index: true,
            element: <Dashboard />,
          },

          // =================================================
          // PROFILE
          // =================================================

          {
            path: "profile",
            element: <Profile />,
          },

          // =================================================
          // BOOKINGS
          // =================================================

          {
            path: "bookings",
            element: <MyBookings />,
          },

          // =================================================
          // BOOKING DETAILS
          // URL:
          // /dashboard/bookings/:id
          // =================================================

          {
            path: "bookings/:id",
            element: <BookingDetails />,
          },

          // =================================================
          // WISHLIST
          // =================================================

          {
            path: "wishlist",
            element: <Wishlist />,
          },

          // =================================================
          // MESSAGES
          // =================================================

          {
            path: "messages",
            element: <Messages />,
          },

          // =================================================
          // NOTIFICATIONS
          // =================================================

          {
            path: "notifications",
            element: <Notifications />,
          },

          // =================================================
          // SETTINGS
          // =================================================

          {
            path: "settings",
            element: <Settings />,
          },

          // =================================================
          // PAYMENT METHODS
          // =================================================

          {
            path: "payment-methods",
            element: <PaymentMethods />,
          },

          // =================================================
          // CHANGE PASSWORD
          // =================================================

          {
            path: "change-password",
            element: <ChangePassword />,
          },

          // =================================================
          // SECURITY
          // =================================================

          {
            path: "security",
            element: <Security />,
          },

          // =================================================
          // DELETE ACCOUNT
          // =================================================

          {
            path: "delete-account",
            element: <DeleteAccount />,
          },

          // =================================================
          // SUPPORT
          // =================================================

          {
            path: "support",
            element: <Support />,
          },
        ],
      },
    ],
  },
]);