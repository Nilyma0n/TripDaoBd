import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import EmergencyCard from "../../components/emergency/EmergencyCard";
import { emergencyServices } from "../../data/mock/emergency";

const types = [
  "All",
  "Hospital",
  "Police",
  "Fire Service",
  "Tourist Police",
  "Ambulance",
];

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

const Emergency = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [division, setDivision] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredServices = useMemo(() => {
    return emergencyServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.district.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" || service.type === type;

      const matchesDivision =
        division === "All" || service.division === division;

      const matchesFeatured =
        !featuredOnly || service.featured;

      return (
        matchesSearch &&
        matchesType &&
        matchesDivision &&
        matchesFeatured
      );
    });
  }, [search, type, division, featuredOnly]);

  const totalPages = Math.ceil(
    filteredServices.length / itemsPerPage
  );

  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-slate-50 min-h-screen py-20">
      <Container>

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-red-600 font-semibold uppercase tracking-widest">
            Emergency Services
          </span>

          <h1 className="text-5xl font-extrabold mt-4">
            Stay Safe While Travelling
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Find nearby hospitals, police stations, ambulance,
            tourist police and fire service across Bangladesh.
          </p>

        </div>

        <div className="mt-14 bg-white rounded-3xl shadow-md p-8">

          <div className="grid lg:grid-cols-4 gap-5">

            <input
              type="text"
              placeholder="Search..."
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
              {types.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

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

            <label className="flex items-center gap-3">

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

        <div className="mt-8 text-gray-600 font-medium">
          {filteredServices.length} service(s) found
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          {currentServices.map((service) => (
            <EmergencyCard
              key={service.id}
              service={service}
            />
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

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`w-12 h-12 rounded-xl ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200"
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

export default Emergency;