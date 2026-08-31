import {
  ArrowLeft,
  AlertTriangle,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    alert(
      "Account deletion will be connected to the backend when the authentication system is ready."
    );
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

        <p className="text-red-400 text-sm mb-2">
          Account
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Delete Account
        </h1>

        <p className="text-slate-400 mt-2 max-w-2xl">
          Permanently remove your TripDaoBD account and associated
          account information.
        </p>
      </section>

      {/* WARNING */}
      <section className="bg-[#0d2523] border border-red-500/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-red-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle
                size={24}
                className="text-red-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-red-300">
                This action is permanent
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Please make sure you understand what will happen.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* INFORMATION */}
          <div className="p-5 rounded-xl bg-red-500/[0.03] border border-red-500/10">
            <div className="flex items-start gap-4">
              <ShieldAlert
                size={21}
                className="text-red-400 mt-0.5 shrink-0"
              />

              <div>
                <h3 className="font-medium">
                  What will be affected?
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-slate-500">
                  <li>• Your account profile information</li>
                  <li>• Saved destinations and wishlist items</li>
                  <li>• Saved payment preferences</li>
                  <li>• Account settings and preferences</li>
                </ul>
              </div>
            </div>
          </div>

          {/* NOTICE */}
          <div className="text-sm text-slate-500 leading-relaxed">
            <p>
              Your account will only be permanently deleted after
              confirmation. This feature is currently prepared for
              backend integration.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard/settings")}
              className="px-5 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition font-medium"
            >
              Keep My Account
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition font-medium"
            >
              <Trash2 size={17} />
              Delete My Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeleteAccount;