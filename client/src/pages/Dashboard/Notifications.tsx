import {
  Bell,
  CalendarDays,
  CheckCheck,
  CreditCard,
  MessageCircle,
  Plane,
  Leaf,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface NotificationItem {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type:
    | "booking"
    | "message"
    | "payment"
    | "travel"
    | "system";
  link?: string | null;
  is_read: boolean;
  created_at: string;
}

const API_URL = "http://localhost:5000";

const Notifications = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingAll, setMarkingAll] = useState(false);
  const [markingId, setMarkingId] = useState<number | null>(
    null
  );

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    if (hours < 24) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FETCH NOTIFICATIONS
  // Used by Refresh and Try Again buttons
  // =====================================================

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setNotifications([]);
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load notifications."
        );
      }

      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(
        "Notification Fetch Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // IMPORTANT:
  // Do NOT call fetchNotifications() directly here.
  // This avoids the React set-state-in-effect ESLint error.
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadNotifications = async () => {
      try {
        if (!token) {
          if (!cancelled) {
            setNotifications([]);
            setError("Please login first.");
            setLoading(false);
          }

          return;
        }

        const response = await fetch(
          `${API_URL}/api/notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load notifications."
          );
        }

        if (!cancelled) {
          setNotifications(data.notifications || []);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        console.error(
          "Initial Notification Fetch Error:",
          err
        );

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load notifications."
          );

          setLoading(false);
        }
      }
    };

    void loadNotifications();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // =====================================================
  // UNREAD COUNT
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  // =====================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const markAsRead = async (id: number) => {
    try {
      if (!token) {
        setError("Please login first.");
        return;
      }

      setMarkingId(id);
      setError("");

      const response = await fetch(
        `${API_URL}/api/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to mark notification as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      );
    } catch (err) {
      console.error("Mark Read Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update notification."
      );
    } finally {
      setMarkingId(null);
    }
  };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = async () => {
    try {
      if (!token) {
        setError("Please login first.");
        return;
      }

      setMarkingAll(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/notifications/read-all`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to mark all notifications as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error("Mark All Read Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update notifications."
      );
    } finally {
      setMarkingAll(false);
    }
  };

  // =====================================================
  // HANDLE NOTIFICATION CLICK
  // =====================================================

  const handleNotificationClick = async (
    notification: NotificationItem
  ) => {
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  // =====================================================
  // GET ICON
  // =====================================================

  const getIcon = (
    type: NotificationItem["type"]
  ) => {
    switch (type) {
      case "booking":
        return (
          <CalendarDays
            size={20}
            className="text-[#d9b45c]"
          />
        );

      case "message":
        return (
          <MessageCircle
            size={20}
            className="text-[#d9b45c]"
          />
        );

      case "payment":
        return (
          <CreditCard
            size={20}
            className="text-[#d9b45c]"
          />
        );

      case "travel":
        return (
          <Plane
            size={20}
            className="text-[#d9b45c]"
          />
        );

      case "system":
      default:
        return (
          <Leaf
            size={20}
            className="text-[#d9b45c]"
          />
        );
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <RefreshCw
              size={40}
              className="mx-auto text-[#d9b45c] animate-spin"
            />

            <p className="text-slate-400 mt-4">
              Loading notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="max-w-5xl mx-auto">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#c9a34e]/10 border border-[#c9a34e]/20 flex items-center justify-center">
              <Bell
                size={24}
                className="text-[#d9b45c]"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Notifications
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Stay updated with your trips and account.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Refresh */}

          <button
            type="button"
            onClick={fetchNotifications}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 px-4 py-3 rounded-xl text-sm font-medium transition disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>

          {/* Mark All */}

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={markingAll}
              className="flex items-center justify-center gap-2 bg-[#c9a34e]/10 border border-[#c9a34e]/20 text-[#d9b45c] hover:bg-[#c9a34e]/20 px-5 py-3 rounded-xl text-sm font-medium transition disabled:opacity-50"
            >
              {markingAll ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />

                  Updating...
                </>
              ) : (
                <>
                  <CheckCheck size={17} />

                  Mark all as read
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-5 py-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchNotifications}
              className="underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Total */}

        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Total Notifications
          </p>

          <p className="text-3xl font-bold mt-2">
            {notifications.length}
          </p>
        </div>

        {/* Unread */}

        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Unread
          </p>

          <p className="text-3xl font-bold text-[#d9b45c] mt-2">
            {unreadCount}
          </p>
        </div>

        {/* Status */}

        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="text-lg font-semibold text-emerald-400 mt-3">
            {unreadCount > 0
              ? `${unreadCount} new ${
                  unreadCount === 1
                    ? "update"
                    : "updates"
                }`
              : "All caught up"}
          </p>
        </div>
      </div>

      {/* =====================================================
          NOTIFICATION LIST
      ===================================================== */}

      <div className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="py-20 text-center">
            <Bell
              size={45}
              className="mx-auto text-slate-600"
            />

            <h2 className="text-xl font-semibold mt-5">
              No notifications
            </h2>

            <p className="text-slate-500 mt-2">
              You don't have any notifications yet.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              type="button"
              key={notification.id}
              onClick={() =>
                handleNotificationClick(notification)
              }
              disabled={
                markingId === notification.id
              }
              className={`w-full text-left p-6 flex gap-5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition ${
                !notification.is_read
                  ? "bg-[#c9a34e]/[0.03]"
                  : ""
              }`}
            >
              {/* Icon */}

              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#16352f] border border-white/5 flex items-center justify-center">
                {markingId === notification.id ? (
                  <RefreshCw
                    size={20}
                    className="text-[#d9b45c] animate-spin"
                  />
                ) : (
                  getIcon(notification.type)
                )}
              </div>

              {/* Content */}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={`text-base ${
                        notification.is_read
                          ? "text-slate-300"
                          : "text-white font-semibold"
                      }`}
                    >
                      {notification.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      {notification.message}
                    </p>

                    <p className="text-xs text-slate-600 mt-3">
                      {formatTime(
                        notification.created_at
                      )}
                    </p>
                  </div>

                  {/* Unread indicator */}

                  {!notification.is_read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d9b45c] mt-2 shrink-0" />
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
        <CheckCheck size={14} />

        <span>
          Notifications are synced with your TripDaoBD
          account.
        </span>
      </div>
    </div>
  );
};

export default Notifications;