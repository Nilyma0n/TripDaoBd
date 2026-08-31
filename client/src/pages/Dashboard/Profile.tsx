import { useState } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Save,
  X,
  Edit3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const API_URL = "http://localhost:5000/api";

const Profile = () => {
  const { user, token: storedToken, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState(
    user?.full_name || ""
  );

  const [phone, setPhone] = useState(
    user?.phone || ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ------------------------------------------
  // UPDATE PROFILE
  // ------------------------------------------

  const handleUpdateProfile = async () => {
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!storedToken) {
      setError("Please login again.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            full_name: fullName.trim(),
            phone: phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile."
        );
      }

      // updateUser() updates context state AND syncs storage in one call
      updateUser(data.user);

      setFullName(data.user.full_name || "");
      setPhone(data.user.phone || "");

      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // USER NOT FOUND
  // ------------------------------------------

  if (!user) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="bg-[#0d2523] border border-white/10 rounded-3xl p-10 text-center max-w-lg w-full">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-5">
            <AlertCircle
              size={30}
              className="text-red-400"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">
            User information not found
          </h1>

          <p className="text-slate-400 mt-3">
            Please login again to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* =========================================
          PROFILE HEADER
      ========================================= */}

      <section className="relative overflow-hidden rounded-3xl border border-[#c9a34e]/20 bg-gradient-to-r from-[#163d35] via-[#0d302c] to-[#0a2422] p-8 md:p-10">

        {/* Decorative background */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#c9a34e]/5 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-7">

          {/* User information */}

          <div className="flex items-center gap-6">

            {/* Profile image */}

            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#c9a34e]/50 bg-[#16332f] flex items-center justify-center shrink-0">

              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-[#d9b45c]">
                  {user.full_name
                    ?.charAt(0)
                    .toUpperCase() || "U"}
                </span>
              )}

            </div>

            <div>

              <p className="text-[#d6ae52] text-sm font-medium mb-1">
                Your Profile
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {user.full_name || "Traveler"}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-slate-400">
                <Mail size={15} />
                <span className="text-sm">
                  {user.email}
                </span>
              </div>

            </div>

          </div>

          {/* Edit button */}

          {!editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setMessage("");
                setError("");
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold text-sm transition"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>
          )}

        </div>
      </section>


      {/* =========================================
          SUCCESS MESSAGE
      ========================================= */}

      {message && (
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4">
          <CheckCircle2 size={20} />

          <p className="text-sm">
            {message}
          </p>
        </div>
      )}


      {/* =========================================
          ERROR MESSAGE
      ========================================= */}

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4">
          <AlertCircle size={20} />

          <p className="text-sm">
            {error}
          </p>
        </div>
      )}


      {/* =========================================
          PERSONAL INFORMATION
      ========================================= */}

      <section className="bg-[#0d2523] border border-white/5 rounded-3xl p-7 md:p-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">
            <UserIcon
              size={21}
              className="text-[#d9b45c]"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage your personal account details
            </p>
          </div>

        </div>


        <div className="grid md:grid-cols-2 gap-6">

          {/* Full Name */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <UserIcon size={15} />
              Full Name
            </label>

            {editing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full bg-[#081c1b] border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-[#c9a34e]/60 focus:ring-1 focus:ring-[#c9a34e]/30 transition"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="w-full bg-[#081c1b] border border-white/5 text-white rounded-xl px-4 py-3.5">
                {user.full_name || "Not provided"}
              </div>
            )}
          </div>


          {/* Email */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <Mail size={15} />
              Email
            </label>

            <div className="w-full bg-[#081c1b]/70 border border-white/5 text-slate-400 rounded-xl px-4 py-3.5">
              {user.email}
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Email cannot be changed here.
            </p>
          </div>


          {/* Phone */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <Phone size={15} />
              Phone
            </label>

            {editing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="+8801XXXXXXXXX"
                className="w-full bg-[#081c1b] border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-[#c9a34e]/60 focus:ring-1 focus:ring-[#c9a34e]/30 transition"
              />
            ) : (
              <div className="w-full bg-[#081c1b] border border-white/5 text-white rounded-xl px-4 py-3.5">
                {user.phone || "Not provided"}
              </div>
            )}
          </div>


          {/* Account Type */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <ShieldCheck size={15} />
              Account Type
            </label>

            <div className="w-full bg-[#081c1b]/70 border border-white/5 text-slate-300 rounded-xl px-4 py-3.5 capitalize">
              {user.role || "user"}
            </div>
          </div>


          {/* Account Status */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <CheckCircle2 size={15} />
              Account Status
            </label>

            <div className="w-full bg-[#081c1b] border border-white/5 rounded-xl px-4 py-3.5">

              {user.is_verified ? (
                <span className="inline-flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 size={17} />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-[#d9b45c] font-medium">
                  <AlertCircle size={17} />
                  Not Verified
                </span>
              )}

            </div>
          </div>


          {/* User ID */}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
              <CalendarDays size={15} />
              User ID
            </label>

            <div className="w-full bg-[#081c1b]/70 border border-white/5 text-slate-400 rounded-xl px-4 py-3.5">
              #{user.id}
            </div>
          </div>

        </div>


        {/* SAVE / CANCEL */}

        {editing && (
          <div className="flex flex-wrap gap-3 mt-8 pt-7 border-t border-white/5">

            <button
              type="button"
              onClick={handleUpdateProfile}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] disabled:opacity-50 disabled:cursor-not-allowed text-[#071817] px-7 py-3 rounded-xl font-semibold text-sm transition"
            >
              <Save size={17} />

              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>


            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFullName(user.full_name || "");
                setPhone(user.phone || "");
                setError("");
                setMessage("");
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-7 py-3 rounded-xl font-semibold text-sm transition"
            >
              <X size={17} />
              Cancel
            </button>

          </div>
        )}

      </section>


      {/* =========================================
          ACCOUNT INFORMATION
      ========================================= */}

      <section className="bg-[#0d2523] border border-white/5 rounded-3xl p-7 md:p-8">

        <div className="flex items-center gap-4 mb-7">

          <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">
            <ShieldCheck
              size={21}
              className="text-[#d9b45c]"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Account Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Overview of your TripDaoBD account
            </p>
          </div>

        </div>


        <div className="space-y-0">

          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <span className="text-slate-500">
              Account ID
            </span>

            <span className="font-semibold text-white">
              #{user.id}
            </span>
          </div>


          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <span className="text-slate-500">
              Account Role
            </span>

            <span className="font-semibold text-white capitalize">
              {user.role || "user"}
            </span>
          </div>


          <div className="flex items-center justify-between py-4">
            <span className="text-slate-500">
              Email Status
            </span>

            {user.is_verified ? (
              <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 size={17} />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-[#d9b45c] font-semibold">
                <AlertCircle size={17} />
                Pending
              </span>
            )}
          </div>

        </div>

      </section>

    </div>
  );
};

export default Profile;