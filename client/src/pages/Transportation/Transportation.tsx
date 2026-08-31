import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { transports } from "../../data/mock/transports";

const transportTypes = [
  "All",
  "Bus",
  "Train",
  "Flight",
  "Launch",
  "Car Rental",
];

const Transportation = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredTransports = useMemo(() => {
    return transports.filter((transport) => {
      const matchesSearch =
        transport.name.toLowerCase().includes(search.toLowerCase()) ||
        transport.company.toLowerCase().includes(search.toLowerCase()) ||
        transport.from.toLowerCase().includes(search.toLowerCase()) ||
        transport.to.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" || transport.type === type;

      const matchesFeatured =
        !featuredOnly || transport.featured;

      return (
        matchesSearch &&
        matchesType &&
        matchesFeatured
      );
    });
  }, [search, type, featuredOnly]);

  const totalPages = Math.ceil(
    filteredTransports.length / itemsPerPage
  );

  const currentTransports = filteredTransports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-slate-50 min-h-screen py-20">
      <Container>

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-blue-700 font-semibold uppercase tracking-widest">
            Transportation
          </span>

          <h1 className="text-5xl font-extrabold mt-4">
            Travel Across Bangladesh
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Find buses, trains, flights, launches and car rentals.
          </p>

        </div>

        <div className="mt-14 bg-white rounded-3xl shadow-md p-8">

          <div className="grid lg:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Search transport..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl p-4"
            />

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-xl p-4"
            >
              {transportTypes.map((item) => (
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

        <div className="mt-8 font-medium text-gray-600">
          {filteredTransports.length} transport(s) found
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          {currentTransports.map((transport) => (

            <div
              key={transport.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >

              <img
                src={transport.image}
                alt={transport.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between">

                  <h2 className="text-2xl font-bold">
                    {transport.name}
                  </h2>

                  {transport.featured && (
                    <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}

                </div>

                <p className="mt-3 text-gray-500">
                  {transport.type}
                </p>

                <p className="mt-2">
                  📍 {transport.from} → {transport.to}
                </p>

                <p className="mt-2">
                  🕒 {transport.duration}
                </p>

                <p className="mt-2 text-yellow-500">
                  ⭐ {transport.rating}
                </p>

                <p className="mt-3 text-xl font-bold text-blue-700">
                  ৳ {transport.price}
                </p>

                <Link
                  to={`/transportation/${transport.slug}`}
                  className="block mt-6 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-xl"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

        {totalPages > 1 && (

          <div className="flex justify-center gap-3 mt-12 flex-wrap">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="px-5 py-3 rounded-xl bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`w-12 h-12 rounded-xl ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="px-5 py-3 rounded-xl bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>

          </div>

        )}

      </Container>
    </section>
  );
};

export default Transportation;