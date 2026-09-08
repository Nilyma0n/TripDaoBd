import {
  ChevronRight,
  Globe,
  Heart,
  LogOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { AuthUser } from "../../context/AuthContext.types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onLogout: () => void;
};

const MobileMenu = ({
  open,
  onClose,
  user,
  onLogout,
}: MobileMenuProps) => {
  return (
    <>
      {/* ================= BACKDROP ================= */}

      <div
        className={`
          fixed inset-0 z-[60] bg-black/40
          backdrop-blur-[2px]
          transition-opacity duration-300
          lg:hidden
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed right-0 top-0 z-[70]
          h-full w-[310px] max-w-[88vw]
          overflow-y-auto bg-[#fbfbf8]
          shadow-[-15px_0_40px_rgba(0,0,0,0.15)]
          transition-transform duration-300
          lg:hidden
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ================= HEADER ================= */}

        <div className="flex h-20 items-center justify-between border-b border-[#e5e4dc] px-5">

          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3ee] text-[#1f5b43]">
              <Globe size={22} />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight text-[#1f5b43]">
                TripDaoBD
              </p>

              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[1.8px] text-[#87958e]">
                Explore • Dream • Discover
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-[#edf3ee] hover:text-[#1f5b43]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="px-4 py-5">

          <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[2px] text-gray-400">
            Navigation
          </p>

          <div className="space-y-1">

            <MobileLink
              to="/"
              label="Home"
              onClick={onClose}
            />

            <MobileLink
              to="/explore"
              label="Destinations"
              onClick={onClose}
            />

            <MobileLink
              to="/hotels"
              label="Hotels"
              onClick={onClose}
            />

            <MobileLink
              to="/restaurants"
              label="Restaurants"
              onClick={onClose}
            />

            <MobileLink
              to="/transportation"
              label="Transportation"
              onClick={onClose}
            />

            <MobileLink
              to="/booking"
              label="Booking"
              onClick={onClose}
            />

            <MobileLink
              to="/blog"
              label="Blog"
              onClick={onClose}
            />

            <MobileLink
              to="/about"
              label="About"
              onClick={onClose}
            />

            <MobileLink
              to="/emergency"
              label="Emergency Support"
              onClick={onClose}
              danger
            />

          </div>

        </nav>

        {/* ================= ACCOUNT ================= */}

        <div className="mx-4 border-t border-[#e5e4dc] pt-5">

          {user ? (
            <>
              <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[2px] text-gray-400">
                My Account
              </p>

              {/* PROFILE */}

              <Link
                to="/dashboard/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:bg-[#edf3ee]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#edf3ee] font-bold text-[#1f5b43]">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={user.full_name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.full_name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#26382f]">
                    {user.full_name || "Traveler"}
                  </p>

                  <p className="truncate text-[11px] text-gray-400">
                    {user.email}
                  </p>
                </div>

                <ChevronRight
                  size={17}
                  className="shrink-0 text-gray-400"
                />
              </Link>

              {/* DASHBOARD */}

              <Link
                to="/dashboard"
                onClick={onClose}
                className="mt-2 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-white hover:text-[#1f5b43]"
              >
                <span>Dashboard</span>

                <ChevronRight size={17} />
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="mt-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[#b64a3b] transition hover:bg-[#f9ece9]"
              >
                <span>Logout</span>

                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full border border-[#1f5b43] px-5 py-3 text-sm font-bold text-[#1f5b43] transition hover:bg-[#1f5b43] hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={onClose}
                className="mt-3 flex w-full items-center justify-center rounded-full bg-[#1f5b43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#174a36]"
              >
                Create Account
              </Link>
            </>
          )}

        </div>

        {/* ================= QUICK CARD ================= */}

        <div className="mx-4 mb-6 mt-6 rounded-[22px] bg-[#f1e9dc] p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#e99a36]">
            <Heart size={19} />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#27372f]">
            Plan your next adventure
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            Discover beautiful destinations and experiences across Bangladesh.
          </p>

          <Link
            to="/explore"
            onClick={onClose}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1f5b43]"
          >
            Explore destinations

            <ChevronRight size={14} />
          </Link>

        </div>

      </aside>
    </>
  );
};

/* =====================================================
   MOBILE NAV LINK
===================================================== */

type MobileLinkProps = {
  to: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

const MobileLink = ({
  to,
  label,
  onClick,
  danger = false,
}: MobileLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center justify-between
        rounded-2xl px-4 py-3.5
        text-sm font-semibold
        transition
        ${
          danger
            ? "text-[#b64a3b] hover:bg-[#f9ece9]"
            : "text-[#34463d] hover:bg-[#edf3ee] hover:text-[#1f5b43]"
        }
      `}
    >
      <span>{label}</span>

      <ChevronRight size={16} />
    </Link>
  );
};

export default MobileMenu;