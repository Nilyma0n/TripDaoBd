import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import { restaurants } from "../../data/mock/restaurants";

import fallbackImage from "../../assets/images/destinations/coxs-bazar-2.jpg";

const PopularRestaurants = () => {
  const featuredRestaurants = restaurants
    .filter((restaurant) => restaurant.featured)
    .slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>

        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#e99a36]" />

              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Taste Bangladesh
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
              Popular Restaurants
            </h2>

            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Discover local flavors, seafood, cafes and memorable dining
              experiences across Bangladesh.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#1f5b43] sm:self-auto"
          >
            View All Restaurants

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* CARDS */}
        {featuredRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {featuredRestaurants.map((restaurant) => (
              <article
                key={restaurant.id}
                className="group overflow-hidden rounded-[24px] border border-[#e7e5dc] bg-[#fbfbf8] transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_42px_rgba(20,50,35,0.12)]"
              >

                {/* IMAGE */}
                <div className="relative h-[235px] overflow-hidden">

                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    onError={(event) => {
                      event.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  {/* RATING */}
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#25362d]">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-[#e99a36]"
                    />
                    {restaurant.rating}
                  </div>

                  {/* FEATURED */}
                  <span className="absolute right-4 top-4 rounded-full bg-[#1f5b43]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Featured
                  </span>

                  {/* NAME */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">

                    <h3 className="text-xl font-bold">
                      {restaurant.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                      <MapPin size={13} />

                      {restaurant.district}, {restaurant.division}
                    </div>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                    {restaurant.description}
                  </p>

                  {/* CUISINE */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    {restaurant.cuisine
                      .slice(0, 2)
                      .map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#edf3ee] px-3 py-1 text-[10px] font-semibold text-[#1f5b43]"
                        >
                          {item}
                        </span>
                      ))}

                  </div>

                  {/* BOTTOM */}
                  <div className="mt-5 flex items-center justify-between">

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Price range
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#1f5b43]">
                        {restaurant.priceRange}
                      </p>
                    </div>

                    <Link
                      to={`/restaurants/${restaurant.slug}`}
                      className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3ee] text-[#1f5b43] transition hover:bg-[#1f5b43] hover:text-white"
                      aria-label={`View ${restaurant.name}`}
                    >
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover/button:translate-x-0.5"
                      />
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#d8d7ce] bg-[#fbfbf8] p-10 text-center text-sm text-gray-500">
            Restaurants will appear here once they are added.
          </div>
        )}

      </Container>
    </section>
  );
};

export default PopularRestaurants;