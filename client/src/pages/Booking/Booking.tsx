import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import {
  CalendarDays,
  Users,
  Hotel,
  Phone,
  Mail,
  User,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Banknote,
  WalletCards,
  Clock3,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const API_URL = "http://localhost:5000/api";

const ROOM_PRICE_PER_NIGHT = 8500;
const SERVICE_FEE_RATE = 0.05;
const VAT_RATE = 0.075;

type PaymentMethod = "pay_now" | "pay_at_hotel";

interface BookingState {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  paymentMethod: PaymentMethod;
}

const Booking = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [booking, setBooking] = useState<BookingState>({
    fullName: "",
    email: "",
    phone: "",
    guests: 1,
    rooms: 1,
    checkIn: "",
    checkOut: "",
    specialRequest: "",
    paymentMethod: "pay_at_hotel",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setErrorMessage("");

    setBooking((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Math.max(1, Number(value))
          : value,
    }));
  };

  // =====================================================
  // CALCULATE NIGHTS
  // =====================================================

  const nights = useMemo(() => {
    if (!booking.checkIn || !booking.checkOut) {
      return 0;
    }

    const checkIn = new Date(`${booking.checkIn}T00:00:00`);
    const checkOut = new Date(`${booking.checkOut}T00:00:00`);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    const calculatedNights =
      difference / (1000 * 60 * 60 * 24);

    return calculatedNights > 0
      ? Math.floor(calculatedNights)
      : 0;
  }, [booking.checkIn, booking.checkOut]);

  // =====================================================
  // PRICE CALCULATION
  // =====================================================

  const priceDetails = useMemo(() => {
    const rooms = Math.max(1, booking.rooms);

    const roomSubtotal =
      ROOM_PRICE_PER_NIGHT * nights * rooms;

    const serviceFee =
      roomSubtotal * SERVICE_FEE_RATE;

    const vat =
      (roomSubtotal + serviceFee) * VAT_RATE;

    const total =
      roomSubtotal + serviceFee + vat;

    return {
      roomSubtotal,
      serviceFee,
      vat,
      total,
    };
  }, [nights, booking.rooms]);

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // =====================================================
  // GET TODAY
  // =====================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =====================================================
  // SUBMIT BOOKING
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // ---------------------------------------------------
    // Basic validation
    // ---------------------------------------------------

    if (!booking.checkIn || !booking.checkOut) {
      setErrorMessage(
        "Please select both check-in and check-out dates."
      );
      return;
    }

    if (nights <= 0) {
      setErrorMessage(
        "Check-out date must be after the check-in date."
      );
      return;
    }

    if (!booking.paymentMethod) {
      setErrorMessage(
        "Please select a payment method."
      );
      return;
    }

    setLoading(true);

    try {
      if (!token) {
        setErrorMessage(
          "Please login before making a booking."
        );

        setLoading(false);

        navigate("/login");
        return;
      }

      // -------------------------------------------------
      // Send booking to backend
      // -------------------------------------------------

      const response = await fetch(
        `${API_URL}/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            full_name: booking.fullName,
            email: booking.email,
            phone: booking.phone,

            guests: booking.guests,
            rooms: booking.rooms,

            check_in: booking.checkIn,
            check_out: booking.checkOut,

            special_request:
              booking.specialRequest || null,

            destination:
              "Cox's Bazar Retreat",

            location:
              "Cox's Bazar, Bangladesh",

            room_price:
              priceDetails.roomSubtotal,

            service_fee:
              priceDetails.serviceFee,

            vat:
              priceDetails.vat,

            total_price:
              priceDetails.total,

            payment_method:
              booking.paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to create booking."
        );
      }

      // -------------------------------------------------
      // Success
      // -------------------------------------------------

      setSuccessMessage(
        `Booking #${String(
          data.booking?.id || ""
        ).padStart(5, "0")} submitted successfully.`
      );

      // Give user time to see success message
      setTimeout(() => {
        navigate("/dashboard/bookings");
      }, 1800);
    } catch (error) {
      console.error(
        "Booking Submission Error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating your booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#071817] text-white py-12">
      <Container>
        {/* =====================================================
            BACK
        ====================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-10">
          <p className="text-[#d6ae52] text-sm font-medium mb-2">
            TripDaoBD • Booking
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Complete Your Booking
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Reserve your stay securely with TripDaoBD.
            Your booking price is calculated automatically
            based on your stay duration and number of rooms.
          </p>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {successMessage && (
          <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 flex items-start gap-4">
            <CheckCircle2
              className="text-emerald-400 shrink-0"
              size={24}
            />

            <div>
              <h3 className="font-semibold text-emerald-300">
                Booking Submitted
              </h3>

              <p className="text-sm text-emerald-200/70 mt-1">
                {successMessage}
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Redirecting to your bookings...
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR MESSAGE
        ====================================================== */}

        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
            <p className="text-sm text-red-300">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* =====================================================
              FORM
          ====================================================== */}

          <div className="lg:col-span-2">
            <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">

              {/* Traveler Header */}

              <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#c9a34e]/10 border border-[#c9a34e]/20 flex items-center justify-center">
                  <Hotel
                    size={23}
                    className="text-[#d9b45c]"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Traveler Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Enter the details required for your reservation.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-8 mt-8"
              >

                {/* =================================================
                    NAME + EMAIL
                ================================================== */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <User size={15} />
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={booking.fullName}
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Mail size={15} />
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={booking.email}
                      placeholder="you@example.com"
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                    />
                  </div>
                </div>

                {/* =================================================
                    PHONE
                ================================================== */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Phone size={15} />
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={booking.phone}
                    placeholder="+880 1XXXXXXXXX"
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                  />
                </div>

                {/* =================================================
                    DATES
                ================================================== */}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-200">
                      Travel Dates
                    </h3>

                    {nights > 0 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-[#c9a34e]/10 border border-[#c9a34e]/20 text-[#d9b45c]">
                        {nights}{" "}
                        {nights === 1
                          ? "Night"
                          : "Nights"}
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* Check in */}

                    <div>
                      <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <CalendarDays size={15} />
                        Check-in
                      </label>

                      <input
                        type="date"
                        name="checkIn"
                        min={today}
                        value={booking.checkIn}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                      />
                    </div>

                    {/* Check out */}

                    <div>
                      <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <CalendarDays size={15} />
                        Check-out
                      </label>

                      <input
                        type="date"
                        name="checkOut"
                        min={
                          booking.checkIn ||
                          today
                        }
                        value={booking.checkOut}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    GUESTS + ROOMS
                ================================================== */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Users size={15} />
                      Guests
                    </label>

                    <input
                      type="number"
                      name="guests"
                      min={1}
                      value={booking.guests}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#c9a34e]/60"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Hotel size={15} />
                      Rooms
                    </label>

                    <input
                      type="number"
                      name="rooms"
                      min={1}
                      value={booking.rooms}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#c9a34e]/60"
                    />
                  </div>
                </div>

                {/* =================================================
                    SPECIAL REQUEST
                ================================================== */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <FileText size={15} />
                    Special Requests
                  </label>

                  <textarea
                    rows={5}
                    name="specialRequest"
                    value={booking.specialRequest}
                    placeholder="Any special requirements or requests..."
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 outline-none resize-none transition focus:border-[#c9a34e]/60 focus:ring-2 focus:ring-[#c9a34e]/10"
                  />
                </div>

                {/* =================================================
                    PAYMENT METHOD
                ================================================== */}

                <div>
                  <div className="flex items-center justify-between mb-4">

                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">
                        Payment Method
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        Choose how you want to pay for your stay.
                      </p>
                    </div>

                    <ShieldCheck
                      size={19}
                      className="text-emerald-400"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">

                    {/* PAY AT HOTEL */}

                    <label
                      className={`relative cursor-pointer rounded-2xl border p-5 transition ${
                        booking.paymentMethod ===
                        "pay_at_hotel"
                          ? "border-[#d9b45c]/70 bg-[#d9b45c]/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay_at_hotel"
                        checked={
                          booking.paymentMethod ===
                          "pay_at_hotel"
                        }
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div className="flex items-start gap-4">

                        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                          <Banknote
                            size={21}
                            className="text-[#d9b45c]"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">

                            <h4 className="font-semibold">
                              Pay at Hotel
                            </h4>

                            {booking.paymentMethod ===
                              "pay_at_hotel" && (
                              <CheckCircle2
                                size={18}
                                className="text-[#d9b45c]"
                              />
                            )}
                          </div>

                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Reserve now and pay directly at the property during check-in.
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* PAY NOW */}

                    <label
                      className={`relative cursor-pointer rounded-2xl border p-5 transition ${
                        booking.paymentMethod ===
                        "pay_now"
                          ? "border-[#d9b45c]/70 bg-[#d9b45c]/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay_now"
                        checked={
                          booking.paymentMethod ===
                          "pay_now"
                        }
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div className="flex items-start gap-4">

                        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                          <CreditCard
                            size={21}
                            className="text-[#d9b45c]"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">

                            <h4 className="font-semibold">
                              Pay Now
                            </h4>

                            {booking.paymentMethod ===
                              "pay_now" && (
                              <CheckCircle2
                                size={18}
                                className="text-[#d9b45c]"
                              />
                            )}
                          </div>

                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Continue to secure online payment after submitting your booking.
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Payment note */}

                  <div className="mt-4 rounded-xl bg-blue-500/5 border border-blue-400/10 p-4 flex gap-3">

                    <WalletCards
                      size={18}
                      className="text-blue-400 shrink-0"
                    />

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Online payment processing will be handled
                      securely through the TripDaoBD payment system.
                      Your booking will remain pending until payment
                      and/or property confirmation is completed.
                    </p>
                  </div>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    nights <= 0
                  }
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading ||
                    nights <= 0
                      ? "bg-white/10 text-slate-500 cursor-not-allowed"
                      : "bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817]"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#071817]/30 border-t-[#071817] rounded-full animate-spin" />
                      Processing Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={19} />
                      Confirm Booking
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* =====================================================
              SUMMARY
          ====================================================== */}

          <div className="lg:sticky lg:top-28">

            <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-7 shadow-xl">

              <h2 className="text-2xl font-semibold">
                Booking Summary
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Your booking cost updates automatically.
              </p>

              {/* Destination */}

              <div className="mt-6 rounded-2xl overflow-hidden border border-white/5">

                <img
                  src="https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=900&q=80"
                  alt="Cox's Bazar"
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={15}
                      className="text-[#d9b45c]"
                    />

                    <h3 className="font-semibold">
                      Cox's Bazar Retreat
                    </h3>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    Cox's Bazar, Bangladesh
                  </p>

                </div>
              </div>

              {/* Stay Information */}

              <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Stay
                  </span>

                  <span>
                    {nights > 0
                      ? `${nights} ${
                          nights === 1
                            ? "night"
                            : "nights"
                        }`
                      : "Select dates"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Guests
                  </span>

                  <span>
                    {booking.guests}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Rooms
                  </span>

                  <span>
                    {booking.rooms}
                  </span>
                </div>

              </div>

              {/* Price */}

              <div className="space-y-4 mt-7">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Room Price
                  </span>

                  <span>
                    {formatPrice(
                      priceDetails.roomSubtotal
                    )}
                  </span>
                </div>

                <p className="text-xs text-slate-600 -mt-2">
                  {formatPrice(
                    ROOM_PRICE_PER_NIGHT
                  )}{" "}
                  × {booking.rooms} room
                  {booking.rooms > 1
                    ? "s"
                    : ""}{" "}
                  × {nights} night
                  {nights !== 1
                    ? "s"
                    : ""}
                </p>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Service Fee
                  </span>

                  <span>
                    {formatPrice(
                      priceDetails.serviceFee
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    VAT
                  </span>

                  <span>
                    {formatPrice(
                      priceDetails.vat
                    )}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#d9b45c]">
                    {formatPrice(
                      priceDetails.total
                    )}
                  </span>

                </div>

              </div>

              {/* Payment Status */}

              <div className="mt-6 rounded-xl border border-[#d9b45c]/10 bg-[#d9b45c]/5 p-4">

                <div className="flex items-center gap-3">

                  {booking.paymentMethod ===
                  "pay_now" ? (
                    <CreditCard
                      size={19}
                      className="text-[#d9b45c]"
                    />
                  ) : (
                    <Banknote
                      size={19}
                      className="text-[#d9b45c]"
                    />
                  )}

                  <div>
                    <p className="text-sm font-medium">
                      {booking.paymentMethod ===
                      "pay_now"
                        ? "Online Payment"
                        : "Pay at Hotel"}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {booking.paymentMethod ===
                      "pay_now"
                        ? "Payment will continue after booking."
                        : "Payment due at check-in."}
                    </p>
                  </div>

                </div>
              </div>

              {/* Secure */}

              <div className="mt-5 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex gap-3">

                <ShieldCheck
                  size={20}
                  className="text-emerald-400 shrink-0"
                />

                <div>
                  <p className="text-sm font-medium text-emerald-400">
                    Secure Booking
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your booking information is securely
                    transmitted to TripDaoBD.
                  </p>
                </div>

              </div>

              {/* Cancellation */}

              <div className="mt-5 flex gap-3 text-xs text-slate-500">

                <Clock3
                  size={16}
                  className="shrink-0"
                />

                <p>
                  Booking confirmation and cancellation
                  policies may vary by property.
                </p>

              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Booking;