import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import DestinationCard from "../home/DestinationCard";

import { destinations } from "../../data/mock/destinations";

const FeaturedDestinations = () => {
  const featured = destinations
    .filter(
      (destination) =>
        destination.featured || destination.popular
    )
    .slice(0, 4);

  return (
    <section className="bg-[#f7f5ef] py-20 md:py-24">
      <Container>

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#e99a36]">
              Places to explore
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#26382f] sm:text-4xl md:text-5xl">
              Popular Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
              From beaches and islands to hills, forests and peaceful
              countryside, discover places that make Bangladesh special.
            </p>

          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1f5b43] transition hover:text-[#e99a36]"
          >
            Explore all destinations

            <ArrowRight size={17} />
          </Link>

        </div>

        {/* ================= DESTINATION GRID ================= */}

        {featured.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {featured.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}

          </div>
        ) : (
          <div className="mt-10 rounded-[26px] border border-dashed border-[#d9d6ca] bg-white p-10 text-center">
            <p className="text-sm font-semibold text-gray-500">
              More destinations are coming soon.
            </p>
          </div>
        )}

      </Container>
    </section>
  );
};

export default FeaturedDestinations;