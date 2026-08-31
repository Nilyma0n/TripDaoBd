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
} from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "booking" | "message" | "payment" | "travel" | "system";
  read: boolean;
  link?: string;
}

const DashboardLayout = () => {
  const navigate = useNavigate();

  // ==============================
  // NOTIFICATIONS
  // ==============================

  const [notifications, setNotifications] =
    useState<NotificationItem[]>([
      {
        id: 1,
        title: "Booking Confirmed",
        message:
          "Your Cox's Bazar Retreat booking has been confirmed.",
        time: "10 minutes ago",
        type: "booking",
        read: false,
        link: "/dashboard/bookings",
      },

      {
        id: 2,
        title: "New Message",
        message:
          "You have a new message from TripDaoBD support.",
        time: "1 hour ago",
        type: "message",
        read: false,
        link: "/dashboard/messages",
      },

      {
        id: 3,
        title: "Payment Successful",
        message:
          "Your payment of ৳9,750 was successfully processed.",
        time: "3 hours ago",
        type: "payment",
        read: false,
        link: "/dashboard/bookings",
      },

      {
        id: 4,
        title: "Upcoming Trip",
        message:
          "Your Cox's Bazar trip starts in 5 days.",
        time: "Yesterday",
        type: "travel",
        read: true,
        link: "/dashboard/bookings",
      },

      {
        id: 5,
        title: "Welcome to TripDaoBD",
        message:
          "Explore destinations and plan your next adventure.",
        time: "2 days ago",
        type: "system",
        read: true,
        link: "/explore",
      },
    ]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  // ==============================
  // GET USER
  // ==============================

  const getStoredUser = () => {
    const userData =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  };

  const user = getStoredUser();

  // ==============================
  // UNREAD COUNT
  // ==============================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // ==============================
  // SIDEBAR LINK STYLE
  // ==============================

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

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  // ==============================
  // MARK NOTIFICATION AS READ
  // ==============================

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // ==============================
  // MARK ALL AS READ
  // ==============================

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // ==============================
  // NOTIFICATION CLICK
  // ==============================

  const handleNotificationClick = (
    notification: NotificationItem
  ) => {
    markAsRead(notification.id);

    setNotificationOpen(false);

    if (notification.link) {
      navigate(notification.link);
    }
  };

  // ==============================
  // NOTIFICATION ICON
  // ==============================

  const getNotificationIcon = (
    type: NotificationItem["type"]
  ) => {
    switch (type) {
      case "booking":
        return "📅";

      case "message":
        return "💬";

      case "payment":
        return "💳";

      case "travel":
        return "✈️";

      default:
        return "🌿";
    }
  };

  return (
    <div className="min-h-screen bg-[#071817] text-white">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="fixed top-0 left-0 right-0 z-50 h-[82px] bg-[#071817]/95 backdrop-blur-xl border-b border-white/5">

        <div className="h-full flex items-center">

          {/* ==============================
              LOGO
          ============================== */}

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

          {/* ==============================
              SEARCH
          ============================== */}

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

            {/* ==============================
                WISHLIST
            ============================== */}

            <button
              onClick={() =>
                navigate("/dashboard/wishlist")
              }
              className="text-slate-300 hover:text-white transition"
              title="Wishlist"
            >
              <Heart size={22} />
            </button>

            {/* ==============================
                NOTIFICATIONS
            ============================== */}

            <div className="relative">

              <button
                onClick={() =>
                  setNotificationOpen(
                    (current) => !current
                  )
                }
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

              {/* ==============================
                  NOTIFICATION DROPDOWN
              ============================== */}

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

                  {/* NOTIFICATIONS */}

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
                        (notification) => (

                          <button
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(
                                notification
                              )
                            }
                            className={`w-full text-left px-5 py-4 flex gap-4 border-b border-white/5 hover:bg-white/[0.04] transition ${
                              !notification.read
                                ? "bg-[#c9a34e]/[0.04]"
                                : ""
                            }`}
                          >

                            {/* ICON */}

                            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#16352f] border border-white/5 flex items-center justify-center text-lg">

                              {getNotificationIcon(
                                notification.type
                              )}

                            </div>

                            {/* CONTENT */}

                            <div className="flex-1 min-w-0">

                              <div className="flex items-start justify-between gap-3">

                                <p
                                  className={`text-sm ${
                                    notification.read
                                      ? "text-slate-300"
                                      : "text-white font-semibold"
                                  }`}
                                >
                                  {notification.title}
                                </p>

                                {!notification.read && (
                                  <span className="w-2 h-2 mt-1.5 rounded-full bg-[#d9b45c] shrink-0" />
                                )}

                              </div>

                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {notification.message}
                              </p>

                              <p className="text-[11px] text-slate-600 mt-2">
                                {notification.time}
                              </p>

                            </div>

                          </button>

                        )
                      )

                    )}

                  </div>

                  {/* FOOTER */}

                  <button
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate(
                        "/dashboard/notifications"
                      );
                    }}
                    className="w-full py-3.5 text-sm text-[#d9b45c] hover:bg-white/[0.03] transition font-medium"
                  >
                    View all notifications
                  </button>

                </div>

              )}

            </div>

            {/* ==============================
                USER
            ============================== */}

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
                    alt={user.full_name || "User"}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <span className="text-[#d9b45c] font-bold">

                    {user?.full_name
                      ?.charAt(0)
                      .toUpperCase() || "U"}

                  </span>

                )}

              </div>

              <div className="hidden xl:block text-left">

                <p className="text-sm font-semibold">
                  {user?.full_name || "Traveler"}
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

        {/* ==============================
            DASHBOARD
        ============================== */}

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

        {/* ==============================
            MAIN
        ============================== */}

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

        {/* ==============================
            ACCOUNT
        ============================== */}

        <div className="px-5 mt-8">

          <p className="px-4 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Account
          </p>

          <nav className="space-y-1">

            {/* MY PROFILE */}

            <NavLink
              to="/dashboard/profile"
              className={linkClass}
            >
              <User size={19} />
              <span>My Profile</span>
            </NavLink>

            {/* BOOKINGS */}

            <NavLink
              to="/dashboard/bookings"
              className={linkClass}
            >
              <CalendarDays size={19} />
              <span>Bookings</span>
            </NavLink>

            {/* =========================================
                PAYMENT METHODS
                FIXED ROUTE
            ========================================= */}

            <NavLink
              to="/dashboard/payment-methods"
              className={linkClass}
            >
              <CreditCard size={19} />
              <span>Payment Methods</span>
            </NavLink>

            {/* =========================================
                SETTINGS
            ========================================= */}

            <NavLink
              to="/dashboard/settings"
              className={linkClass}
            >
              <Settings size={19} />
              <span>Settings</span>
            </NavLink>

          </nav>

        </div>

        {/* ==============================
            EXPLORE CARD
        ============================== */}

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
                onClick={() => navigate("/explore")}
                className="mt-5 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-2.5 rounded-xl font-semibold text-sm transition"
              >
                Explore Now →
              </button>

            </div>

          </div>

        </div>

        {/* ==============================
            LOGOUT
        ============================== */}

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