import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { destinations } from "../../data/mock/destinations";

const divisions = [
  "All",
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const categories = [
  "All",
  "Beach",
  "Hill",
  "Forest",
  "Tea Garden",
  "Waterfall",
  "Historical",
  "Island",
  "Lake",
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("All");
  const [category, setCategory] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.district.toLowerCase().includes(search.toLowerCase());

      const matchesDivision =
        division === "All" || destination.division === division;

      const matchesCategory =
        category === "All" || destination.category === category;

      const matchesFeatured =
        !featuredOnly || destination.featured;

      return (
        matchesSearch &&
        matchesDivision &&
        matchesCategory &&
        matchesFeatured
      );
    });
  }, [search, division, category, featuredOnly]);

  const totalPages = Math.ceil(
    filteredDestinations.length / itemsPerPage
  );

  const currentDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

return (
  <section className="bg-slate-50 min-h-screen py-20">
    <Container>

      {/* Header */}

      <div className="text-center max-w-3xl mx-auto">

        <span className="text-blue-700 font-semibold uppercase tracking-widest">
          Explore Bangladesh
        </span>

        <h1 className="text-5xl font-extrabold mt-4">
          Discover Amazing Destinations
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Explore beaches, hills, waterfalls, tea gardens,
          forests and historical places across Bangladesh.
        </p>

      </div>

      {/* Filters */}

      <div className="mt-14 bg-white rounded-3xl shadow-md p-8">

        <div className="grid lg:grid-cols-4 gap-5">

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            className="border rounded-xl p-4"
          />

          <select
            value={division}
            onChange={(e) => {
  setDivision(e.target.value);
  setCurrentPage(1);
}}
            className="border rounded-xl p-4"
          >
            {divisions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => {
  setCategory(e.target.value);
  setCurrentPage(1);
}}
            className="border rounded-xl p-4"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <label className="flex items-center gap-3 text-lg font-medium">

            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => {
  setFeaturedOnly(e.target.checked);
  setCurrentPage(1);
}}
            />

            Featured Only

          </label>

        </div>

      </div>

      {/* Results */}

      <div className="mt-8 text-gray-600 font-medium">
        {filteredDestinations.length} destination(s) found
      </div>
            {/* Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          {currentDestinations.map((destination) => (

            <div
              key={destination.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <div className="relative">

                <img
                  src={destination.heroImage}
                  alt={destination.name}
                  className="w-full h-64 object-cover"
                />

                {destination.featured && (
                  <span className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Featured
                  </span>
                )}

                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow font-semibold">
                  ⭐ {destination.rating}
                </span>

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {destination.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {destination.district}, {destination.division}
                </p>

                <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {destination.category}
                </span>

                <p className="mt-4 text-gray-600 leading-7">
                  {destination.shortDescription}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/destination/${destination.slug}`}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-xl font-semibold"
                  >
                    View Details
                  </Link>

                  <a
                    href={destination.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl"
                  >
                    🗺️
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Pagination */}

        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-3 mt-14 flex-wrap">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-12 h-12 rounded-xl font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Next
            </button>

          </div>

        )}
                {/* Pagination */}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-14 flex-wrap">

            {/* Previous Button */}

            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Previous
            </button>

            {/* Page Numbers */}

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-12 h-12 rounded-xl font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </Container>
    </section>
  );
};

export default Explore;