import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Compass,
  Check,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const API_URL = "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }

      /*
       * Save the session (storage + in-memory context) in one call.
       * Every component reading useAuth() updates immediately —
       * no reload needed for the navbar, dashboard, etc.
       */
      login(data.user, data.token, rememberMe);

      /*
       * Go to dashboard after successful login.
       */
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0d2421] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl min-h-[680px] bg-[#123a34] rounded-[32px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE — TRAVEL IMAGE
        ====================================================== */}
        <div className="relative hidden lg:block min-h-[680px]">

          <img
            src="/auth-travel.jpg"
            alt="Beautiful Bangladesh travel destination"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071b18] via-[#0d2421]/50 to-transparent" />

          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center gap-3 text-white">
            <div className="w-11 h-11 rounded-full border border-[#d4b36a]/70 flex items-center justify-center">
              <Compass size={24} className="text-[#d4b36a]" />
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

          {/* Bottom content */}
          <div className="absolute bottom-10 left-8 right-8 text-white">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-[#d4b36a]" />
              Travel beyond ordinary
            </div>

            <h2 className="text-4xl xl:text-5xl font-semibold leading-tight">
              Your next
              <br />
              <span className="text-[#d4b36a]">
                journey awaits.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-white/75 leading-relaxed">
              Discover hidden destinations, unforgettable experiences,
              beautiful stays and the stories that make Bangladesh special.
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE — LOGIN FORM
        ====================================================== */}
        <div className="bg-[#123a34] text-white flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-11 h-11 rounded-full border border-[#d4b36a]/70 flex items-center justify-center">
                <Compass size={24} className="text-[#d4b36a]" />
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
            <div className="mb-8">

              <p className="text-[#d4b36a] text-sm font-medium uppercase tracking-[0.2em]">
                Welcome back
              </p>

              <h2 className="text-4xl font-semibold mt-3">
                Sign in to
                <br />
                <span className="text-[#d4b36a]">
                  your journey.
                </span>
              </h2>

              <p className="text-white/55 mt-4">
                Continue exploring Bangladesh with TripDaoBD.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full h-14 rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full h-14 rounded-xl border border-white/20 bg-white/5 pl-12 pr-12 text-white placeholder:text-white/30 outline-none transition focus:border-[#d4b36a] focus:ring-1 focus:ring-[#d4b36a]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-4">

                <label className="flex items-center gap-2 cursor-pointer text-sm text-white/60">

                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                      rememberMe
                        ? "bg-[#d4b36a] border-[#d4b36a]"
                        : "border-white/30"
                    }`}
                  >
                    {rememberMe && (
                      <Check
                        size={14}
                        className="text-[#123a34]"
                      />
                    )}
                  </span>

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="sr-only"
                  />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-[#d4b36a] hover:text-[#e2c889] transition"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-[#d4b36a] text-[#123a34] font-semibold flex items-center justify-center gap-3 hover:bg-[#e2c889] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-black/10"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

            </form>

            {/* Register */}
            <div className="mt-8 text-center">

              <p className="text-sm text-white/50">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="inline-block mt-2 text-[#d4b36a] font-semibold hover:text-[#e2c889] transition"
              >
                Create your account
              </Link>

            </div>

            {/* Back Home */}
            <div className="mt-8 text-center">

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

export default Login;