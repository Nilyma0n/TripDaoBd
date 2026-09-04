import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import { hotels } from "../../data/mock/hotels";

import fallbackImage from "../../assets/images/hotels/sayeman-beach-resort-cox-s-bazar-pic-1.jpeg";

const PopularHotels = () => {
  const featuredHotels = hotels
    .filter((hotel) => hotel.featured)
    .slice(0, 3);

  return (
    <section className="bg-[#f7f5ef] py-20 sm:py-24">
      <Container>

        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#e99a36]" />

              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Stay Comfortably
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
              Popular Hotels
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Comfortable places to stay during your journey.
            </p>
          </div>

          <Link
            to="/hotels"
            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#1f5b43] sm:self-auto"
          >
            View All Hotels

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* HOTEL CARDS */}
        {featuredHotels.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {featuredHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="group overflow-hidden rounded-[24px] border border-[#e6e4dc] bg-white shadow-[0_8px_28px_rgba(20,50,35,0.07)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(20,50,35,0.12)]"
              >

                {/* IMAGE */}
                <div className="relative h-[235px] overflow-hidden">

                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    onError={(event) => {
                      event.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* RATING */}
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#26382f]">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-[#e99a36]"
                    />
                    {hotel.rating}
                  </div>

                  {/* FEATURED */}
                  <span className="absolute right-4 top-4 rounded-full bg-[#1f5b43]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Featured
                  </span>

                  {/* NAME */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">
                      {hotel.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                      <MapPin size={13} />
                      {hotel.district}, {hotel.division}
                    </div>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                    {hotel.description}
                  </p>

                  {/* AMENITIES */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-[#edf3ee] px-3 py-1 text-[10px] font-semibold text-[#1f5b43]"
                      >
                        {amenity}
                      </span>
                    ))}

                  </div>

                  <div className="mt-5 flex items-end justify-between">

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        From
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-[#1f5b43]">
                        ৳{hotel.pricePerNight.toLocaleString()}
                        <span className="ml-1 text-[10px] font-medium text-gray-400">
                          / night
                        </span>
                      </p>
                    </div>

                    <Link
                      to={`/hotels/${hotel.slug}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3ee] text-[#1f5b43] transition hover:bg-[#1f5b43] hover:text-white"
                      aria-label={`View ${hotel.name}`}
                    >
                      <ArrowRight size={17} />
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#d8d7ce] bg-white p-10 text-center text-sm text-gray-500">
            Hotels will appear here once they are added.
          </div>
        )}

      </Container>
    </section>
  );
};

export default PopularHotels;