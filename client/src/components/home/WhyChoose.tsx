import Container from "../ui/Container";
import {
  Map,
  Bot,
  Hotel,
  ShieldCheck,
  CloudSun,
  WalletCards,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Map,
    title: "Explore All 64 Districts",
    description:
      "Discover beaches, hills, tea gardens, historical sites, islands, forests and hidden gems across Bangladesh.",
  },
  {
    icon: Bot,
    title: "AI Travel Assistant",
    description:
      "Get smart destination recommendations, travel plans and personalized travel suggestions.",
  },
  {
    icon: Hotel,
    title: "Hotels & Accommodation",
    description:
      "Find hotels, resorts and guest houses with useful information, ratings and reviews.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Safely",
    description:
      "Quickly access emergency contacts, hospitals, police stations and essential safety information.",
  },
  {
    icon: CloudSun,
    title: "Live Weather Updates",
    description:
      "Check weather conditions before your journey and plan your trip more comfortably.",
  },
  {
    icon: WalletCards,
    title: "Budget Friendly Planning",
    description:
      "Plan transportation, accommodation and food expenses before you start your journey.",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-7 bg-[#e99a36]" />

            <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
              Why TripDaoBD
            </span>

            <span className="h-px w-7 bg-[#e99a36]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
            Everything You Need to Travel Better
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            TripDaoBD brings destinations, planning tools, accommodation,
            safety information and travel assistance together in one place.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[22px] border border-[#e8e7df] bg-[#fbfbf8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#cddbd2] hover:bg-white hover:shadow-[0_16px_40px_rgba(20,60,40,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ee] text-[#1f5b43] transition-colors duration-300 group-hover:bg-[#1f5b43] group-hover:text-white">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#1d3128]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <Link
            to="/features"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1f5b43] px-6 py-3 text-sm font-bold text-[#1f5b43] transition hover:bg-[#1f5b43] hover:text-white"
          >
            Explore All Features

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default WhyChoose;