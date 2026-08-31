import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  Hotel,
  CreditCard,
  ShieldCheck,
  XCircle,
  Loader2,
  AlertCircle,
  Receipt,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

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
  status:
    | "Confirmed"
    | "Pending"
    | "Cancelled";
  created_at?: string;
}

interface BookingResponse {
  success: boolean;
  booking: Booking;

  pricing?: {
    nights: number;
    room_price_per_night: number;
    rooms: number;
    room_subtotal: number;
    service_fee: number;
    vat: number;
    total_price: number;
  };

  message?: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";


// =====================================================
// HELPER: NORMALIZE DATE
// =====================================================

const normalizeDate = (
  value: string | Date | null | undefined
): string | null => {
  if (!value) {
    return null;
  }

  // Date object
  if (value instanceof Date) {
    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
      return null;
    }

    const year =
      value.getFullYear();

    const month = String(
      value.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      value.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const stringValue =
    String(value).trim();

  if (!stringValue) {
    return null;
  }

  // YYYY-MM-DD
  const dateOnlyMatch =
    stringValue.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

  if (dateOnlyMatch) {
    return stringValue;
  }

  // YYYY-MM-DD HH:mm:ss
  const mysqlMatch =
    stringValue.match(
      /^(\d{4})-(\d{2})-(\d{2})/
    );

  if (mysqlMatch) {
    return `${mysqlMatch[1]}-${mysqlMatch[2]}-${mysqlMatch[3]}`;
  }

  // ISO / other date format
  const parsed =
    new Date(stringValue);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return null;
  }

  const year =
    parsed.getFullYear();

  const month = String(
    parsed.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsed.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


// =====================================================
// HELPER: CALCULATE NIGHTS
// =====================================================

const calculateNights = (
  checkIn: string,
  checkOut: string
) => {
  const normalizedCheckIn =
    normalizeDate(checkIn);

  const normalizedCheckOut =
    normalizeDate(checkOut);

  if (
    !normalizedCheckIn ||
    !normalizedCheckOut
  ) {
    return 0;
  }

  const [
    startYear,
    startMonth,
    startDay,
  ] = normalizedCheckIn
    .split("-")
    .map(Number);

  const [
    endYear,
    endMonth,
    endDay,
  ] = normalizedCheckOut
    .split("-")
    .map(Number);

  const start = new Date(
    startYear,
    startMonth - 1,
    startDay
  );

  const end = new Date(
    endYear,
    endMonth - 1,
    endDay
  );

  const difference =
    end.getTime() -
    start.getTime();

  const nights = Math.round(
    difference /
      (1000 * 60 * 60 * 24)
  );

  return Math.max(
    nights,
    0
  );
};


// =====================================================
// COMPONENT
// =====================================================

const BookingDetails = () => {
  const navigate =
    useNavigate();

  const { id } =
    useParams<{
      id: string;
    }>();


  const [booking, setBooking] =
    useState<Booking | null>(
      null
    );

  const [nights, setNights] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [cancelling, setCancelling] =
    useState(false);

  const [error, setError] =
    useState("");


  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem(
        "token"
      ) ||
      localStorage.getItem(
        "accessToken"
      ) ||
      sessionStorage.getItem(
        "token"
      ) ||
      sessionStorage.getItem(
        "accessToken"
      )
    );
  };


  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (
    price: number | string
  ) => {
    const value =
      Number(price);

    if (
      Number.isNaN(value)
    ) {
      return "৳ 0";
    }

    return `৳ ${value.toLocaleString(
      "en-BD"
    )}`;
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date: string
  ) => {
    if (!date) {
      return "N/A";
    }

    const normalized =
      normalizeDate(date);

    if (!normalized) {
      return date;
    }

    const [
      year,
      month,
      day,
    ] = normalized
      .split("-")
      .map(Number);

    const parsedDate =
      new Date(
        year,
        month - 1,
        day
      );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status: Booking["status"]
  ) => {
    if (
      status === "Confirmed"
    ) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (
      status === "Pending"
    ) {
      return "bg-[#c9a34e]/10 text-[#d9b45c] border-[#c9a34e]/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };


  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (
    status: Booking["status"]
  ) => {
    if (
      status === "Confirmed"
    ) {
      return (
        <CheckCircle2
          size={16}
        />
      );
    }

    if (
      status === "Pending"
    ) {
      return (
        <Clock3
          size={16}
        />
      );
    }

    return (
      <XCircle
        size={16}
      />
    );
  };


  // =====================================================
  // LOAD BOOKING
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadBooking =
      async () => {
        const token =
          getToken();

        if (!token) {
          if (!cancelled) {
            setError(
              "Please log in to view this booking."
            );

            setLoading(false);
          }

          return;
        }

        if (!id) {
          if (!cancelled) {
            setError(
              "Booking ID is missing."
            );

            setLoading(false);
          }

          return;
        }

        try {
          if (!cancelled) {
            setLoading(true);
            setError("");
          }

          const response =
            await fetch(
              `${API_BASE_URL}/bookings/${id}`,
              {
                method: "GET",

                headers: {
                  Authorization:
                    `Bearer ${token}`,

                  "Content-Type":
                    "application/json",
                },
              }
            );

          const data: BookingResponse =
            await response.json();

          if (
            !response.ok
          ) {
            throw new Error(
              data?.message ||
                "Failed to load booking."
            );
          }

          if (
            !data.booking
          ) {
            throw new Error(
              "Booking information is missing."
            );
          }

          if (!cancelled) {
            setBooking(
              data.booking
            );

            // =================================================
            // IMPORTANT:
            // First use backend calculated nights.
            // If backend does not provide it,
            // calculate from check-in/check-out.
            // =================================================

            const backendNights =
              Number(
                data.pricing?.nights
              );

            const calculatedNights =
              calculateNights(
                data.booking
                  .check_in,

                data.booking
                  .check_out
              );

            if (
              backendNights > 0
            ) {
              setNights(
                backendNights
              );
            } else {
              setNights(
                calculatedNights
              );
            }
          }

        } catch (err) {
          console.error(
            "Load Booking Details Error:",
            err
          );

          if (!cancelled) {
            setError(
              err instanceof Error
                ? err.message
                : "Failed to load booking."
            );
          }

        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    void loadBooking();

    return () => {
      cancelled = true;
    };
  }, [id]);


  // =====================================================
  // CANCEL BOOKING
  // =====================================================

  const handleCancelBooking =
    async () => {
      if (!booking) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this booking?"
        );

      if (!confirmed) {
        return;
      }

      const token =
        getToken();

      if (!token) {
        alert(
          "Your session has expired. Please log in again."
        );

        navigate("/login");

        return;
      }

      try {
        setCancelling(true);

        const response =
          await fetch(
            `${API_BASE_URL}/bookings/${booking.id}/cancel`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data?.message ||
              "Failed to cancel booking."
          );
        }

        setBooking(
          (
            currentBooking
          ) => {
            if (
              !currentBooking
            ) {
              return currentBooking;
            }

            return {
              ...currentBooking,

              status:
                "Cancelled",
            };
          }
        );

        alert(
          data?.message ||
            "Booking cancelled successfully."
        );

      } catch (err) {
        console.error(
          "Cancel Booking Error:",
          err
        );

        alert(
          err instanceof Error
            ? err.message
            : "Failed to cancel booking."
        );

      } finally {
        setCancelling(
          false
        );
      }
    };


  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#071817] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/bookings"
              )
            }
            className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-8"
          >
            <ArrowLeft size={18} />

            Back to My Bookings
          </button>

          <div className="min-h-[400px] bg-[#0d2523] border border-white/5 rounded-3xl flex flex-col items-center justify-center">

            <Loader2
              size={38}
              className="text-[#d9b45c] animate-spin"
            />

            <p className="text-slate-400 mt-4">
              Loading booking details...
            </p>

          </div>

        </div>
      </section>
    );
  }


  // =====================================================
  // ERROR STATE
  // =====================================================

  if (
    error ||
    !booking
  ) {
    return (
      <section className="min-h-screen bg-[#071817] text-white py-8">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/bookings"
              )
            }
            className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-8"
          >
            <ArrowLeft size={18} />

            Back to My Bookings
          </button>

          <div className="bg-[#0d2523] border border-red-500/10 rounded-3xl p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">

              <AlertCircle
                size={30}
                className="text-red-400"
              />

            </div>

            <h1 className="text-2xl font-semibold mt-6">
              Booking Not Found
            </h1>

            <p className="text-slate-500 mt-3">
              {error ||
                "The requested booking could not be found."}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard/bookings"
                )
              }
              className="mt-6 inline-flex items-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
            >
              <ArrowLeft size={17} />

              Back to Bookings
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

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard/bookings"
            )
          }
          className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-8"
        >
          <ArrowLeft size={18} />

          Back to My Bookings
        </button>


        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

          <div>

            <p className="text-[#d6ae52] text-sm font-medium mb-2">
              Booking Details
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {booking.destination}
            </h1>

            <div className="flex items-center gap-2 text-slate-400 mt-3">

              <MapPin
                size={17}
                className="text-[#d9b45c]"
              />

              {booking.location}

            </div>

          </div>

          <div
            className={`inline-flex self-start md:self-auto items-center gap-2 text-sm px-4 py-2 rounded-full border ${getStatusClass(
              booking.status
            )}`}
          >
            {getStatusIcon(
              booking.status
            )}

            {booking.status}

          </div>

        </div>


        {/* BOOKING ID */}

        <div className="bg-[#0d2523] border border-white/5 rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-3">

            <Receipt
              size={19}
              className="text-[#d9b45c]"
            />

            <span className="text-sm text-slate-400">
              Booking ID
            </span>

            <span className="font-semibold">
              #
              {String(
                booking.id
              ).padStart(5, "0")}
            </span>

          </div>

          {booking.created_at && (
            <span className="text-sm text-slate-500">
              Created{" "}
              {formatDate(
                booking.created_at
              )}
            </span>
          )}

        </div>


        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-[1fr_350px] gap-6">


          {/* LEFT */}

          <div className="space-y-6">


            {/* TRIP INFORMATION */}

            <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-7">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                  <Hotel
                    size={20}
                    className="text-[#d9b45c]"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-semibold">
                    Trip Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your booking schedule and accommodation details.
                  </p>

                </div>

              </div>


              <div className="grid sm:grid-cols-2 gap-4">


                {/* CHECK IN */}

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <CalendarDays
                      size={16}
                      className="text-[#d9b45c]"
                    />

                    Check-in

                  </div>

                  <p className="font-semibold mt-3">
                    {formatDate(
                      booking.check_in
                    )}
                  </p>

                </div>


                {/* CHECK OUT */}

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <CalendarDays
                      size={16}
                      className="text-[#d9b45c]"
                    />

                    Check-out

                  </div>

                  <p className="font-semibold mt-3">
                    {formatDate(
                      booking.check_out
                    )}
                  </p>

                </div>


                {/* NIGHTS */}

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <Clock3
                      size={16}
                      className="text-[#d9b45c]"
                    />

                    Duration

                  </div>

                  <p className="font-semibold mt-3">

                    {nights}{" "}

                    {nights === 1
                      ? "Night"
                      : "Nights"}

                  </p>

                </div>


                {/* GUESTS */}

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                  <div className="flex items-center gap-2 text-slate-500 text-sm">

                    <Users
                      size={16}
                      className="text-[#d9b45c]"
                    />

                    Guests

                  </div>

                  <p className="font-semibold mt-3">

                    {booking.guests}{" "}

                    {booking.guests === 1
                      ? "Guest"
                      : "Guests"}

                  </p>

                </div>

              </div>


              {/* ROOMS */}

              <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                <p className="text-sm text-slate-500">
                  Rooms
                </p>

                <p className="font-semibold mt-2">

                  {booking.rooms}{" "}

                  {booking.rooms === 1
                    ? "Room"
                    : "Rooms"}

                </p>

              </div>

            </div>


            {/* CUSTOMER INFORMATION */}

            <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-7">

              <h2 className="text-xl font-semibold">
                Guest Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Contact information used for this booking.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-6">

                <div>

                  <p className="text-xs text-slate-500">
                    Full Name
                  </p>

                  <p className="text-sm font-medium mt-2">
                    {booking.full_name}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <p className="text-sm font-medium mt-2 break-all">
                    {booking.email}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-slate-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium mt-2">
                    {booking.phone}
                  </p>

                </div>

              </div>


              {booking.special_request && (
                <div className="mt-6 pt-6 border-t border-white/5">

                  <p className="text-xs text-slate-500">
                    Special Request
                  </p>

                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {booking.special_request}
                  </p>

                </div>
              )}

            </div>

          </div>


          {/* RIGHT */}

          <div className="space-y-6">


            {/* PRICE SUMMARY */}

            <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                  <CreditCard
                    size={20}
                    className="text-[#d9b45c]"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-semibold">
                    Payment Summary
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Complete booking cost.
                  </p>

                </div>

              </div>


              <div className="space-y-4">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500">
                    Room subtotal
                  </span>

                  <span className="text-sm">
                    {formatPrice(
                      booking.room_price
                    )}
                  </span>

                </div>


                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500">
                    Service fee
                  </span>

                  <span className="text-sm">
                    {formatPrice(
                      booking.service_fee
                    )}
                  </span>

                </div>


                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500">
                    VAT
                  </span>

                  <span className="text-sm">
                    {formatPrice(
                      booking.vat
                    )}
                  </span>

                </div>


                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">

                  <span className="font-medium">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#d9b45c]">
                    {formatPrice(
                      booking.total_price
                    )}
                  </span>

                </div>

              </div>


              <div className="mt-6 p-4 rounded-xl bg-[#c9a34e]/5 border border-[#c9a34e]/10">

                <div className="flex items-start gap-3">

                  <Clock3
                    size={17}
                    className="text-[#d9b45c] mt-0.5 shrink-0"
                  />

                  <p className="text-xs text-slate-400 leading-relaxed">

                    Payment status:{" "}

                    <span className="text-[#d9b45c] font-medium">
                      Pending
                    </span>

                    . Payment can be completed after your booking is confirmed.

                  </p>

                </div>

              </div>

            </div>


            {/* SECURITY */}

            <div className="bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-3xl p-6">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={21}
                  className="text-[#d9b45c] mt-0.5"
                />

                <div>

                  <h3 className="font-semibold">
                    Secure Booking
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Your booking and personal information are protected by TripDaoBD's secure system.
                  </p>

                </div>

              </div>

            </div>


            {/* CANCEL */}

            {booking.status !==
              "Cancelled" && (

              <div className="bg-[#0d2523] border border-red-500/10 rounded-3xl p-6">

                <h3 className="font-semibold">
                  Booking Actions
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  If you no longer need this booking, you can cancel it below.
                </p>

                <button
                  type="button"
                  disabled={
                    cancelling
                  }
                  onClick={
                    handleCancelBooking
                  }
                  className="w-full mt-5 inline-flex items-center justify-center gap-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl text-sm font-semibold transition"
                >

                  {cancelling ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle
                        size={17}
                      />

                      Cancel Booking
                    </>
                  )}

                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default BookingDetails;