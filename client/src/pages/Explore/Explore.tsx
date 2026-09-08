import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import { districts } from "../../data/mock/districts";

const API_BASE_URL = "http://localhost:5000/api";

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

interface ApiDestination {
  id: number;
  slug: string;
  name: string;
  district: string;
  division: string;
  category: string;
  short_description: string;
  description: string;
  hero_image: string;
  latitude: number;
  longitude: number;
  map_url: string;
  best_season: string;
  opening_hours: string;
  entry_fee: number;
  estimated_duration: string;
  rating: number;
  total_reviews: number;
  featured: number | boolean;
  popular: number | boolean;
  created_at: string;
  updated_at: string;
}

interface DestinationApiResponse {
  success: boolean;
  data: ApiDestination[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

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

  const [featuredOnly, setFeaturedOnly] = useState(
    searchParams.get("featured") === "true"
  );

  const [destinations, setDestinations] = useState<ApiDestination[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [totalPages, setTotalPages] = useState(1);
  const [totalDestinations, setTotalDestinations] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  // FETCH DESTINATIONS FROM API
  // ============================================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(itemsPerPage));

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (division !== "All") {
          params.set("division", division);
        }

        if (district !== "All") {
          params.set("district", district);
        }

        if (category !== "All") {
          params.set("category", category);
        }

        if (featuredOnly) {
          params.set("featured", "true");
        }

        const response = await fetch(
          `${API_BASE_URL}/destinations?${params.toString()}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const result: DestinationApiResponse =
          await response.json();

        if (!result.success) {
          throw new Error("Unable to load destinations.");
        }

        setDestinations(result.data || []);

        setTotalPages(
          result.pagination?.totalPages || 1
        );

        setTotalDestinations(
          result.pagination?.total || 0
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Destination API error:", err);

        setDestinations([]);
        setTotalPages(1);
        setTotalDestinations(0);

        setError(
          "Unable to load destinations. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDestinations();

    return () => {
      controller.abort();
    };
  }, [
    search,
    division,
    district,
    category,
    featuredOnly,
    currentPage,
  ]);

  // ============================================================
  // UPDATE URL FILTERS
  // ============================================================

  const updateFilters = (
    newDivision: string,
    newDistrict: string,
    newCategory: string,
    newSearch: string,
    newFeatured = featuredOnly,
    newPage = 1
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

    if (newFeatured) {
      params.set("featured", "true");
    }

    if (newPage > 1) {
      params.set("page", String(newPage));
    }

    setSearchParams(params);
  };

  // ============================================================
  // DIVISION CHANGE
  // ============================================================

  const handleDivisionChange = (value: string) => {
    setDivision(value);
    setDistrict("All");
    setCurrentPage(1);

    updateFilters(
      value,
      "All",
      category,
      search,
      featuredOnly,
      1
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
      search,
      featuredOnly,
      1
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
      search,
      featuredOnly,
      1
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
      value,
      featuredOnly,
      1
    );
  };

  // ============================================================
  // FEATURED CHANGE
  // ============================================================

  const handleFeaturedChange = (checked: boolean) => {
    setFeaturedOnly(checked);
    setCurrentPage(1);

    updateFilters(
      division,
      district,
      category,
      search,
      checked,
      1
    );
  };

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    updateFilters(
      division,
      district,
      category,
      search,
      featuredOnly,
      page
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
              onChange={(e) =>
                handleFeaturedChange(e.target.checked)
              }
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
            {totalDestinations} destination
            {totalDestinations !== 1 ? "s" : ""} found
          </p>

          {district !== "All" && (
            <p className="rounded-full bg-[#e8f0e9] px-4 py-2 text-xs font-bold text-[#1f5b43]">
              Showing places in {district}
            </p>
          )}

        </div>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[26px] border border-[#e5e2d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
              >

                <div className="h-64 animate-pulse bg-[#e8e6de]" />

                <div className="space-y-4 p-6">

                  <div className="h-6 w-3/4 animate-pulse rounded bg-[#e8e6de]" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#e8e6de]" />

                  <div className="h-16 w-full animate-pulse rounded bg-[#e8e6de]" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-[#e8e6de]" />

                </div>

              </div>
            ))}

          </div>
        )}

        {/* ======================================================
            ERROR
        ====================================================== */}

        {!loading && error && (
          <div className="mt-8 rounded-[26px] border border-red-100 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
              !
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#26382f]">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setCurrentPage(1);

                updateFilters(
                  division,
                  district,
                  category,
                  search,
                  featuredOnly,
                  1
                );
              }}
              className="mt-6 rounded-xl bg-[#1f5b43] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174a36]"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ======================================================
            DESTINATION GRID
        ====================================================== */}

        {!loading &&
          !error &&
          destinations.length > 0 && (

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {destinations.map((destination) => {

                const isFeatured =
                  Boolean(Number(destination.featured));

                return (
                  <div
                    key={destination.id}
                    className="group overflow-hidden rounded-[26px] border border-[#e5e2d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,91,67,0.12)]"
                  >

                    {/* IMAGE */}

                    <div className="relative">

                      <img
                        src={destination.hero_image}
                        alt={destination.name}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {isFeatured && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#1f5b43] px-3 py-1.5 text-xs font-bold text-white">
                          Featured
                        </span>
                      )}

                      <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#26382f] shadow">
                        ★ {Number(destination.rating).toFixed(1)}
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
                        {destination.short_description}
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
                          href={destination.map_url}
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
                );
              })}

            </div>
          )}

        {/* ======================================================
            EMPTY STATE
        ====================================================== */}

        {!loading &&
          !error &&
          destinations.length === 0 && (

            <div className="mt-8 rounded-[26px] border border-dashed border-[#d8d5c9] bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3ee] text-2xl">
                🔎
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#26382f]">
                No destinations found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another district, category or search term.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDivision("All");
                  setDistrict("All");
                  setCategory("All");
                  setFeaturedOnly(false);
                  setCurrentPage(1);

                  setSearchParams({});
                }}
                className="mt-6 rounded-xl bg-[#1f5b43] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174a36]"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* ======================================================
            PAGINATION
        ====================================================== */}

        {!loading &&
          !error &&
          totalPages > 1 && (

            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

              <button
                type="button"
                onClick={() =>
                  handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1f5b43] shadow-sm transition hover:bg-[#edf3ee] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      type="button"
                      key={page}
                      onClick={() =>
                        handlePageChange(page)
                      }
                      className={`h-11 w-11 rounded-xl text-sm font-bold transition ${
                        currentPage === page
                          ? "bg-[#1f5b43] text-white"
                          : "bg-white text-[#26382f] hover:bg-[#edf3ee]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              <button
                type="button"
                onClick={() =>
                  handlePageChange(currentPage + 1)
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