import {
  CalendarDays,
  MapPin,
  Hotel,
  Bus,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowRight,
  Compass,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// =====================================================
// TYPES
// =====================================================

interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  guests: number;
  rooms: number;
  check_in: string;
  check_out: string;
  special_request?: string | null;
  destination: string;
  location: string;
  room_price: number | string;
  service_fee: number | string;
  vat: number | string;
  total_price: number | string;
  status: "Confirmed" | "Pending" | "Cancelled";
  created_at?: string;
}

interface BookingResponse {
  success: boolean;
  count: number;
  bookings: Booking[];
  message?: string;
}

// =====================================================
// API
// =====================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

// =====================================================
// HELPERS
// =====================================================

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken")
  );
};

const formatDate = (dateString: string) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatPrice = (value: number | string) => {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "৳0.00";
  }

  return `৳${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// =====================================================
// STATUS HELPERS
// =====================================================

const getStatusClass = (status: Booking["status"]) => {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    case "Pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";

    case "Cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

const getStatusIcon = (status: Booking["status"]) => {
  switch (status) {
    case "Confirmed":
      return <CheckCircle2 size={15} />;

    case "Pending":
      return <Clock3 size={15} />;

    case "Cancelled":
      return <XCircle size={15} />;

    default:
      return <Clock3 size={15} />;
  }
};

// =====================================================
// COMPONENT
// =====================================================

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD BOOKINGS
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        // -------------------------------------------------
        // IMPORTANT:
        // Token may be in localStorage OR sessionStorage.
        // Remember Me determines where AuthContext stores it.
        // -------------------------------------------------

        const token = getToken();

        if (!token) {
          if (!cancelled) {
            setError("Please login to view your bookings.");
            setBookings([]);
          }

          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/bookings/my`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        let data: BookingResponse | null = null;

        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Unable to load bookings. Server returned ${response.status}.`
          );
        }

        if (!data?.success) {
          throw new Error(
            data?.message || "Unable to load bookings."
          );
        }

        if (!cancelled) {
          setBookings(
            Array.isArray(data.bookings)
              ? data.bookings
              : []
          );
        }
      } catch (err) {
        if (cancelled) return;

        console.error("MyBookings error:", err);

        setBookings([]);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load bookings."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#071817] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2
              size={38}
              className="text-[#d6ae52] animate-spin"
            />

            <p className="mt-4 text-slate-400">
              Loading your bookings...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="min-h-screen bg-[#071817] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0d2523] border border-red-500/10 rounded-3xl p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle
                size={30}
                className="text-red-400"
              />
            </div>

            <h1 className="text-2xl font-semibold mt-6">
              Unable to load bookings
            </h1>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (bookings.length === 0) {
    return (
      <section className="min-h-screen bg-[#071817] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mb-10">
            <p className="text-[#d6ae52] text-sm font-medium mb-2">
              Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              My Bookings
            </h1>

            <p className="text-slate-400 mt-3">
              Manage and track all your travel bookings.
            </p>
          </div>

          <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-10 md:p-14 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#d6ae52]/10 flex items-center justify-center">
              <Compass
                size={36}
                className="text-[#d6ae52]"
              />
            </div>

            <h2 className="text-2xl font-semibold mt-6">
              No bookings yet
            </h2>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              You haven't made any bookings yet. Start
              exploring destinations and plan your next
              trip.
            </p>

            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="mt-7 inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
            >
              <Compass size={18} />

              Explore Now

              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="min-h-screen bg-[#071817] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <p className="text-[#d6ae52] text-sm font-medium mb-2">
              Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              My Bookings
            </h1>

            <p className="text-slate-400 mt-3">
              Manage and track all your travel bookings.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0d2523] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300">
            <CalendarDays
              size={17}
              className="text-[#d6ae52]"
            />

            <span>
              {bookings.length}{" "}
              {bookings.length === 1
                ? "Booking"
                : "Bookings"}
            </span>
          </div>
        </div>

        {/* BOOKING LIST */}
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-7 hover:border-[#d6ae52]/20 transition"
            >
              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#d6ae52]/10 flex items-center justify-center">
                    <Hotel
                      size={22}
                      className="text-[#d6ae52]"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl md:text-2xl font-semibold">
                        {booking.destination}
                      </h2>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(
                          booking.status
                        )}

                        {booking.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 mt-2">
                      <MapPin
                        size={15}
                        className="text-[#d9b45c]"
                      />

                      <span>
                        {booking.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Total Price
                  </p>

                  <p className="text-2xl font-bold text-[#d6ae52] mt-1">
                    {formatPrice(
                      booking.total_price
                    )}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 pt-6 border-t border-white/5">
                {/* CHECK IN */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <CalendarDays
                      size={17}
                      className="text-[#d6ae52]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check In
                    </p>

                    <p className="text-sm text-white mt-1">
                      {formatDate(
                        booking.check_in
                      )}
                    </p>
                  </div>
                </div>

                {/* CHECK OUT */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <CalendarDays
                      size={17}
                      className="text-[#d6ae52]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Check Out
                    </p>

                    <p className="text-sm text-white mt-1">
                      {formatDate(
                        booking.check_out
                      )}
                    </p>
                  </div>
                </div>

                {/* GUESTS */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Users
                      size={17}
                      className="text-[#d6ae52]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Guests
                    </p>

                    <p className="text-sm text-white mt-1">
                      {booking.guests}{" "}
                      {booking.guests === 1
                        ? "Guest"
                        : "Guests"}
                    </p>
                  </div>
                </div>

                {/* ROOMS */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Hotel
                      size={17}
                      className="text-[#d6ae52]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Rooms
                    </p>

                    <p className="text-sm text-white mt-1">
                      {booking.rooms}{" "}
                      {booking.rooms === 1
                        ? "Room"
                        : "Rooms"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-7 pt-5 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Bus size={16} />

                  <span>
                    Booking #{String(
                      booking.id
                    ).padStart(5, "0")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/bookings/${booking.id}`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  View Details

                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-8 bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h3 className="text-xl font-semibold">
              Planning another trip?
            </h3>

            <p className="text-slate-400 mt-2">
              Explore new destinations and find your
              next adventure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
          >
            <Compass size={18} />

            Explore Now

            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyBookings;