import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Map,
  UtensilsCrossed,
  Clock3,
} from "lucide-react";

import Container from "../../components/ui/Container";
import { restaurants } from "../../data/mock/restaurants";

const Restaurants = () => {
  const [search, setSearch] = useState("");

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const keyword = search.toLowerCase();

      return (
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.district.toLowerCase().includes(keyword) ||
        restaurant.division.toLowerCase().includes(keyword) ||
        restaurant.destination.toLowerCase().includes(keyword) ||
        restaurant.cuisine.some((item) =>
          item.toLowerCase().includes(keyword)
        )
      );
    });
  }, [search]);

  return (
    <section className="bg-slate-50 min-h-screen py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-blue-700 font-semibold uppercase tracking-wider">
            TripDaoBD Restaurants
          </span>

          <h1 className="mt-4 text-5xl font-extrabold text-gray-900">
            Taste the Best of Bangladesh
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Explore cozy cafes, family restaurants, rooftop dining spots and
            local food gems across the country.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl relative">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by restaurant, cuisine or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-14 pr-5 shadow-sm focus:border-blue-700 focus:outline-none"
          />
        </div>

        <div className="mt-10 mb-8 text-gray-600">
          {filteredRestaurants.length} restaurant(s) found
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="py-20 text-center">
            <UtensilsCrossed size={70} className="mx-auto text-gray-400" />

            <h2 className="mt-5 text-3xl font-bold">No Restaurants Found</h2>

            <p className="mt-3 text-gray-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {restaurant.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-blue-700 px-4 py-1 text-sm font-semibold text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {restaurant.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-gray-500">
                    <MapPin size={18} />
                    <span>
                      {restaurant.district}, {restaurant.division}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-gray-500">
                        ({restaurant.totalReviews})
                      </span>
                    </div>

                    <span className="text-xl font-bold text-blue-700">
                      {restaurant.priceRange}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Clock3 size={16} />
                    <span>{restaurant.openingHours}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {restaurant.cuisine.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-blue-50 px-3 py-2 text-sm text-blue-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link
                      to={`/restaurants/${restaurant.slug}`}
                      className="flex-1 rounded-xl bg-blue-700 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                    >
                      View Details
                    </Link>

                    <a
                      href={restaurant.mapUrl}
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

export default Restaurants;
