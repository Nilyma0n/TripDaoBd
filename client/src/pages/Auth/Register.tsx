import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Compass,
  CheckCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          throw new Error(data.errors[0].msg);
        }

        throw new Error(
          data.message ||
            "Registration failed. Please try again."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0d2421] flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-6xl min-h-[720px] bg-[#123a34] rounded-[32px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div className="relative hidden lg:block min-h-[720px]">

          <img
            src="/auth-travel.jpg"
            alt="Beautiful Bangladesh travel destination"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#071b18] via-[#0d2421]/50 to-transparent" />

          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center gap-3 text-white">

            <div className="w-11 h-11 rounded-full border border-[#d4b36a]/70 flex items-center justify-center">
              <Compass
                size={24}
                className="text-[#d4b36a]"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-wide">
                TripDaoBD
              </h1>

              <p className="text-xs text-white/60">
                Discover Bangladesh
              </p>
            </div>

          </div>

          {/* Bottom */}
          <div className="absolute bottom-10 left-8 right-8 text-white">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm mb-5">

              <span className="w-2 h-2 rounded-full bg-[#d4b36a]" />

              Start your adventure

            </div>

            <h2 className="text-4xl xl:text-5xl font-semibold leading-tight">
              Explore more.
              <br />

              <span className="text-[#d4b36a]">
                Experience more.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-white/75 leading-relaxed">
              Create your TripDaoBD account and discover
              destinations, stays, experiences and journeys
              across Bangladesh.
            </p>

          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="bg-[#123a34] text-white flex items-center justify-center p-6 sm:p-10 lg:p-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-full border border-[#d4b36a]/70 flex items-center justify-center">

                <Compass
                  size={24}
                  className="text-[#d4b36a]"
                />

              </div>

              <div>

                <h1 className="text-xl font-bold">
                  TripDaoBD
                </h1>

                <p className="text-xs text-white/50">
                  Discover Bangladesh
                </p>

              </div>

            </div>

            {/* Heading */}
            <div className="mb-7">

              <p className="text-[#d4b36a] text-sm font-medium uppercase tracking-[0.2em]">
                Begin your journey
              </p>

              <h2 className="text-4xl font-semibold mt-3">
                Create your
                <br />

                <span className="text-[#d4b36a]">
                  TripDaoBD account.
                </span>
              </h2>

              <p className="text-white/55 mt-4">
                Join thousands of travelers discovering
                Bangladesh.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200 flex items-start gap-3">

                <CheckCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                {success}

              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >

              {/* Full Name */}
              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="w-full h-13 rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                </div>
              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full h-13 rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Phone Number
                  <span className="text-white/35 ml-1">
                    (optional)
                  </span>
                </label>

                <div className="relative">

                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="+880 1XXXXXXXXX"
                    autoComplete="tel"
                    className="w-full h-13 rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full h-13 rounded-xl border border-white/20 bg-white/5 pl-12 pr-12 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#d4b36a] transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <p className="text-xs text-white/35 mt-2">
                  Minimum 6 characters
                </p>

              </div>

              {/* Confirm Password */}
              <div>

                <label className="block text-sm font-medium text-white/75 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    className="w-full h-13 rounded-xl border border-white/20 bg-white/5 pl-12 pr-12 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#d4b36a] transition"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Create Account */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-2 rounded-xl bg-[#d4b36a] text-[#123a34] font-semibold flex items-center justify-center gap-3 hover:bg-[#e2c889] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 text-center">

              <p className="text-sm text-white/50">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="inline-block mt-2 text-[#d4b36a] font-semibold hover:text-[#e2c889] transition"
              >
                Sign in
              </Link>

            </div>

            {/* Home */}
            <div className="mt-6 text-center">

              <Link
                to="/"
                className="text-sm text-white/40 hover:text-white transition"
              >
                ← Back to TripDaoBD
              </Link>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;