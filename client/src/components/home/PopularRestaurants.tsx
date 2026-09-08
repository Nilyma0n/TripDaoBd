import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

import { restaurants } from "../../data/mock/restaurants";
import fallbackImage from "../../assets/images/hero.jpg";

const PopularRestaurants = () => {
  const featuredRestaurants = restaurants
    .filter((restaurant) => restaurant.featured)
    .slice(0, 6);

  return (
    <section className="bg-[#f7f5ef] py-20 md:py-24">
      <Container>

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#e99a36]">
              Taste Bangladesh
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#26382f] sm:text-4xl">
              Popular Restaurants
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              Discover local flavours, favourite cafés and memorable dining
              experiences.
            </p>

          </div>

          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1f5b43] transition hover:text-[#e99a36]"
          >
            Explore restaurants
            <ArrowRight size={17} />
          </Link>

        </div>

        {/* ================= CARDS ================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {featuredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group overflow-hidden rounded-[26px] border border-[#e5e3db] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(31,91,67,0.10)]"
            >

              {/* IMAGE */}

              <div className="relative h-60 overflow-hidden">

                <img
                  src={restaurant.image || fallbackImage}
                  alt={restaurant.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Featured */}

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#1f5b43] shadow-sm">
                  Featured
                </span>

                {/* Rating */}

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#293a32] shadow-sm">
                  <Star
                    size={14}
                    className="fill-[#e99a36] text-[#e99a36]"
                  />

                  <span>{restaurant.rating}</span>

                  <span className="font-normal text-gray-400">
                    ({restaurant.totalReviews})
                  </span>
                </div>

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <h3 className="text-xl font-bold text-[#293a32]">
                  {restaurant.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

                  <MapPin
                    size={16}
                    className="shrink-0 text-[#1f5b43]"
                  />

                  <span>
                    {restaurant.district},{" "}
                    {restaurant.division}
                  </span>

                </div>

                {/* CUISINE */}

                <div className="mt-4 flex flex-wrap gap-2">

                  {restaurant.cuisine
                    .slice(0, 2)
                    .map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#edf3ee] px-3 py-1 text-[11px] font-semibold text-[#1f5b43]"
                      >
                        {item}
                      </span>
                    ))}

                </div>

                {/* FOOTER */}

                <div className="mt-5 flex items-center justify-between border-t border-[#eeeae1] pt-4">

                  <span className="text-sm font-bold text-[#e99a36]">
                    {restaurant.priceRange}
                  </span>

                  {/* IMPORTANT:
                      Current routes do not have
                      /restaurants/:slug, so use
                      /restaurants instead of creating
                      a broken URL.
                  */}

                  <Link
                    to="/restaurants"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1f5b43] transition hover:text-[#e99a36]"
                  >
                    View details
                    <ArrowRight size={15} />
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
};

export default PopularRestaurants;