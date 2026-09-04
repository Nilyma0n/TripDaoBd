import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { restaurants } from "../../data/mock/restaurants";

const PopularRestaurants = () => {
  const featuredRestaurants = restaurants.filter((restaurant) => restaurant.featured).slice(0, 3);

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          title="Popular Restaurants"
          subtitle="Fresh flavors, local tastes and memorable dining experiences"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group overflow-hidden rounded-3xl bg-gray-50 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {restaurant.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span>
                    {restaurant.district}, {restaurant.division}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-600">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span>({restaurant.totalReviews})</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {restaurant.cuisine.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-700">
                    {restaurant.priceRange}
                  </span>

                  <Link
                    to={`/restaurants/${restaurant.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                  >
                    View details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/restaurants"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Explore all restaurants
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PopularRestaurants;
