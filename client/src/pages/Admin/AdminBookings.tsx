import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  Loader2,
  Search,
  MapPin,
  Users,
} from "lucide-react";

import {
  getAllBookings,
  confirmBooking,
  rejectBooking,
} from "../../services/api/adminApi";
import type { AdminBooking } from "../../services/api/adminApi";

// =====================================================
// STATUS FILTERS
// =====================================================

type StatusFilter = "All" | "Pending" | "Confirmed" | "Cancelled";

const FILTERS: StatusFilter[] = [
  "All",
  "Pending",
  "Confirmed",
  "Cancelled",
];

// =====================================================
// HELPERS
// =====================================================

const formatDate = (dateString?: string) => {
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

const getStatusClass = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    case "Pending":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";

    case "Cancelled":
    case "Rejected":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Confirmed":
      return <CheckCircle2 size={15} />;

    case "Pending":
      return <Clock3 size={15} />;

    case "Cancelled":
    case "Rejected":
      return <XCircle size={15} />;

    default:
      return <Clock3 size={15} />;
  }
};

// =====================================================
// COMPONENT
// =====================================================

const AdminBookings = () => {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");

  // Track which booking id currently has a confirm/reject
  // request in flight, so we can disable just that row.
  const [actionLoadingId, setActionLoadingId] = useState<
    number | null
  >(null);
  const [actionError, setActionError] = useState("");

  // =====================================================
  // LOAD BOOKINGS
  // =====================================================

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBookings();

      setBookings(
        Array.isArray(data.bookings) ? data.bookings : []
      );
    } catch (err) {
      setBookings([]);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      await loadBookings();
    };

    void fetchBookings();
  }, []);

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleConfirm = async (bookingId: number) => {
    try {
      setActionError("");
      setActionLoadingId(bookingId);

      const result = await confirmBooking(bookingId);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: result.status || "Confirmed" }
            : booking
        )
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to confirm booking."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (bookingId: number) => {
    try {
      setActionError("");
      setActionLoadingId(bookingId);

      const result = await rejectBooking(bookingId);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: result.status || "Cancelled" }
            : booking
        )
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to reject booking."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  // =====================================================
  // FILTERED LIST
  // =====================================================

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter =
        filter === "All" || booking.status === filter;

      if (!matchesFilter) return false;

      if (!query) return true;

      const haystack = [
        booking.destination,
        booking.location,
        booking.full_name,
        booking.user_name,
        booking.email,
        booking.user_email,
        String(booking.id),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [bookings, filter, search]);

  const counts = useMemo(() => {
    return {
      All: bookings.length,
      Pending: bookings.filter((b) => b.status === "Pending")
        .length,
      Confirmed: bookings.filter(
        (b) => b.status === "Confirmed"
      ).length,
      Cancelled: bookings.filter(
        (b) => b.status === "Cancelled"
      ).length,
    };
  }, [bookings]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2
          size={38}
          className="text-[#d6ae52] animate-spin"
        />

        <p className="mt-4 text-slate-400">
          Loading bookings...
        </p>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="bg-[#0d2523] border border-red-500/10 rounded-3xl p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle size={30} className="text-red-400" />
        </div>

        <h1 className="text-2xl font-semibold mt-6">
          Unable to load bookings
        </h1>

        <p className="text-slate-400 mt-3 max-w-md mx-auto">
          {error}
        </p>

        <button
          type="button"
          onClick={loadBookings}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
        >
          Try Again
        </button>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <p className="text-[#d6ae52] text-sm font-medium mb-2">
            Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Manage Bookings
          </h1>

          <p className="text-slate-400 mt-3">
            Review, confirm, or reject customer bookings.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#0d2523] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300">
          <CalendarDays size={17} className="text-[#d6ae52]" />

          <span>
            {bookings.length}{" "}
            {bookings.length === 1 ? "Booking" : "Bookings"}{" "}
            total
          </span>
        </div>
      </div>

      {actionError && (
        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {actionError}
        </div>
      )}

      {/* FILTERS + SEARCH */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                filter === item
                  ? "bg-[#d6ae52] text-[#071817] border-[#d6ae52]"
                  : "bg-[#0d2523] text-slate-300 border-white/5 hover:border-[#d6ae52]/30"
              }`}
            >
              {item} ({counts[item]})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-[#0d2523] border border-white/5 rounded-xl px-4 py-2.5 w-full lg:w-80">
          <Search size={16} className="text-slate-500 shrink-0" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, destination..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredBookings.length === 0 ? (
        <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-10 md:p-14 text-center">
          <p className="text-slate-400">
            No bookings match this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 hover:border-[#d6ae52]/20 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                {/* LEFT: BOOKING INFO */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold">
                      {booking.destination || "—"}
                    </h2>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 mt-2 text-sm">
                    <MapPin size={14} className="text-[#d9b45c]" />
                    {booking.location || "—"}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-white/5 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">
                        Customer
                      </p>
                      <p className="mt-1">
                        {booking.full_name ||
                          booking.user_name ||
                          "—"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {booking.email ||
                          booking.user_email ||
                          ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Check In
                      </p>
                      <p className="mt-1">
                        {formatDate(booking.check_in)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Check Out
                      </p>
                      <p className="mt-1">
                        {formatDate(booking.check_out)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Users size={12} />
                        Guests / Rooms
                      </p>
                      <p className="mt-1">
                        {booking.guests} guest
                        {booking.guests === 1 ? "" : "s"} ·{" "}
                        {booking.rooms} room
                        {booking.rooms === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT: PRICE + ACTIONS */}
                <div className="lg:w-56 shrink-0 flex flex-col items-start lg:items-end gap-4">
                  <div className="text-left lg:text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Total Price
                    </p>
                    <p className="text-2xl font-bold text-[#d6ae52] mt-1">
                      {formatPrice(booking.total_price)}
                    </p>
                  </div>

                  {booking.status === "Pending" ? (
                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        type="button"
                        disabled={actionLoadingId === booking.id}
                        onClick={() =>
                          handleConfirm(booking.id)
                        }
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoadingId === booking.id ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                        Confirm
                      </button>

                      <button
                        type="button"
                        disabled={actionLoadingId === booking.id}
                        onClick={() =>
                          handleReject(booking.id)
                        }
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Booking #
                      {String(booking.id).padStart(5, "0")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminBookings;