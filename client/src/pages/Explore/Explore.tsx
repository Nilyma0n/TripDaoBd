import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import { destinations } from "../../data/mock/destinations";
import { districts } from "../../data/mock/districts";

const divisions = [
  "All",
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const categories = [
  "All",
  "Beach",
  "Hill",
  "Forest",
  "River",
  "Historical",
  "Island",
  "Lake",
  "Tea Garden",
  "Haor",
  "Nature",
  "Waterfall",
];

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [division, setDivision] = useState(
    searchParams.get("division") || "All"
  );

  const [district, setDistrict] = useState(
    searchParams.get("district") || "All"
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // ============================================================
  // DISTRICTS AVAILABLE FOR SELECTED DIVISION
  // ============================================================

  const availableDistricts = useMemo(() => {
    if (division === "All") {
      return districts;
    }

    return districts.filter(
      (item) => item.division === division
    );
  }, [division]);

  // ============================================================
  // FILTER DESTINATIONS
  // ============================================================

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        destination.name
          .toLowerCase()
          .includes(searchText) ||
        destination.district
          .toLowerCase()
          .includes(searchText) ||
        destination.division
          .toLowerCase()
          .includes(searchText);

      const matchesDivision =
        division === "All" ||
        destination.division === division;

      const matchesDistrict =
        district === "All" ||
        destination.district === district;

      const matchesCategory =
        category === "All" ||
        destination.category === category;

      const matchesFeatured =
        !featuredOnly || destination.featured;

      return (
        matchesSearch &&
        matchesDivision &&
        matchesDistrict &&
        matchesCategory &&
        matchesFeatured
      );
    });
  }, [
    search,
    division,
    district,
    category,
    featuredOnly,
  ]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.ceil(
    filteredDestinations.length / itemsPerPage
  );

  const currentDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ============================================================
  // UPDATE URL FILTERS
  // ============================================================

  const updateFilters = (
    newDivision: string,
    newDistrict: string,
    newCategory: string,
    newSearch: string
  ) => {
    const params = new URLSearchParams();

    if (newSearch.trim()) {
      params.set("search", newSearch.trim());
    }

    if (newDivision !== "All") {
      params.set("division", newDivision);
    }

    if (newDistrict !== "All") {
      params.set("district", newDistrict);
    }

    if (newCategory !== "All") {
      params.set("category", newCategory);
    }

    setSearchParams(params);
  };

  // ============================================================
  // DIVISION CHANGE
  // ============================================================

  const handleDivisionChange = (value: string) => {
    setDivision(value);

    // When division changes, reset district
    setDistrict("All");

    setCurrentPage(1);

    updateFilters(
      value,
      "All",
      category,
      search
    );
  };

  // ============================================================
  // DISTRICT CHANGE
  // ============================================================

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setCurrentPage(1);

    updateFilters(
      division,
      value,
      category,
      search
    );
  };

  // ============================================================
  // CATEGORY CHANGE
  // ============================================================

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);

    updateFilters(
      division,
      district,
      value,
      search
    );
  };

  // ============================================================
  // SEARCH CHANGE
  // ============================================================

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);

    updateFilters(
      division,
      district,
      category,
      value
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="min-h-screen bg-[#f7f5ef] py-20">
      <Container>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#e99a36]">
            Explore Bangladesh
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#26382f] sm:text-5xl">
            Discover Amazing Destinations
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-500 sm:text-lg">
            Explore tourist spots, beaches, hills, forests,
            waterfalls and historical places across Bangladesh.
          </p>

        </div>

        {/* ======================================================
            FILTERS
        ====================================================== */}

        <div className="mt-12 rounded-[28px] border border-[#e5e2d8] bg-white p-5 shadow-[0_18px_50px_rgba(31,91,67,0.08)] sm:p-7">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* SEARCH */}

            <div className="lg:col-span-1">

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                Search
              </label>

              <input
                type="text"
                placeholder="Search destination..."
                value={search}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                className="w-full rounded-xl border border-[#dddcd4] bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition focus:border-[#1f5b43] focus:ring-2 focus:ring-[#1f5b43]/10"
              />

            </div>

            {/* DIVISION */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                Division
              </label>

              <select
                value={division}
                onChange={(e) =>
                  handleDivisionChange(e.target.value)
                }
                className="w-full rounded-xl border border-[#dddcd4] bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition focus:border-[#1f5b43]"
              >

                {divisions.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Divisions"
                      : item}
                  </option>
                ))}

              </select>

            </div>

            {/* DISTRICT */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                District
              </label>

              <select
                value={district}
                onChange={(e) =>
                  handleDistrictChange(e.target.value)
                }
                className="w-full rounded-xl border border-[#dddcd4] bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition focus:border-[#1f5b43]"
              >

                <option value="All">
                  All Districts
                </option>

                {availableDistricts.map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  handleCategoryChange(e.target.value)
                }
                className="w-full rounded-xl border border-[#dddcd4] bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition focus:border-[#1f5b43]"
              >

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* FEATURED */}

          <label className="mt-5 inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#293a32]">

            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => {
                setFeaturedOnly(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 accent-[#1f5b43]"
            />

            Featured destinations only

          </label>

        </div>

        {/* ======================================================
            RESULT COUNT
        ====================================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">

          <p className="text-sm font-semibold text-gray-500">
            {filteredDestinations.length} destination
            {filteredDestinations.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>

          {district !== "All" && (
            <p className="rounded-full bg-[#e8f0e9] px-4 py-2 text-xs font-bold text-[#1f5b43]">
              Showing places in {district}
            </p>
          )}

        </div>

        {/* ======================================================
            DESTINATION GRID
        ====================================================== */}

        {currentDestinations.length > 0 ? (

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {currentDestinations.map((destination) => (

              <div
                key={destination.id}
                className="group overflow-hidden rounded-[26px] border border-[#e5e2d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,91,67,0.12)]"
              >

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {destination.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#1f5b43] px-3 py-1.5 text-xs font-bold text-white">
                      Featured
                    </span>
                  )}

                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#26382f] shadow">
                    ★ {destination.rating}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h2 className="text-xl font-extrabold text-[#26382f]">
                    {destination.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {destination.district},{" "}
                    {destination.division}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-[#edf3ee] px-3 py-1 text-xs font-bold text-[#1f5b43]">
                    {destination.category}
                  </span>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {destination.shortDescription}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-6 flex gap-3">

                    <Link
                      to={`/destination/${destination.slug}`}
                      className="flex-1 rounded-xl bg-[#1f5b43] py-3 text-center text-sm font-bold text-white transition hover:bg-[#174a36]"
                    >
                      View Details
                    </Link>

                    <a
                      href={destination.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${destination.name} on map`}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f1eb] text-lg transition hover:bg-[#e6e5dc]"
                    >
                      🗺️
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="mt-8 rounded-[26px] border border-dashed border-[#d8d5c9] bg-white px-6 py-16 text-center">

            <h2 className="text-xl font-bold text-[#26382f]">
              No destinations found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try another district, category or search term.
            </p>

          </div>

        )}

        {/* ======================================================
            PAGINATION
        ====================================================== */}

        {totalPages > 1 && (

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1f5b43] shadow-sm transition hover:bg-[#edf3ee] disabled:cursor-not-allowed disabled:opacity-40"
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
                  className={`h-11 w-11 rounded-xl text-sm font-bold transition ${
                    currentPage === index + 1
                      ? "bg-[#1f5b43] text-white"
                      : "bg-white text-[#26382f] hover:bg-[#edf3ee]"
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
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1f5b43] shadow-sm transition hover:bg-[#edf3ee] disabled:cursor-not-allowed disabled:opacity-40"
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