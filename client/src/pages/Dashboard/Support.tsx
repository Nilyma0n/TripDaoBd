import {
  ArrowLeft,
  LifeBuoy,
  Mail,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    window.location.href = "mailto:support@tripdaobd.com";
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
          Help Center
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Contact Support
        </h1>

        <p className="text-slate-400 mt-2 max-w-2xl">
          Need help with your account, bookings, or travel plans?
          Our support team is here to help.
        </p>
      </section>

      {/* SUPPORT CARD */}
      <section className="bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <LifeBuoy
                size={24}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                How can we help?
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Choose an option below.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-4">
          {/* EMAIL */}
          <button
            type="button"
            onClick={handleContact}
            className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#c9a34e]/10 flex items-center justify-center mb-4">
              <Mail
                size={19}
                className="text-[#d9b45c]"
              />
            </div>

            <h3 className="font-medium">
              Email Support
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Send us an email about your issue.
            </p>

            <span className="inline-block mt-4 text-xs text-[#d9b45c]">
              support@tripdaobd.com
            </span>
          </button>

          {/* MESSAGE */}
          <button
            type="button"
            onClick={() =>
              alert(
                "Live chat support will be available soon."
              )
            }
            className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <MessageCircle
                size={19}
                className="text-blue-400"
              />
            </div>

            <h3 className="font-medium">
              Live Chat
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Chat with our support team directly.
            </p>

            <span className="inline-block mt-4 text-xs text-blue-400">
              Coming Soon
            </span>
          </button>

          {/* FAQ */}
          <button
            type="button"
            onClick={() =>
              alert(
                "Frequently asked questions will be available soon."
              )
            }
            className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
              <HelpCircle
                size={19}
                className="text-emerald-400"
              />
            </div>

            <h3 className="font-medium">
              Help & FAQ
            </h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Find answers to common questions.
            </p>

            <span className="inline-block mt-4 text-xs text-emerald-400">
              Coming Soon
            </span>
          </button>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">
          TripDaoBD Support
        </h2>

        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          For booking problems, account issues, payment questions,
          or general travel assistance, contact our support team.
        </p>

        <button
          type="button"
          onClick={handleContact}
          className="mt-5 inline-flex items-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-3 rounded-xl text-sm font-semibold transition"
        >
          <Mail size={17} />
          Email Support
        </button>
      </section>
    </div>
  );
};

export default Support;