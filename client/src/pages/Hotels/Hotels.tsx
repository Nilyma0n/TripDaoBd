import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Map,
  Hotel as HotelIcon,
  Wifi,
} from "lucide-react";

import Container from "../../components/ui/Container";
import { hotels } from "../../data/mock/hotels";

const Hotels = () => {
  const [search, setSearch] = useState("");

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const keyword = search.toLowerCase();

      return (
        hotel.name.toLowerCase().includes(keyword) ||
        hotel.district.toLowerCase().includes(keyword) ||
        hotel.division.toLowerCase().includes(keyword) ||
        hotel.destination.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  return (
    <section className="bg-slate-50 min-h-screen py-20">

      <Container>

        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-blue-700 font-semibold uppercase tracking-wider">
            TripDaoBD Hotels
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            Find the Perfect Hotel
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Browse premium hotels and resorts across Bangladesh with ratings,
            pricing, facilities and map locations.
          </p>

        </div>

        {/* Search */}

        <div className="max-w-2xl mx-auto mt-12 relative">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by hotel, district or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-14 pr-5 shadow-sm focus:border-blue-700 focus:outline-none"
          />

        </div>

        {/* Count */}

        <div className="mt-10 mb-8 text-gray-600">
          {filteredHotels.length} hotel(s) found
        </div>

        {/* Hotel Grid */}

        {filteredHotels.length === 0 ? (
          <div className="py-20 text-center">

            <HotelIcon
              size={70}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 text-3xl font-bold">
              No Hotels Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try another search keyword.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {filteredHotels.map((hotel) => (

              <div
                key={hotel.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Image */}

                <div className="relative overflow-hidden">

                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {hotel.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-blue-700 px-4 py-1 text-sm font-semibold text-white">
                      Featured
                    </span>
                  )}

                </div>

                {/* Body */}

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {hotel.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-gray-500">

                    <MapPin size={18} />

                    <span>
                      {hotel.district}, {hotel.division}
                    </span>

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">
                        {hotel.rating}
                      </span>

                      <span className="text-gray-500">
                        ({hotel.totalReviews})
                      </span>

                    </div>

                    <span className="text-xl font-bold text-blue-700">
                      ৳ {hotel.pricePerNight}
                    </span>

                  </div>

                  {/* Amenities */}

                  <div className="mt-6 flex flex-wrap gap-2">

                    {hotel.amenities.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-2 text-sm text-blue-700"
                      >
                        <Wifi size={14} />
                        {item}
                      </span>
                    ))}

                  </div>

                  {/* Buttons */}

                  <div className="mt-8 flex gap-3">

                    <Link
                      to={`/hotels/${hotel.slug}`}
                      className="flex-1 rounded-xl bg-blue-700 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                    >
                      View Details
                    </Link>

                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-gray-100 p-3 transition hover:bg-gray-200"
                    >
                      <Map size={22} />
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </Container>

    </section>
  );
};

export default Hotels;