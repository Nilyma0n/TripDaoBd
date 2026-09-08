import { useState } from "react";
import {
  ChevronDown,
  Globe,
  Heart,
  LogOut,
  Menu,
  Search,
  User,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  /* =====================================================
     HOME PAGE
  ===================================================== */

  const isHome = location.pathname === "/";

  /*
   * We intentionally don't use an effect to close menus
   * when the route changes. Navigation links call onClose()
   * directly, avoiding react-hooks/set-state-in-effect.
   */

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  /* =====================================================
     ACTIVE LINK
  ===================================================== */

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  /* =====================================================
     CLOSE MENUS
  ===================================================== */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /* =====================================================
     COLORS
  ===================================================== */

  /*
   * Home:
   * transparent navbar + white text
   *
   * Other pages:
   * white navbar + dark green text
   */

  const textClass = isHome
    ? "text-white"
    : "text-[#24352d]";

  const hoverClass = isHome
    ? "hover:text-white"
    : "hover:text-[#1f5b43]";

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header
        className={`
          fixed left-0 top-0 z-50 w-full
          transition-all duration-300
          ${
            isHome
              ? "bg-transparent"
              : "border-b border-black/[0.05] bg-white/95 shadow-[0_4px_25px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          }
        `}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={() => {
              setMobileOpen(false);
              setMoreOpen(false);
            }}
            className="group flex shrink-0 items-center gap-3"
          >
            {/* Logo circle */}

            <div
              className={`
                flex h-11 w-11 items-center justify-center
                rounded-full transition
                ${
                  isHome
                    ? "bg-white text-[#1f5b43]"
                    : "bg-[#edf3ee] text-[#1f5b43]"
                }
              `}
            >
              <Globe size={24} strokeWidth={2} />
            </div>

            {/* Logo text */}

            <div className="leading-none">

              <h1
                className={`
                  text-[23px] font-extrabold tracking-tight
                  transition-colors
                  ${
                    isHome
                      ? "text-white"
                      : "text-[#1f5b43]"
                  }
                `}
              >
                TripDaoBD
              </h1>

              <p
                className={`
                  mt-1 text-[8px] font-bold
                  uppercase tracking-[2px]
                  ${
                    isHome
                      ? "text-white/70"
                      : "text-[#829189]"
                  }
                `}
              >
                Explore • Dream • Discover
              </p>

            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className={`
              hidden items-center gap-6
              lg:flex xl:gap-7
              ${textClass}
            `}
          >

            {/* HOME */}

            <NavLink
              to="/"
              label="Home"
              active={isActive("/")}
              isHome={isHome}
            />

            {/* DESTINATIONS */}

            <NavLink
              to="/explore"
              label="Destinations"
              active={isActive("/explore")}
              isHome={isHome}
            />

            {/* HOTELS */}

            <NavLink
              to="/hotels"
              label="Hotels"
              active={isActive("/hotels")}
              isHome={isHome}
            />

            {/* TRANSPORTATION */}

            <NavLink
              to="/transportation"
              label="Transportation"
              active={isActive("/transportation")}
              isHome={isHome}
            />

            {/* BLOG */}

            <NavLink
              to="/blog"
              label="Blog"
              active={isActive("/blog")}
              isHome={isHome}
            />

            {/* ABOUT */}

            <NavLink
              to="/about"
              label="About"
              active={isActive("/about")}
              isHome={isHome}
            />

            {/* MORE */}

            <div className="relative">

              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                className={`
                  flex items-center gap-1 py-7
                  text-sm font-bold transition
                  ${hoverClass}
                `}
              >
                More

                <ChevronDown
                  size={15}
                  className={`
                    transition-transform
                    ${moreOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-[67px] w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">

                  <DropdownLink
                    to="/restaurants"
                    label="Restaurants"
                    onClick={() => setMoreOpen(false)}
                  />

                  <DropdownLink
                    to="/booking"
                    label="Booking"
                    onClick={() => setMoreOpen(false)}
                  />

                  <DropdownLink
                    to="/emergency"
                    label="Emergency Support"
                    danger
                    onClick={() => setMoreOpen(false)}
                  />

                  {user && (
                    <DropdownLink
                      to="/dashboard"
                      label="Dashboard"
                      onClick={() => setMoreOpen(false)}
                    />
                  )}

                </div>
              )}

            </div>

          </nav>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-1 sm:gap-2">

            {/* SEARCH */}

            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                navigate("/explore");
              }}
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-full transition
                ${textClass}
                ${hoverClass}
              `}
              aria-label="Search destinations"
            >
              <Search size={21} strokeWidth={2} />
            </button>

            {/* HEART */}

            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                navigate("/hotels");
              }}
              className={`
                hidden h-10 w-10 items-center justify-center
                rounded-full transition sm:flex
                ${textClass}
                ${hoverClass}
              `}
              aria-label="Explore hotels"
            >
              <Heart size={21} strokeWidth={1.8} />
            </button>

            {/* =================================================
                NOT LOGGED IN
            ================================================= */}

            {!user ? (
              <div className="hidden items-center gap-2 sm:flex">

                <Link
                  to="/login"
                  className={`
                    px-3 py-2 text-sm font-bold
                    transition
                    ${textClass}
                    ${hoverClass}
                  `}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={`
                    rounded-full px-4 py-2.5
                    text-sm font-bold transition
                    ${
                      isHome
                        ? "bg-white text-[#1f5b43] hover:bg-white/90"
                        : "bg-[#1f5b43] text-white hover:bg-[#174a36]"
                    }
                  `}
                >
                  Register
                </Link>

              </div>
            ) : (

              /* =================================================
                 LOGGED IN
              ================================================= */

              <div className="hidden items-center gap-2 lg:flex">

                {/* Profile */}

                <Link
                  to="/dashboard/profile"
                  className={`
                    flex items-center gap-2
                    rounded-full border px-2 py-1.5
                    transition
                    ${
                      isHome
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-gray-200 text-[#24352d] hover:bg-[#edf3ee]"
                    }
                  `}
                >

                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center
                      overflow-hidden rounded-full
                      font-bold
                      ${
                        isHome
                          ? "bg-white/20"
                          : "bg-[#edf3ee] text-[#1f5b43]"
                      }
                    `}
                  >
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

                  <span className="hidden max-w-[110px] truncate px-1 text-xs font-bold xl:block">
                    {user.full_name || "Traveler"}
                  </span>

                </Link>

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9ece9] text-[#b64a3b] transition hover:bg-[#b64a3b] hover:text-white"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut size={16} />
                </button>

              </div>
            )}

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => {
                setMoreOpen(false);
                setMobileOpen(true);
              }}
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-full transition
                lg:hidden
                ${textClass}
                ${hoverClass}
              `}
              aria-label="Open menu"
            >
              <Menu size={25} />
            </button>

          </div>

        </div>
      </header>

      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobileMenu}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

type NavLinkProps = {
  to: string;
  label: string;
  active: boolean;
  isHome: boolean;
};

const NavLink = ({
  to,
  label,
  active,
  isHome,
}: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`
        relative py-7 text-sm font-bold transition
        ${
          isHome
            ? "text-white/90 hover:text-white"
            : "text-[#34463d] hover:text-[#1f5b43]"
        }
        ${
          active
            ? isHome
              ? "text-white"
              : "text-[#1f5b43]"
            : ""
        }
      `}
    >
      {label}

      {active && (
        <span
          className={`
            absolute bottom-3 left-1/2
            h-0.5 w-5
            -translate-x-1/2 rounded-full
            ${
              isHome
                ? "bg-white"
                : "bg-[#e99a36]"
            }
          `}
        />
      )}
    </Link>
  );
};

/* =========================================================
   DROPDOWN LINK
========================================================= */

type DropdownLinkProps = {
  to: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

const DropdownLink = ({
  to,
  label,
  onClick,
  danger = false,
}: DropdownLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        block rounded-xl px-4 py-3
        text-sm font-semibold transition
        ${
          danger
            ? "text-[#b64a3b] hover:bg-[#f9ece9]"
            : "text-gray-700 hover:bg-[#edf3ee] hover:text-[#1f5b43]"
        }
      `}
    >
      {label}
    </Link>
  );
};

export default Navbar;