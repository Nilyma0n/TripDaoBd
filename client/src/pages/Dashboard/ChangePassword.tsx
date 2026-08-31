import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    // Backend connection can be added here later.
    setMessage("Password updated successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8 pb-8">

      {/* HEADER */}
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
          Change Password
        </h1>

        <p className="text-slate-400 mt-2">
          Update your password to keep your TripDaoBD account secure.
        </p>
      </section>

      {/* CONTENT */}
      <section className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="lg:col-span-2">
          <div className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">

            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Lock
                    size={21}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Update Password
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Enter your current password and choose a new one.
                  </p>
                </div>

              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6"
            >

              {/* CURRENT PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    placeholder="Enter your current password"
                    className="w-full bg-[#081b19] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/50 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(!showCurrent)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  >
                    {showCurrent ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter your new password"
                    className="w-full bg-[#081b19] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/50 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  >
                    {showNew ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Use at least 8 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your new password"
                    className="w-full bg-[#081b19] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/50 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  >
                    {showConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* MESSAGE */}
              {message && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  <CheckCircle2 size={18} />
                  {message}
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="submit"
                  className="flex-1 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] py-3 rounded-xl font-semibold transition"
                >
                  Update Password
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/settings")
                  }
                  className="sm:w-32 border border-white/10 hover:bg-white/5 text-slate-300 py-3 rounded-xl font-medium transition"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        </div>

        {/* SECURITY SIDEBAR */}
        <div>
          <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-6">

            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck
                size={21}
                className="text-emerald-400"
              />
            </div>

            <h3 className="font-semibold mt-5">
              Password Security
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              A strong password helps protect your account,
              bookings and personal information.
            </p>

            <div className="mt-6 space-y-3 text-sm">

              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                At least 8 characters
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Avoid easily guessed passwords
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Don't reuse old passwords
              </div>

            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ChangePassword;