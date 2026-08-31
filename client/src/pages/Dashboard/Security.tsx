import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  KeyRound,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="space-y-8 pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>

        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </button>

        <p className="text-[#d6ae52] text-sm mb-2">
          Account
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Security
        </h1>

        <p className="text-slate-400 mt-2 max-w-2xl">
          Manage your TripDaoBD account security and protect your
          personal information.
        </p>

      </section>


      {/* =====================================================
          SECURITY STATUS
      ===================================================== */}

      <section className="bg-[#0d2523] border border-emerald-500/10 rounded-2xl p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">

              <ShieldCheck
                size={24}
                className="text-emerald-400"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Account Security
              </h2>

              <p className="text-sm text-emerald-400 mt-1">
                Your account is currently protected
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 text-emerald-400 text-sm">

            <CheckCircle2 size={18} />

            Good

          </div>

        </div>

      </section>


      {/* =====================================================
          SECURITY SETTINGS
      ===================================================== */}

      <section className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">

        <div className="p-6 border-b border-white/5">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

              <Lock
                size={20}
                className="text-[#d9b45c]"
              />

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Security Settings
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Control how your account is protected.
              </p>

            </div>

          </div>

        </div>


        <div className="divide-y divide-white/5">


          {/* =================================================
              PASSWORD
          ================================================= */}

          <button
            type="button"
            onClick={() => navigate("/dashboard/change-password")}
            className="w-full flex items-center justify-between p-6 hover:bg-white/[0.03] transition text-left"
          >

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">

                <KeyRound
                  size={20}
                  className="text-purple-400"
                />

              </div>

              <div>

                <h3 className="font-medium">
                  Password
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Change your account password
                </p>

              </div>

            </div>

            <ChevronRight
              size={19}
              className="text-slate-500"
            />

          </button>


          {/* =================================================
              EMAIL SECURITY
          ================================================= */}

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">

                <Mail
                  size={20}
                  className="text-blue-400"
                />

              </div>

              <div>

                <h3 className="font-medium">
                  Email Verification
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your account email is verified.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-emerald-400 text-sm">

              <CheckCircle2 size={17} />

              Verified

            </div>

          </div>


          {/* =================================================
              TWO FACTOR AUTHENTICATION
          ================================================= */}

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                <Smartphone
                  size={20}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <h3 className="font-medium">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-slate-500 mt-1 max-w-lg">
                  Add an extra layer of protection when signing
                  into your account.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                setTwoFactorEnabled(!twoFactorEnabled)
              }
              className={`relative w-12 h-6 rounded-full transition ${
                twoFactorEnabled
                  ? "bg-emerald-500"
                  : "bg-slate-700"
              }`}
              aria-label="Toggle two-factor authentication"
            >

              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                  twoFactorEnabled
                    ? "left-7"
                    : "left-1"
                }`}
              />

            </button>

          </div>


          {/* =================================================
              LOGIN ALERTS
          ================================================= */}

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                <AlertCircle
                  size={20}
                  className="text-[#d9b45c]"
                />

              </div>

              <div>

                <h3 className="font-medium">
                  Login Alerts
                </h3>

                <p className="text-sm text-slate-500 mt-1 max-w-lg">
                  Receive notifications when a new device signs
                  into your account.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                setLoginAlerts(!loginAlerts)
              }
              className={`relative w-12 h-6 rounded-full transition ${
                loginAlerts
                  ? "bg-[#d6ae52]"
                  : "bg-slate-700"
              }`}
              aria-label="Toggle login alerts"
            >

              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                  loginAlerts
                    ? "left-7"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACTIVE SECURITY FEATURES
      ===================================================== */}

      <section className="bg-[#0d2523] border border-white/5 rounded-2xl p-6">

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            Security Overview
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Current security protection on your account.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-4">


          {/* PASSWORD */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">

              <Lock
                size={19}
                className="text-purple-400"
              />

            </div>

            <h3 className="font-medium">
              Password Protection
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Your account is protected with a password.
            </p>

            <span className="inline-flex items-center gap-1 mt-4 text-xs text-emerald-400">

              <CheckCircle2 size={14} />

              Active

            </span>

          </div>


          {/* EMAIL */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">

              <Mail
                size={19}
                className="text-blue-400"
              />

            </div>

            <h3 className="font-medium">
              Email Verification
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Your email verification is active.
            </p>

            <span className="inline-flex items-center gap-1 mt-4 text-xs text-emerald-400">

              <CheckCircle2 size={14} />

              Verified

            </span>

          </div>


          {/* LOGIN ALERT */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-[#c9a34e]/10 flex items-center justify-center mb-4">

              <AlertCircle
                size={19}
                className="text-[#d9b45c]"
              />

            </div>

            <h3 className="font-medium">
              Login Alerts
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Get notified about new account logins.
            </p>

            <span
              className={`inline-flex items-center gap-1 mt-4 text-xs ${
                loginAlerts
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >

              {loginAlerts ? (
                <>
                  <CheckCircle2 size={14} />
                  Enabled
                </>
              ) : (
                "Disabled"
              )}

            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          SECURITY NOTICE
      ===================================================== */}

      <section className="bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center shrink-0">

            <ShieldCheck
              size={21}
              className="text-[#d9b45c]"
            />

          </div>

          <div>

            <h3 className="font-semibold">
              Keep Your Account Secure
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Never share your password or verification codes
              with anyone. Use a strong password and review
              your account activity regularly.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Security;