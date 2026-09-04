import Container from "../ui/Container";
import {
  MapPinned,
  BadgeCheck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const benefits = [
  {
    icon: MapPinned,
    title: "Explore Bangladesh",
    description: "Discover beautiful destinations",
  },
  {
    icon: BadgeCheck,
    title: "Verified Information",
    description: "Reliable travel details",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Trusted",
    description: "Travel with confidence",
  },
  {
    icon: Headphones,
    title: "Travel Support",
    description: "We're here when you need us",
  },
];

const TrustBar = () => {
  return (
    <section className="relative z-30 px-5 pt-8 sm:px-8 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-6xl rounded-[24px] border border-[#e9e7df] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(25,55,40,0.08)] sm:px-7 lg:py-6">
          <div className="grid grid-cols-1 divide-y divide-[#ecebe5] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex items-center gap-4 px-2 py-4 sm:px-5 lg:py-2"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf3ee]">
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      className="text-[#1f5b43]"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1c3027]">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustBar;