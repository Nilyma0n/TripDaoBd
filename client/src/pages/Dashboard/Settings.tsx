import {
  Lock,
  ShieldCheck,
  Bell,
  CreditCard,
  UserRound,
  ChevronRight,
  Trash2,
  LogOut,
  CheckCircle2,
  LifeBuoy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="space-y-8 pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <p className="text-[#d6ae52] text-sm mb-2">
          Account
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Account Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account preferences, security and payment options.
        </p>
      </section>


      {/* =====================================================
          SETTINGS CONTAINER
      ===================================================== */}

      <section className="grid lg:grid-cols-3 gap-6">

        {/* ===================================================
            LEFT / MAIN SETTINGS
        =================================================== */}

        <div className="lg:col-span-2 space-y-6">


          {/* =================================================
              GENERAL SETTINGS
          ================================================= */}

          <div className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">

            <div className="p-6 border-b border-white/5">

              <h2 className="text-xl font-semibold">
                General Settings
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Manage your basic account preferences.
              </p>

            </div>


            <div className="divide-y divide-white/5">


              {/* =================================================
                  PROFILE INFORMATION
              ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/dashboard/profile")}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.03] transition text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                    <UserRound
                      size={20}
                      className="text-[#d9b45c]"
                    />

                  </div>


                  <div>

                    <h3 className="font-medium">
                      Profile Information
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Update your personal information
                    </p>

                  </div>

                </div>


                <ChevronRight
                  size={19}
                  className="text-slate-500"
                />

              </button>


              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/dashboard/notifications")}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.03] transition text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">

                    <Bell
                      size={20}
                      className="text-blue-400"
                    />

                  </div>


                  <div>

                    <h3 className="font-medium">
                      Notifications
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Manage travel and booking notifications
                    </p>

                  </div>

                </div>


                <ChevronRight
                  size={19}
                  className="text-slate-500"
                />

              </button>


              {/* =================================================
                  PAYMENT METHODS
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/payment-methods")
                }
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.03] transition text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                    <CreditCard
                      size={20}
                      className="text-emerald-400"
                    />

                  </div>


                  <div>

                    <h3 className="font-medium">
                      Payment Methods
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Manage your saved payment methods
                    </p>

                  </div>

                </div>


                <ChevronRight
                  size={19}
                  className="text-slate-500"
                />

              </button>

            </div>

          </div>


          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">


            {/* SECURITY HEADER */}

            <div className="p-6 border-b border-white/5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                  <ShieldCheck
                    size={20}
                    className="text-[#d9b45c]"
                  />

                </div>


                <div>

                  <h2 className="text-xl font-semibold">
                    Security
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Keep your account secure.
                  </p>

                </div>

              </div>

            </div>


            <div className="p-6 space-y-4">


              {/* =================================================
                  CHANGE PASSWORD
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/change-password")
                }
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">

                    <Lock
                      size={18}
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


                <div className="flex items-center gap-2">

                  <span className="text-sm text-[#d9b45c]">
                    Change
                  </span>

                  <ChevronRight
                    size={18}
                    className="text-slate-500"
                  />

                </div>

              </button>


              {/* =================================================
                  ACCOUNT SECURITY
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/security")
                }
                className="w-full flex items-center justify-between p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition text-left"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">

                    <ShieldCheck
                      size={18}
                      className="text-emerald-400"
                    />

                  </div>


                  <div>

                    <h3 className="font-medium">
                      Account Security
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Manage your account security
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={21}
                    className="text-emerald-400"
                  />

                  <ChevronRight
                    size={18}
                    className="text-slate-500"
                  />

                </div>

              </button>

            </div>

          </div>


          {/* =================================================
              DANGER ZONE
          ================================================= */}

          <div className="bg-[#0d2523] border border-red-500/10 rounded-2xl overflow-hidden">

            <div className="p-6 border-b border-red-500/10">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">

                  <Trash2
                    size={20}
                    className="text-red-400"
                  />

                </div>


                <div>

                  <h2 className="text-xl font-semibold text-red-300">
                    Danger Zone
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Irreversible account actions.
                  </p>

                </div>

              </div>

            </div>


            <div className="p-6">

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/delete-account")
                }
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-xl hover:bg-red-500/[0.03] transition text-left"
              >

                <div>

                  <h3 className="font-medium">
                    Delete Account
                  </h3>

                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    Permanently delete your account and all associated
                    travel data. This action cannot be undone.
                  </p>

                </div>


                <div className="flex items-center gap-2 text-red-400 whitespace-nowrap">

                  <span className="text-sm font-medium">
                    Manage
                  </span>

                  <ChevronRight size={18} />

                </div>

              </button>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <div className="space-y-6">


          {/* =================================================
              ACCOUNT STATUS
          ================================================= */}

          <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                <ShieldCheck
                  size={24}
                  className="text-emerald-400"
                />

              </div>


              <div>

                <h3 className="font-semibold">
                  Account Status
                </h3>

                <p className="text-sm text-emerald-400 mt-1">
                  Active
                </p>

              </div>

            </div>


            <div className="mt-6 pt-5 border-t border-white/5">

              <div className="flex justify-between text-sm">

                <span className="text-slate-500">
                  Security
                </span>

                <span className="text-emerald-400">
                  Good
                </span>

              </div>


              <div className="flex justify-between text-sm mt-4">

                <span className="text-slate-500">
                  Verification
                </span>

                <span className="text-[#d9b45c]">
                  Verified
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              LOGOUT CARD
          ================================================= */}

          <div className="relative overflow-hidden bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-2xl p-6">

            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#c9a34e]/5" />


            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

                <LogOut
                  size={21}
                  className="text-[#d9b45c]"
                />

              </div>


              <h3 className="font-semibold mt-5">
                Need to leave?
              </h3>


              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Sign out of your TripDaoBD account from this device.
              </p>


              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 w-full border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white py-3 rounded-xl text-sm font-medium transition"
              >
                Sign Out
              </button>

            </div>

          </div>


          {/* =================================================
              HELP / SUPPORT
          ================================================= */}

          <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-6">

            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <LifeBuoy
                size={20}
                className="text-blue-400"
              />

            </div>


            <p className="text-[#d9b45c] text-xs uppercase tracking-widest mt-5">
              Need Help?
            </p>


            <h3 className="font-semibold mt-2">
              We're here for you.
            </h3>


            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              If you're having trouble with your account or bookings,
              our support team can help.
            </p>


            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/support")
              }
              className="mt-5 flex items-center gap-1 text-sm text-[#d9b45c] hover:text-[#e3be67] font-medium transition"
            >
              Contact Support

              <ChevronRight size={16} />

            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Settings;