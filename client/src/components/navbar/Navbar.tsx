import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Heart,
  User,
  LogOut,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar appearance when user scrolls
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Destinations", path: "/explore" },
    { label: "Hotels", path: "/hotels" },
    { label: "Transportation", path: "/transportation" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                scrolled
                  ? "bg-[#e9f0e9]"
                  : "bg-white/90"
              }`}
            >
              <MapPin
                size={22}
                strokeWidth={2.3}
                className="text-[#1f5b43]"
              />
            </div>

            <div className="leading-none">
              <div
                className={`text-[22px] font-extrabold tracking-tight ${
                  scrolled ? "text-[#173c2d]" : "text-white"
                }`}
              >
                TripDaoBD
              </div>

              <div
                className={`mt-1 text-[8px] font-medium tracking-[2px] ${
                  scrolled
                    ? "text-gray-500"
                    : "text-white/75"
                }`}
              >
                EXPLORE • DREAM • DISCOVER
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 text-[13px] font-semibold transition-colors ${
                    scrolled
                      ? "text-gray-700 hover:text-[#1f5b43]"
                      : "text-white/95 hover:text-white"
                  } ${
                    isActive
                      ? scrolled
                        ? "text-[#1f5b43]"
                        : "text-white"
                      : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}

                    <span
                      className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#e89b36] transition-all ${
                        isActive ? "w-5" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-2.5">

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className={`hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/15"
              }`}
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link
              to="/dashboard/wishlist"
              aria-label="Wishlist"
              className={`hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/15"
              }`}
            >
              <Heart size={19} />
            </Link>

            {/* ================= AUTH ================= */}
            {!user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    scrolled
                      ? "text-[#1f5b43] hover:bg-[#edf3ee]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-[#e99a36] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#d98822] hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/dashboard/profile"
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
                    scrolled
                      ? "border-gray-200 bg-white hover:bg-gray-50"
                      : "border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#e5eee7] font-bold text-[#1f5b43]">
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt={user.full_name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.full_name?.charAt(0).toUpperCase() || (
                        <User size={16} />
                      )
                    )}
                  </div>

                  <span
                    className={`hidden max-w-[100px] truncate text-sm font-semibold xl:block ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {user.full_name || "Traveler"}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                    scrolled
                      ? "text-gray-600 hover:bg-red-50 hover:text-red-600"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* Mobile button */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[78px] z-40 border-t border-gray-100 bg-white shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-5 py-5">

            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-gray-100 py-3.5 text-sm font-semibold ${
                      isActive
                        ? "text-[#1f5b43]"
                        : "text-gray-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {user ? (
              <div className="mt-4 flex gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl bg-[#edf3ee] py-3 text-center text-sm font-bold text-[#1f5b43]"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl border border-[#1f5b43] py-3 text-center text-sm font-bold text-[#1f5b43]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl bg-[#1f5b43] py-3 text-center text-sm font-bold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;