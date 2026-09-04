import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import DestinationCard from "./DestinationCard";
import { destinations } from "../../data/mock/destinations";

const FeaturedDestinations = () => {
  const popularDestinations = destinations
    .filter((destination) => destination.popular || destination.featured)
    .slice(0, 4);

  return (
    <section className="bg-[#f7f5ef] py-20 sm:py-24">
      <Container>

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#e99a36]" />

              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Discover Bangladesh
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
              Popular Destinations
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore Bangladesh's most beautiful places and start planning
              your next unforgettable journey.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#1f5b43] sm:self-auto"
          >
            View All Destinations

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= DESTINATION GRID ================= */}
        {popularDestinations.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">
              Popular destinations will appear here.
            </p>
          </div>
        )}

      </Container>
    </section>
  );
};

export default FeaturedDestinations;