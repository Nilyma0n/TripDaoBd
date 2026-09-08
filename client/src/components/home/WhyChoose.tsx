import {
  Building2,
  CloudSun,
  Map,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

const features = [
  {
    icon: Map,
    title: "Explore Bangladesh",
    description:
      "Discover beaches, hills, tea gardens, forests, islands, historical places and hidden gems across Bangladesh.",
  },
  {
    icon: Sparkles,
    title: "Smart Travel Planning",
    description:
      "Get useful destination information and practical ideas to make planning your next trip easier.",
  },
  {
    icon: Building2,
    title: "Hotels & Stays",
    description:
      "Find hotels, resorts and accommodation options near the destinations you want to explore.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Safely",
    description:
      "Quickly find emergency contacts and important safety information while travelling.",
  },
  {
    icon: CloudSun,
    title: "Weather Information",
    description:
      "Check useful weather information before heading out so you can plan your journey with confidence.",
  },
  {
    icon: Wallet,
    title: "Budget Friendly",
    description:
      "Plan transportation, accommodation and food expenses before your journey begins.",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#f7f5ef] py-20 md:py-24">
      <Container>

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-[#e8f0e9] px-4 py-2 text-xs font-bold uppercase tracking-[1.8px] text-[#1f5b43]">
            Why TripDaoBD
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#26382f] sm:text-4xl md:text-5xl">
            Everything you need to
            <span className="text-[#1f5b43]"> travel better</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500 md:text-lg">
            From discovering beautiful destinations to finding places to
            stay and staying safe, TripDaoBD brings your travel essentials
            together in one place.
          </p>

        </div>

        {/* ================= FEATURES ================= */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[24px] border border-[#e7e5dc] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d7e3d9] hover:shadow-[0_18px_45px_rgba(31,91,67,0.09)]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3ee] text-[#1f5b43] transition duration-300 group-hover:bg-[#1f5b43] group-hover:text-white">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#293a32]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* ================= CTA ================= */}

        <div className="mt-10 text-center">

          <Link
            to="/features"
            className="inline-flex items-center justify-center rounded-full bg-[#1f5b43] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#174a36]"
          >
            Explore all features
            <span className="ml-2">→</span>
          </Link>

        </div>

      </Container>
    </section>
  );
};

export default WhyChoose;