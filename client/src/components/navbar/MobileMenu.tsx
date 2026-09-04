import { Link } from "react-router-dom";
import { X } from "lucide-react";
import type { AuthUser } from "../../context/AuthContext.types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onLogout: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/hotels", label: "Hotels" },
  { to: "/transportation", label: "Transportation" },
  { to: "/booking", label: "Booking" },
  { to: "/blog", label: "Blog" },
  { to: "/emergency", label: "Emergency" },
];

const MobileMenu = ({ open, onClose, user, onLogout }: MobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-paper-raised shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-mist">
          <span className="font-display text-xl font-semibold text-river">
            TripDaoBD
          </span>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-ink-soft hover:text-ink"
          >
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 gap-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="py-3 text-lg font-medium text-ink border-b border-mist/70 hover:text-tea"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="py-3 text-lg font-medium text-ink border-b border-mist/70 hover:text-tea"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="mt-auto px-6 py-6 border-t border-mist flex flex-col gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="text-center border border-ink/20 rounded-md py-3 font-semibold text-ink"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="text-center bg-brass rounded-md py-3 font-semibold text-ink"
              >
                Create account
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-center border border-brick/30 text-brick rounded-md py-3 font-semibold"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;