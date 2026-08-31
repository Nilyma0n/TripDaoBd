import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  Lock,
  Plus,
  ShieldCheck,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const API_URL = "http://localhost:5000/api";

interface PaymentMethod {
  id: number;
  method_type: "bkash" | "nagad" | "card" | "bank";
  account_name: string;
  account_number?: string | null;
  provider?: string | null;
  is_default: number | boolean;
  created_at?: string;
}

interface AddPaymentMethodForm {
  method_type: "bkash" | "nagad" | "card" | "bank";
  account_name: string;
  account_number: string;
  provider: string;
  is_default: boolean;
}

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethod[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] =
    useState<AddPaymentMethodForm>({
      method_type: "bkash",
      account_name: "",
      account_number: "",
      provider: "bKash",
      is_default: false,
    });

  // =====================================================
  // FETCH PAYMENT METHODS
  // =====================================================

  const fetchPaymentMethods = useCallback(
    async () => {
      if (!token) {
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${API_URL}/payment-methods`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load payment methods."
          );
        }

        setPaymentMethods(
          Array.isArray(data.paymentMethods)
            ? data.paymentMethods
            : []
        );
      } catch (error) {
        console.error(
          "Fetch Payment Methods Error:",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load payment methods."
        );
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // =====================================================
  // LOAD PAYMENT METHODS
  // =====================================================

  useEffect(() => {
    if (!token) return;

    const timeoutId = window.setTimeout(() => {
      void fetchPaymentMethods();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [token, fetchPaymentMethods]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (
        e.target as HTMLInputElement
      ).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // =====================================================
  // PAYMENT METHOD CHANGE
  // =====================================================

  const handleMethodTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const methodType =
      e.target.value as AddPaymentMethodForm["method_type"];

    let provider = "";

    if (methodType === "bkash") {
      provider = "bKash";
    } else if (methodType === "nagad") {
      provider = "Nagad";
    } else if (methodType === "card") {
      provider = "Card";
    } else if (methodType === "bank") {
      provider = "Bank";
    }

    setForm((prev) => ({
      ...prev,
      method_type: methodType,
      provider,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setForm({
      method_type: "bkash",
      account_name: "",
      account_number: "",
      provider: "bKash",
      is_default: false,
    });

    setShowAddForm(false);
  };

  // =====================================================
  // ADD PAYMENT METHOD
  // =====================================================

  const handleAddPaymentMethod = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage(
        "Please login before managing payment methods."
      );
      navigate("/login");
      return;
    }

    if (
      !form.account_name.trim() ||
      !form.account_number.trim()
    ) {
      setErrorMessage(
        "Please provide account name and account number."
      );
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/payment-methods`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            method_type: form.method_type,
            account_name:
              form.account_name.trim(),
            account_number:
              form.account_number.trim(),
            provider:
              form.provider.trim() || null,
            is_default: form.is_default,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to add payment method."
        );
      }

      setSuccessMessage(
        "Payment method added successfully."
      );

      resetForm();

      await fetchPaymentMethods();
    } catch (error) {
      console.error(
        "Add Payment Method Error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to add payment method."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // SET DEFAULT
  // =====================================================

  const handleSetDefault = async (
    id: number
  ) => {
    if (!token) {
      setErrorMessage(
        "Please login before managing payment methods."
      );
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/payment-methods/${id}/default`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update default payment method."
        );
      }

      setSuccessMessage(
        "Default payment method updated successfully."
      );

      await fetchPaymentMethods();
    } catch (error) {
      console.error(
        "Set Default Payment Method Error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to update default payment method."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // DELETE PAYMENT METHOD
  // =====================================================

  const handleRemove = async (id: number) => {
    if (!token) {
      setErrorMessage(
        "Please login before managing payment methods."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove this payment method?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/payment-methods/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete payment method."
        );
      }

      setSuccessMessage(
        "Payment method deleted successfully."
      );

      await fetchPaymentMethods();
    } catch (error) {
      console.error(
        "Delete Payment Method Error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete payment method."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // ICON
  // =====================================================

  const getIcon = (
    type: PaymentMethod["method_type"]
  ) => {
    if (type === "card") {
      return (
        <CreditCard
          size={22}
          className="text-[#d9b45c]"
        />
      );
    }

    if (
      type === "bkash" ||
      type === "nagad"
    ) {
      return (
        <WalletCards
          size={22}
          className="text-blue-400"
        />
      );
    }

    return (
      <Banknote
        size={22}
        className="text-emerald-400"
      />
    );
  };

  // =====================================================
  // METHOD NAME
  // =====================================================

  const getMethodName = (
    method: PaymentMethod
  ) => {
    if (method.method_type === "bkash") {
      return "bKash";
    }

    if (method.method_type === "nagad") {
      return "Nagad";
    }

    if (method.method_type === "card") {
      return "Card Payment";
    }

    return "Bank Account";
  };

  // =====================================================
  // DISPLAY DETAILS
  // =====================================================

  const getDetails = (
    method: PaymentMethod
  ) => {
    const provider =
      method.provider
        ? `${method.provider} • `
        : "";

    const accountNumber =
      method.account_number || "Account details unavailable";

    return `${provider}${accountNumber}`;
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading && token) {
    return (
      <div className="space-y-8 pb-8">
        <section>
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/settings")
            }
            className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-6"
          >
            <ArrowLeft size={18} />
            Back to Settings
          </button>

          <p className="text-[#d6ae52] text-sm mb-2">
            Account
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Payment Methods
          </h1>

          <p className="text-slate-400 mt-2">
            Loading your saved payment methods...
          </p>
        </section>

        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-12 flex justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-5 h-5 border-2 border-[#d9b45c]/30 border-t-[#d9b45c] rounded-full animate-spin" />
            Loading payment methods...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section>
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/settings")
          }
          className="flex items-center gap-2 text-slate-400 hover:text-[#d9b45c] transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Settings
        </button>

        <p className="text-[#d6ae52] text-sm mb-2">
          Account
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Payment Methods
        </h1>

        <p className="text-slate-400 mt-2 max-w-2xl">
          Manage your saved payment methods for
          TripDaoBD bookings.
        </p>
      </section>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {successMessage && (
        <section className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2
            size={20}
            className="text-emerald-400 shrink-0"
          />

          <p className="text-sm text-emerald-300">
            {successMessage}
          </p>
        </section>
      )}

      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}

      {errorMessage && (
        <section className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3">
          <X
            size={20}
            className="text-red-400 shrink-0"
          />

          <p className="text-sm text-red-300">
            {errorMessage}
          </p>
        </section>
      )}

      {/* =====================================================
          SECURITY NOTICE
      ====================================================== */}

      <section className="bg-[#0d2523] border border-emerald-500/10 rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck
              size={21}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h2 className="font-semibold text-emerald-300">
              Secure Payment
            </h2>

            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Your saved payment method information is
              protected. Sensitive payment credentials
              should only be entered through secure
              payment processing.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          PAYMENT METHODS
      ====================================================== */}

      <section className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">

        {/* Header */}

        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold">
              Saved Payment Methods
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage the payment methods connected
              to your account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowAddForm(true);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className="flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <Plus size={17} />
            Add Payment Method
          </button>

        </div>

        {/* =================================================
            ADD FORM
        ================================================== */}

        {showAddForm && (
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="text-lg font-semibold">
                  Add Payment Method
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Enter your payment method details.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <X size={17} />
              </button>

            </div>

            <form
              onSubmit={handleAddPaymentMethod}
              className="grid md:grid-cols-2 gap-5"
            >

              {/* Method Type */}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Payment Type
                </label>

                <select
                  name="method_type"
                  value={form.method_type}
                  onChange={handleMethodTypeChange}
                  className="w-full bg-[#071817] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c9a34e]/60"
                >
                  <option value="bkash">
                    bKash
                  </option>

                  <option value="nagad">
                    Nagad
                  </option>

                  <option value="card">
                    Card
                  </option>

                  <option value="bank">
                    Bank Account
                  </option>
                </select>
              </div>

              {/* Account Name */}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Account Name
                </label>

                <input
                  type="text"
                  name="account_name"
                  value={form.account_name}
                  onChange={handleFormChange}
                  placeholder="Enter account name"
                  required
                  className="w-full bg-[#071817] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/60"
                />
              </div>

              {/* Account Number */}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Account / Number
                </label>

                <input
                  type="text"
                  name="account_number"
                  value={form.account_number}
                  onChange={handleFormChange}
                  placeholder="Enter account number"
                  required
                  className="w-full bg-[#071817] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/60"
                />
              </div>

              {/* Provider */}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Provider
                </label>

                <input
                  type="text"
                  name="provider"
                  value={form.provider}
                  onChange={handleFormChange}
                  placeholder="e.g. bKash, Nagad, Visa"
                  className="w-full bg-[#071817] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-[#c9a34e]/60"
                />
              </div>

              {/* Default */}

              <label className="md:col-span-2 flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="is_default"
                  checked={form.is_default}
                  onChange={handleFormChange}
                  className="w-4 h-4 accent-[#d6ae52]"
                />

                <span className="text-sm text-slate-300">
                  Make this my default payment method
                </span>

              </label>

              {/* Buttons */}

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 bg-[#d6ae52] hover:bg-[#e3be67] disabled:opacity-50 disabled:cursor-not-allowed text-[#071817] px-5 py-3 rounded-xl font-semibold transition"
                >
                  {actionLoading
                    ? "Saving..."
                    : "Save Payment Method"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={actionLoading}
                  className="sm:w-32 border border-white/10 hover:bg-white/5 text-slate-300 px-5 py-3 rounded-xl font-medium transition"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* =================================================
            LIST
        ================================================== */}

        <div className="divide-y divide-white/5">

          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => {

              const isDefault =
                Boolean(method.is_default);

              return (
                <div
                  key={method.id}
                  className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-white/[0.02] transition"
                >

                  {/* LEFT */}

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center">
                      {getIcon(
                        method.method_type
                      )}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-medium">
                          {getMethodName(method)}
                        </h3>

                        {isDefault && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#c9a34e]/10 border border-[#c9a34e]/20 text-[#d9b45c]">
                            Default
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {method.account_name}
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        {getDetails(method)}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-3">

                    {isDefault ? (
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 size={16} />
                        Active
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() =>
                          handleSetDefault(
                            method.id
                          )
                        }
                        className="px-4 py-2 rounded-xl border border-[#c9a34e]/20 text-[#d9b45c] hover:bg-[#c9a34e]/10 disabled:opacity-50 transition text-xs font-medium"
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() =>
                        handleRemove(
                          method.id
                        )
                      }
                      className="w-10 h-10 rounded-xl border border-red-500/10 text-red-400 hover:bg-red-500/10 disabled:opacity-50 transition flex items-center justify-center"
                      title="Remove payment method"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center">
                <WalletCards
                  size={28}
                  className="text-slate-500"
                />
              </div>

              <h3 className="text-lg font-semibold mt-5">
                No saved payment methods
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Add a payment method to make
                managing your bookings easier.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          AVAILABLE PAYMENT OPTIONS
      ====================================================== */}

      <section className="bg-[#0d2523] border border-white/5 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">
            <CreditCard
              size={20}
              className="text-[#d9b45c]"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Available Payment Options
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Payment methods supported by TripDaoBD.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {/* Card */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-[#c9a34e]/10 flex items-center justify-center mb-4">
              <CreditCard
                size={19}
                className="text-[#d9b45c]"
              />
            </div>

            <h3 className="font-medium">
              Card Payment
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Pay securely using supported debit
              or credit cards.
            </p>

            <span className="inline-block mt-4 text-xs text-emerald-400">
              Available
            </span>

          </div>

          {/* Mobile Banking */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <WalletCards
                size={19}
                className="text-blue-400"
              />
            </div>

            <h3 className="font-medium">
              Mobile Banking
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Support for bKash, Nagad and
              other mobile banking payments.
            </p>

            <span className="inline-block mt-4 text-xs text-emerald-400">
              Available
            </span>

          </div>

          {/* Hotel */}

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">

            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
              <Banknote
                size={19}
                className="text-emerald-400"
              />
            </div>

            <h3 className="font-medium">
              Pay at Hotel
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Reserve your room now and pay at
              the property.
            </p>

            <span className="inline-block mt-4 text-xs text-emerald-400">
              Available
            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          PAYMENT SECURITY
      ====================================================== */}

      <section className="bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center shrink-0">
            <Lock
              size={20}
              className="text-[#d9b45c]"
            />
          </div>

          <div>

            <h3 className="font-semibold">
              Your Payment Information Is Protected
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              TripDaoBD uses secure payment processing
              for online transactions. Sensitive payment
              information should only be entered through
              secure payment processing.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default PaymentMethods;