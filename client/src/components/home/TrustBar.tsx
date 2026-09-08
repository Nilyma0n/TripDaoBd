import {
  BadgeCheck,
  Compass,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import Container from "../ui/Container";

const benefits = [
  {
    icon: Compass,
    title: "Explore Bangladesh",
    description: "Discover destinations worth visiting",
  },
  {
    icon: BadgeCheck,
    title: "Verified Information",
    description: "Useful travel information in one place",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Trusted",
    description: "Travel with confidence",
  },
  {
    icon: Headphones,
    title: "Travel Support",
    description: "Helpful resources when you need them",
  },
];

const TrustBar = () => {
  return (
    <section className="bg-white py-8 md:py-10">
      <Container>

        <div className="grid overflow-hidden rounded-[26px] border border-[#e7e5dc] bg-[#fbfaf7] sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`
                  flex items-center gap-4 p-5 md:p-6
                  ${
                    index !== benefits.length - 1
                      ? "border-b border-[#e7e5dc] sm:border-r lg:border-b-0"
                      : ""
                  }
                  ${
                    index === 1
                      ? "sm:border-r-0 lg:border-r"
                      : ""
                  }
                `}
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f0e9] text-[#1f5b43]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#293a32]">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {benefit.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
};

export default TrustBar;