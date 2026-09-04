import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Wallet,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { getAllBookings } from "../../services/api/adminApi";
import type { AdminBooking } from "../../services/api/adminApi";

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

const formatPrice = (value: number) => {
  if (Number.isNaN(value)) {
    return "৳0.00";
  }

  return `৳${value.toLocaleString("en-BD", {
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

// =====================================================
// COMPONENT
// =====================================================

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllBookings();

        if (!cancelled) {
          setBookings(
            Array.isArray(data.bookings) ? data.bookings : []
          );
        }
      } catch (err) {
        if (cancelled) return;

        setBookings([]);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard data."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const pending = bookings.filter(
      (b) => b.status === "Pending"
    ).length;

    const confirmed = bookings.filter(
      (b) => b.status === "Confirmed"
    );

    const cancelled = bookings.filter(
      (b) => b.status === "Cancelled"
    ).length;

    const revenue = confirmed.reduce(
      (sum, b) => sum + Number(b.total_price || 0),
      0
    );

    return {
      total: bookings.length,
      pending,
      confirmed: confirmed.length,
      cancelled,
      revenue,
    };
  }, [bookings]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 6);
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
          Loading admin dashboard...
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
          Unable to load dashboard
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
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  const statCards = [
    {
      label: "Total Bookings",
      value: stats.total,
      icon: CalendarDays,
      accent: "text-[#d6ae52]",
      bg: "bg-[#d6ae52]/10",
    },
    {
      label: "Pending Review",
      value: stats.pending,
      icon: Clock3,
      accent: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle2,
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      accent: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <section className="text-white">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-[#d6ae52] text-sm font-medium mb-2">
          Admin
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-3">
          Platform overview and booking activity at a glance.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ label, value, icon: Icon, accent, bg }) => (
          <div
            key={label}
            className="bg-[#0d2523] border border-white/5 rounded-3xl p-6"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}
            >
              <Icon size={20} className={accent} />
            </div>

            <p className="text-3xl font-bold mt-4">{value}</p>

            <p className="text-sm text-slate-400 mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* REVENUE CARD */}
      <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-7 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#d6ae52]/10 flex items-center justify-center">
            <Wallet size={22} className="text-[#d6ae52]" />
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Revenue from confirmed bookings
            </p>
            <p className="text-3xl font-bold text-[#d6ae52] mt-1">
              {formatPrice(stats.revenue)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/admin/bookings")}
          className="inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
        >
          Manage Bookings
          <ArrowRight size={16} />
        </button>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">
            Recent Bookings
          </h2>

          <button
            type="button"
            onClick={() => navigate("/dashboard/admin/bookings")}
            className="text-sm text-[#d9b45c] hover:text-[#f0cd72] transition inline-flex items-center gap-1"
          >
            View all
            <ArrowRight size={14} />
          </button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No bookings yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 last:border-0 pb-3 last:pb-0"
              >
                <div>
                  <p className="font-medium">
                    {booking.destination || "—"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {booking.full_name ||
                      booking.user_name ||
                      "Unknown"}{" "}
                    · {formatDate(booking.created_at)}
                  </p>
                </div>

                <span
                  className={`inline-flex self-start sm:self-auto items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;