import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Menu, User, LogOut, Compass } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "../navbar/MobileMenu";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/hotels", label: "Hotels" },
  { to: "/transportation", label: "Transport" },
  { to: "/blog", label: "Blog" },
  { to: "/emergency", label: "Emergency" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-paper-raised/95 backdrop-blur-md border-b border-mist z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-5 lg:px-8">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <Compass className="text-river" size={28} strokeWidth={2} />
            <span className="font-display text-2xl font-semibold text-river">
              TripDaoBD
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-ink-soft">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative py-1 transition-colors ${
                    isActive ? "text-river" : "hover:text-river"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `relative py-1 transition-colors ${
                    isActive ? "text-river" : "hover:text-river"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-ink font-semibold px-4 py-2.5 hover:text-river transition-colors"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="bg-brass hover:bg-brass-dark text-ink px-5 py-2.5 rounded-md font-semibold transition-colors"
                >
                  Create account
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 border border-mist px-3 py-2 rounded-full hover:border-tea transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-tea-light text-tea flex items-center justify-center overflow-hidden font-semibold">
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt={user.full_name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.full_name?.charAt(0).toUpperCase() || (
                        <User size={16} />
                      )
                    )}
                  </div>
                  <span className="hidden xl:block font-medium text-ink max-w-[110px] truncate">
                    {user.full_name || "Traveler"}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="flex items-center gap-2 text-brick hover:bg-brick-light px-3 py-2.5 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              className="lg:hidden text-ink"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;