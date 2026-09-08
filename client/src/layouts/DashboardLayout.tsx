import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Heart,
  MessageCircle,
  BookOpen,
  User,
  CalendarDays,
  CreditCard,
  Settings,
  LogOut,
  Compass,
  Search,
  Bell,
  ChevronDown,
  ArrowLeft,
  CheckCheck,
  Loader2,
  AlertCircle,
  Plane,
  Wallet,
  Info,
} from "lucide-react";

interface NotificationItem {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "booking" | "message" | "payment" | "travel" | "system";
  link?: string | null;
  is_read: number;
  created_at: string;
}

interface ApiNotification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "booking" | "message" | "payment" | "travel" | "system";
  link?: string | null;
  is_read: number;
  created_at: string;
}

const API_BASE_URL = "http://localhost:5000/api";

const DashboardLayout = () => {
  const navigate = useNavigate();

  // ============================================================
  // NOTIFICATIONS STATE
  // ============================================================

  const [notifications, setNotifications] = useState<
    NotificationItem[]
  >([]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notificationLoading, setNotificationLoading] =
    useState(false);

  const [notificationError, setNotificationError] =
    useState("");

  // ============================================================
  // GET STORED USER
  // ============================================================

  const getStoredUser = () => {
    const userData =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!userData) {
      return null;
    }

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  };

  const user = getStoredUser();

  // ============================================================
  // GET AUTH TOKEN
  // ============================================================

  const getAuthToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("accessToken")
    );
  };

  // ============================================================
  // LOAD NOTIFICATIONS
  // ============================================================

  const loadNotifications = async () => {
    const token = getAuthToken();

    if (!token) {
      setNotifications([]);
      setNotificationError(
        "Please login to view notifications."
      );
      return;
    }

    try {
      setNotificationLoading(true);
      setNotificationError("");

      const response = await fetch(
        `${API_BASE_URL}/notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load notifications."
        );
      }

      const mappedNotifications: NotificationItem[] =
        (result.notifications || []).map(
          (notification: ApiNotification) => ({
            id: notification.id,
            user_id: notification.user_id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            link: notification.link,
            is_read: Number(notification.is_read),
            created_at: notification.created_at,
          })
        );

      setNotifications(mappedNotifications);
    } catch (error) {
      console.error(
        "Load Notifications Error:",
        error
      );

      setNotificationError(
        error instanceof Error
          ? error.message
          : "Failed to load notifications."
      );
    } finally {
      setNotificationLoading(false);
    }
  };

  // ============================================================
  // HANDLE NOTIFICATION BELL
  // ============================================================

  const handleNotificationToggle = () => {
    const nextState = !notificationOpen;

    setNotificationOpen(nextState);

    if (nextState) {
      loadNotifications();
    }
  };

  // ============================================================
  // UNREAD COUNT
  // ============================================================

  const unreadCount = notifications.filter(
    (notification) =>
      Number(notification.is_read) === 0
  ).length;

  // ============================================================
  // SIDEBAR LINK STYLE
  // ============================================================

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-[#c9a34e]/20 to-[#c9a34e]/5 text-[#e0b95c] border border-[#c9a34e]/20"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  // ============================================================
  // MARK SINGLE NOTIFICATION AS READ
  // ============================================================

  const markAsRead = async (
    notificationId: number
  ) => {
    const token = getAuthToken();

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to mark notification as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: 1,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Mark Notification Read Error:",
        error
      );
    }
  };

  // ============================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ============================================================

  const markAllAsRead = async () => {
    const token = getAuthToken();

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/read-all`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to mark notifications as read."
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: 1,
        }))
      );
    } catch (error) {
      console.error(
        "Mark All Notifications Read Error:",
        error
      );
    }
  };

  // ============================================================
  // NOTIFICATION CLICK
  // ============================================================

  const handleNotificationClick = async (
    notification: NotificationItem
  ) => {
    if (Number(notification.is_read) === 0) {
      await markAsRead(notification.id);
    }

    setNotificationOpen(false);

    if (notification.link) {
      navigate(notification.link);
    }
  };

  // ============================================================
  // RELATIVE TIME
  // ============================================================

  const getRelativeTime = (
    createdAt: string
  ) => {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const difference =
      now.getTime() - createdDate.getTime();

    const seconds = Math.floor(
      difference / 1000
    );

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(
      seconds / 60
    );

    if (minutes < 60) {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} day${
        days !== 1 ? "s" : ""
      } ago`;
    }

    const weeks = Math.floor(
      days / 7
    );

    if (weeks < 4) {
      return `${weeks} week${
        weeks !== 1 ? "s" : ""
      } ago`;
    }

    return createdDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // ============================================================
  // NOTIFICATION ICON
  // ============================================================

  const getNotificationIcon = (
    type: NotificationItem["type"]
  ) => {
    switch (type) {
      case "booking":
        return <CalendarDays size={18} />;

      case "message":
        return <MessageCircle size={18} />;

      case "payment":
        return <Wallet size={18} />;

      case "travel":
        return <Plane size={18} />;

      case "system":
      default:
        return <Info size={18} />;
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#071817] text-white">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="fixed top-0 left-0 right-0 z-50 h-[82px] bg-[#071817]/95 backdrop-blur-xl border-b border-white/5">

        <div className="h-full flex items-center">

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            onClick={() => navigate("/")}
            className="w-[285px] h-full px-8 flex items-center gap-3 border-r border-white/5 text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 border border-[#c9a34e]/30 flex items-center justify-center">
              <Compass
                size={25}
                className="text-[#d9b45c]"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                TripDaoBD
              </h1>

              <p className="text-[11px] text-slate-400">
                Travel beyond ordinary
              </p>
            </div>
          </button>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="flex-1 px-8">

            <div className="max-w-2xl h-12 bg-white/[0.04] border border-white/10 rounded-xl flex items-center px-4">

              <Search
                size={20}
                className="text-slate-500"
              />

              <input
                type="text"
                placeholder="Search destinations, hotels, experiences..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-white placeholder:text-slate-500"
              />

              <Search
                size={18}
                className="text-slate-500"
              />

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-7 px-8">

            {/* =================================================
                WISHLIST
            ================================================= */}

            <button
              onClick={() =>
                navigate("/dashboard/wishlist")
              }
              className="text-slate-300 hover:text-white transition"
              title="Wishlist"
            >
              <Heart size={22} />
            </button>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="relative">

              <button
                onClick={handleNotificationToggle}
                className="relative text-slate-300 hover:text-white transition"
                title="Notifications"
              >
                <Bell size={22} />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-[#c9a34e] text-[#071817] text-[10px] font-bold flex items-center justify-center">
                    {unreadCount > 9
                      ? "9+"
                      : unreadCount}
                  </span>
                )}
              </button>

              {/* =================================================
                  NOTIFICATION DROPDOWN
              ================================================= */}

              {notificationOpen && (

                <div className="absolute right-0 top-12 w-[390px] bg-[#0b211f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]">

                  {/* HEADER */}

                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">

                    <div>
                      <h3 className="font-semibold text-white">
                        Notifications
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {unreadCount > 0
                          ? `${unreadCount} unread notification${
                              unreadCount > 1
                                ? "s"
                                : ""
                            }`
                          : "You're all caught up"}
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-1.5 text-xs text-[#d9b45c] hover:text-[#f0cd72] transition"
                      >
                        <CheckCheck size={15} />
                        Mark all read
                      </button>
                    )}

                  </div>

                  {/* =================================================
                      LOADING
                  ================================================= */}

                  {notificationLoading && (
                    <div className="px-6 py-10 text-center">

                      <Loader2
                        size={28}
                        className="mx-auto text-[#d9b45c] animate-spin"
                      />

                      <p className="mt-3 text-sm text-slate-400">
                        Loading notifications...
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      ERROR
                  ================================================= */}

                  {!notificationLoading &&
                    notificationError && (
                      <div className="px-6 py-10 text-center">

                        <AlertCircle
                          size={30}
                          className="mx-auto text-red-400"
                        />

                        <p className="mt-3 text-sm text-slate-400">
                          {notificationError}
                        </p>

                        <button
                          onClick={loadNotifications}
                          className="mt-4 text-xs text-[#d9b45c] hover:text-[#f0cd72]"
                        >
                          Try again
                        </button>

                      </div>
                    )}

                  {/* =================================================
                      NOTIFICATIONS LIST
                  ================================================= */}

                  {!notificationLoading &&
                    !notificationError && (

                      <div className="max-h-[420px] overflow-y-auto">

                        {notifications.length === 0 ? (

                          <div className="px-6 py-12 text-center">

                            <Bell
                              size={35}
                              className="mx-auto text-slate-600"
                            />

                            <p className="mt-4 text-slate-400">
                              No notifications yet.
                            </p>

                          </div>

                        ) : (

                          notifications.map(
                            (notification) => {

                              const isRead =
                                Number(
                                  notification.is_read
                                ) === 1;

                              return (
                                <button
                                  key={
                                    notification.id
                                  }
                                  onClick={() =>
                                    handleNotificationClick(
                                      notification
                                    )
                                  }
                                  className={`w-full text-left px-5 py-4 flex gap-4 border-b border-white/5 hover:bg-white/[0.04] transition ${
                                    !isRead
                                      ? "bg-[#c9a34e]/[0.04]"
                                      : ""
                                  }`}
                                >

                                  {/* ICON */}

                                  <div
                                    className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center ${
                                      notification.type ===
                                      "payment"
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                        : notification.type ===
                                            "booking"
                                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                          : notification.type ===
                                              "message"
                                            ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                                            : "bg-[#16352f] border-white/5 text-[#d9b45c]"
                                    }`}
                                  >
                                    {getNotificationIcon(
                                      notification.type
                                    )}
                                  </div>

                                  {/* CONTENT */}

                                  <div className="flex-1 min-w-0">

                                    <div className="flex items-start justify-between gap-3">

                                      <p
                                        className={`text-sm ${
                                          isRead
                                            ? "text-slate-300"
                                            : "text-white font-semibold"
                                        }`}
                                      >
                                        {
                                          notification.title
                                        }
                                      </p>

                                      {!isRead && (
                                        <span className="w-2 h-2 mt-1.5 rounded-full bg-[#d9b45c] shrink-0" />
                                      )}

                                    </div>

                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                      {
                                        notification.message
                                      }
                                    </p>

                                    <p className="text-[11px] text-slate-600 mt-2">
                                      {getRelativeTime(
                                        notification.created_at
                                      )}
                                    </p>

                                  </div>

                                </button>
                              );
                            }
                          )

                        )}

                      </div>

                    )}

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <button
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate(
                        "/dashboard/notifications"
                      );
                    }}
                    className="w-full py-3.5 text-sm text-[#d9b45c] hover:bg-white/[0.03] transition font-medium border-t border-white/5"
                  >
                    View all notifications
                  </button>

                </div>

              )}

            </div>

            {/* =================================================
                USER
            ================================================= */}

            <button
              onClick={() =>
                navigate("/dashboard/profile")
              }
              className="flex items-center gap-3"
            >

              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#c9a34e]/40 bg-[#16332f] flex items-center justify-center">

                {user?.profile_image ? (

                  <img
                    src={user.profile_image}
                    alt={
                      user.full_name ||
                      "User"
                    }
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <span className="text-[#d9b45c] font-bold">
                    {user?.full_name
                      ?.charAt(0)
                      .toUpperCase() ||
                      "U"}
                  </span>

                )}

              </div>

              <div className="hidden xl:block text-left">

                <p className="text-sm font-semibold">
                  {user?.full_name ||
                    "Traveler"}
                </p>

                <p className="text-xs text-slate-500">
                  Traveler
                </p>

              </div>

              <ChevronDown
                size={17}
                className="text-slate-500"
              />

            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-[82px] bottom-0 w-[285px] bg-[#081c1b] border-r border-white/5 flex flex-col overflow-y-auto">

        {/* DASHBOARD */}

        <div className="p-5">

          <NavLink
            to="/dashboard"
            end
            className={linkClass}
          >
            <LayoutDashboard size={19} />
            <span>
              Dashboard
            </span>
          </NavLink>

        </div>

        {/* MAIN */}

        <div className="px-5">

          <p className="px-4 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Main
          </p>

          <nav className="space-y-1">

            <NavLink
              to="/dashboard/bookings"
              className={linkClass}
            >
              <Map size={19} />
              <span>My Trips</span>
            </NavLink>

            <NavLink
              to="/dashboard/wishlist"
              className={linkClass}
            >
              <Heart size={19} />
              <span>Wishlist</span>
            </NavLink>

            <NavLink
              to="/dashboard/messages"
              className={linkClass}
            >
              <MessageCircle size={19} />
              <span>Messages</span>
            </NavLink>

            <NavLink
              to="/blog"
              className={linkClass}
            >
              <BookOpen size={19} />
              <span>Travel Stories</span>
            </NavLink>

          </nav>

        </div>

        {/* ACCOUNT */}

        <div className="px-5 mt-8">

          <p className="px-4 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Account
          </p>

          <nav className="space-y-1">

            <NavLink
              to="/dashboard/profile"
              className={linkClass}
            >
              <User size={19} />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to="/dashboard/bookings"
              className={linkClass}
            >
              <CalendarDays size={19} />
              <span>Bookings</span>
            </NavLink>

            <NavLink
              to="/dashboard/payment-methods"
              className={linkClass}
            >
              <CreditCard size={19} />
              <span>Payment Methods</span>
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              className={linkClass}
            >
              <Settings size={19} />
              <span>Settings</span>
            </NavLink>

          </nav>

        </div>

        {/* EXPLORE CARD */}

        <div className="mt-auto p-5">

          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5 min-h-[180px] bg-gradient-to-br from-[#173d35] to-[#0c2522]">

            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80')",
              }}
            />

            <div className="relative">

              <p className="text-sm text-slate-200 leading-relaxed">
                Let's explore the beauty of Bangladesh.
              </p>

              <button
                onClick={() =>
                  navigate("/explore")
                }
                className="mt-5 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-2.5 rounded-xl font-semibold text-sm transition"
              >
                Explore Now →
              </button>

            </div>

          </div>

        </div>

        {/* LOGOUT */}

        <div className="px-5 pb-6">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition"
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="ml-[285px] pt-[82px] min-h-screen">

        {/* BACK TO WEBSITE */}

        <div className="px-8 pt-6">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#d9b45c] transition"
          >
            <ArrowLeft size={16} />

            Back to website
          </button>

        </div>

        {/* PAGE CONTENT */}

        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;