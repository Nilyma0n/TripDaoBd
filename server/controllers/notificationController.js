import pool from "../config/db.js";

// =====================================================
// CREATE NOTIFICATION HELPER
// =====================================================
//
// This function can be used from:
// - bookingController
// - adminBookingController
// - paymentController
// - other controllers
//
// Example:
//
// await createNotification({
//   userId: 5,
//   title: "Booking Confirmed",
//   message: "Your booking has been confirmed.",
//   type: "booking",
//   link: "/dashboard/bookings/5",
// });
//
// =====================================================

export const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  link = null,
}) => {
  if (!userId) {
    throw new Error(
      "Cannot create notification without user ID."
    );
  }

  if (!title || !message) {
    throw new Error(
      "Notification title and message are required."
    );
  }

  const [result] = await pool.query(
    `
    INSERT INTO notifications (
      user_id,
      title,
      message,
      type,
      link,
      is_read
    )
    VALUES (?, ?, ?, ?, ?, 0)
    `,
    [
      userId,
      title,
      message,
      type,
      link,
    ]
  );

  return result.insertId;
};


// =====================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// =====================================================

export const getMyNotifications = async (req, res) => {
  try {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const [rows] = await pool.query(
      `
      SELECT
        id,
        user_id,
        title,
        message,
        type,
        link,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      notifications: rows,
    });
  } catch (error) {
    console.error(
      "Get Notifications Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load notifications.",
      error: error.message,
    });
  }
};


// =====================================================
// MARK SINGLE NOTIFICATION AS READ
// PUT /api/notifications/:id/read
// =====================================================

export const markNotificationAsRead = async (
  req,
  res
) => {
  try {
    const userId =
      req.user?.id ||
      req.user?.userId;

    const notificationId =
      req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    const [result] = await pool.query(
      `
      UPDATE notifications
      SET is_read = 1
      WHERE id = ?
      AND user_id = ?
      `,
      [
        notificationId,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Notification marked as read.",
    });
  } catch (error) {
    console.error(
      "Mark Notification Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update notification.",
      error: error.message,
    });
  }
};


// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// PUT /api/notifications/read-all
// =====================================================

export const markAllNotificationsAsRead = async (
  req,
  res
) => {
  try {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication information is missing.",
      });
    }

    await pool.query(
      `
      UPDATE notifications
      SET is_read = 1
      WHERE user_id = ?
      AND is_read = 0
      `,
      [userId]
    );

    return res.status(200).json({
      success: true,
      message:
        "All notifications marked as read.",
    });
  } catch (error) {
    console.error(
      "Mark All Notifications Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update notifications.",
      error: error.message,
    });
  }
};