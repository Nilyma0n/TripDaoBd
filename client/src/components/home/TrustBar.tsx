import { Compass, BadgeCheck, ShieldCheck, Headset } from "lucide-react";

const points = [
  { icon: Compass, label: "Handpicked destinations" },
  { icon: BadgeCheck, label: "Upfront, fair pricing" },
  { icon: ShieldCheck, label: "Emergency help built in" },
  { icon: Headset, label: "Local support anytime" },
];

const TrustBar = () => {
  return (
    <div className="relative z-10 px-5 lg:px-8 mt-6">
      <div className="max-w-5xl mx-auto bg-paper-raised rounded-2xl border border-mist shadow-sm px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((point) => (
          <div key={point.label} className="flex items-center gap-3">
            <point.icon className="text-forest shrink-0" size={22} strokeWidth={1.75} />
            <span className="text-sm font-medium text-ink leading-snug">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;