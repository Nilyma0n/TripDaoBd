import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  ChevronDown,
  Globe,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Go back to homepage
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Globe
            className="text-blue-700"
            size={34}
          />

          <h1 className="text-3xl font-extrabold text-blue-700">
            TripDaoBD
          </h1>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <nav className="hidden lg:flex items-center gap-7 font-semibold text-gray-700">

          <Link
            to="/"
            className="hover:text-blue-700 transition"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="hover:text-blue-700 transition"
          >
            Explore
          </Link>

          <Link
            to="/hotels"
            className="hover:text-blue-700 transition"
          >
            Hotels
          </Link>

          <Link
            to="/transportation"
            className="hover:text-blue-700 transition"
          >
            Transportation
          </Link>

          <Link
            to="/booking"
            className="hover:text-blue-700 transition"
          >
            Booking
          </Link>

          <Link
            to="/blog"
            className="hover:text-blue-700 transition"
          >
            Blog
          </Link>

          <Link
            to="/emergency"
            className="hover:text-blue-700 transition"
          >
            Emergency
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-blue-700 transition"
            >
              Dashboard
            </Link>
          )}

          <button className="flex items-center gap-1 hover:text-blue-700 transition">
            More
            <ChevronDown size={18} />
          </button>

        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button className="hover:text-blue-700 transition">
            <Search size={22} />
          </button>

          {!user ? (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="border border-blue-700 text-blue-700 px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition"
              >
                Login
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className="bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            /* ================= LOGGED IN USER ================= */
            <div className="flex items-center gap-3">

              {/* User Profile */}
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-full hover:bg-blue-50 transition"
              >

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center overflow-hidden font-bold">

                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={user.full_name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.full_name
                      ?.charAt(0)
                      .toUpperCase() || (
                      <User size={18} />
                    )
                  )}

                </div>

                {/* Name */}
                <span className="hidden xl:block font-semibold text-gray-700 max-w-[120px] truncate">
                  {user.full_name || "Traveler"}
                </span>

              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden xl:block">
                  Logout
                </span>
              </button>

            </div>
          )}

          {/* Mobile Menu */}
          <button className="lg:hidden">
            <Menu size={28} />
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;