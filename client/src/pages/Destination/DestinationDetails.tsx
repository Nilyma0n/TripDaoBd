import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Car,
  Check,
  Clock3,
  ExternalLink,
  MapPin,
  Ship,
  Sparkles,
  Star,
  Ticket,
  Train,
  Bike,
  Navigation,
} from "lucide-react";

/* ============================================================
   API CONFIG
============================================================ */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ============================================================
   TYPES
============================================================ */

interface DestinationImage {
  id: number;
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
}

interface DestinationHighlight {
  id: number;
  highlight: string;
  sort_order?: number;
}

interface DestinationActivity {
  id: number;
  activity: string;
  sort_order?: number;
}

interface DestinationReview {
  id: number;
  user_id?: number | null;
  user_name?: string | null;
  rating: number;
  comment: string;
  review_date?: string | null;
  created_at?: string | null;
}

interface DestinationTransportOption {
  id: number;
  destination_id: number;
  transport_type: string;
  title: string;
  description?: string | null;
  estimated_time?: string | null;
  estimated_cost_min?: number | string | null;
  estimated_cost_max?: number | string | null;
  instruction?: string | null;
  sort_order?: number;
}

interface Destination {
  id: number;
  slug: string;
  name: string;
  district: string;
  division: string;
  category?: string | null;
  short_description?: string | null;
  description?: string | null;
  hero_image?: string | null;

  latitude?: number | null;
  longitude?: number | null;
  map_url?: string | null;

  best_season?: string | null;
  opening_hours?: string | null;
  entry_fee?: number | string | null;
  estimated_duration?: string | null;

  rating?: number | string | null;
  total_reviews?: number | null;

  featured?: boolean | number;
  popular?: boolean | number;

  created_at?: string;
  updated_at?: string;

  images?: DestinationImage[];
  highlights?: DestinationHighlight[];
  activities?: DestinationActivity[];
  reviews?: DestinationReview[];
}

interface DestinationApiResponse {
  success: boolean;
  data?: Destination;
  message?: string;
}

interface TransportApiResponse {
  success: boolean;
  data?: DestinationTransportOption[];
  message?: string;
}

/* ============================================================
   HELPERS
============================================================ */

const isTrue = (
  value: boolean | number | undefined | null
) => value === true || value === 1;

const formatRating = (
  rating: number | string | null | undefined
): string => {
  const value = Number(rating);

  if (!Number.isFinite(value)) {
    return "0.0";
  }

  return value.toFixed(1);
};

const formatEntryFee = (
  fee: number | string | null | undefined
): string => {
  if (fee === null || fee === undefined || fee === "") {
    return "Free";
  }

  const numericFee = Number(fee);

  if (!Number.isFinite(numericFee)) {
    return String(fee);
  }

  if (numericFee === 0) {
    return "Free";
  }

  return numericFee.toLocaleString("en-BD");
};

const formatCost = (
  value: number | string | null | undefined
): string => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return numericValue.toLocaleString("en-BD");
};

const formatReviewDate = (
  review: DestinationReview
): string => {
  const dateValue =
    review.review_date || review.created_at;

  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getTransportIcon = (
  transportType: string
) => {
  const type = transportType.toLowerCase();

  if (
    type.includes("train") ||
    type.includes("rail")
  ) {
    return Train;
  }

  if (
    type.includes("boat") ||
    type.includes("launch") ||
    type.includes("ship") ||
    type.includes("ferry")
  ) {
    return Ship;
  }

  if (
    type.includes("bus") ||
    type.includes("coach")
  ) {
    return Bus;
  }

  if (
    type.includes("bike") ||
    type.includes("cycle")
  ) {
    return Bike;
  }

  if (
    type.includes("cng") ||
    type.includes("car") ||
    type.includes("microbus") ||
    type.includes("private")
  ) {
    return Car;
  }

  return Navigation;
};

/* ============================================================
   LOADING SKELETON
============================================================ */

const DestinationDetailsSkeleton = () => {
  return (
    <section className="min-h-screen bg-[#f7f5ee] py-10 md:py-14">
      <Container>
        <div className="animate-pulse">

          {/* Breadcrumb */}
          <div className="mb-7 h-5 w-72 rounded bg-slate-200" />

          {/* Hero */}
          <div className="h-[420px] w-full rounded-[2rem] bg-slate-200 md:h-[560px]" />

          {/* Content */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>

              <div className="rounded-3xl bg-white p-7 shadow-sm md:p-9">
                <div className="h-8 w-1/2 rounded bg-slate-200" />
                <div className="mt-6 h-5 w-full rounded bg-slate-200" />
                <div className="mt-3 h-5 w-full rounded bg-slate-200" />
                <div className="mt-3 h-5 w-4/5 rounded bg-slate-200" />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-56 rounded-2xl bg-slate-200"
                    />
                  )
                )}
              </div>

              <div className="mt-10 rounded-3xl bg-white p-7 md:p-9">
                <div className="h-8 w-40 rounded bg-slate-200" />

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[1, 2, 3, 4].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-16 rounded-2xl bg-slate-200"
                      />
                    )
                  )}
                </div>
              </div>

            </div>

            <div>
              <div className="h-[480px] rounded-3xl bg-slate-800" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ============================================================
   ERROR STATE
============================================================ */

interface ErrorStateProps {
  title: string;
  message: string;
}

const ErrorState = ({
  title,
  message,
}: ErrorStateProps) => {
  return (
    <section className="min-h-[70vh] bg-[#f7f5ee] py-24">
      <Container>

        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <MapPin className="h-7 w-7 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            {message}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Link>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Try Again
            </button>

          </div>
        </div>

      </Container>
    </section>
  );
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const DestinationDetails = () => {
  const { slug } =
    useParams<{ slug: string }>();

  const [destination, setDestination] =
    useState<Destination | null>(null);

  const [
    transportOptions,
    setTransportOptions,
  ] = useState<
    DestinationTransportOption[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    transportLoading,
    setTransportLoading,
  ] = useState(true);

  const [notFound, setNotFound] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [
    transportError,
    setTransportError,
  ] = useState<string | null>(null);

  /* ============================================================
     FETCH DESTINATION
  ============================================================ */

  useEffect(() => {
    let isMounted = true;

    const fetchDestination = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setDestination(null);

        const response = await fetch(
          `${API_BASE_URL}/destinations/${encodeURIComponent(
            slug
          )}`
        );

        let result:
          | DestinationApiResponse
          | null = null;

        try {
          result = await response.json();
        } catch {
          throw new Error(
            "The server returned an invalid response."
          );
        }

        if (!response.ok) {
          if (response.status === 404) {
            if (isMounted) {
              setNotFound(true);
            }

            return;
          }

          throw new Error(
            result?.message ||
              "Failed to load destination details."
          );
        }

        if (
          !result?.success ||
          !result.data
        ) {
          throw new Error(
            result?.message ||
              "Destination data could not be loaded."
          );
        }

        if (isMounted) {
          setDestination(result.data);
        }
      } catch (err) {
        console.error(
          "Destination details fetch error:",
          err
        );

        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading the destination."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDestination();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ============================================================
     FETCH TRANSPORT OPTIONS
  ============================================================ */

  useEffect(() => {
    let isMounted = true;

    const fetchTransportOptions =
      async () => {
        if (!slug) {
          setTransportLoading(false);
          return;
        }

        try {
          setTransportLoading(true);
          setTransportError(null);
          setTransportOptions([]);

          const response = await fetch(
            `${API_BASE_URL}/destinations/${encodeURIComponent(
              slug
            )}/transport-options`
          );

          let result:
            | TransportApiResponse
            | null = null;

          try {
            result = await response.json();
          } catch {
            throw new Error(
              "The transport service returned an invalid response."
            );
          }

          if (!response.ok) {
            throw new Error(
              result?.message ||
                "Failed to load transport options."
            );
          }

          if (!result?.success) {
            throw new Error(
              result?.message ||
                "Transport options could not be loaded."
            );
          }

          if (isMounted) {
            setTransportOptions(
              result.data ?? []
            );
          }
        } catch (err) {
          console.error(
            "Transport options fetch error:",
            err
          );

          if (isMounted) {
            setTransportError(
              err instanceof Error
                ? err.message
                : "Unable to load travel options."
            );
          }
        } finally {
          if (isMounted) {
            setTransportLoading(false);
          }
        }
      };

    fetchTransportOptions();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ============================================================
     NORMALIZED DATA
  ============================================================ */

  const images = useMemo(
    () => destination?.images ?? [],
    [destination]
  );

  const highlights = useMemo(
    () => destination?.highlights ?? [],
    [destination]
  );

  const activities = useMemo(
    () => destination?.activities ?? [],
    [destination]
  );

  const reviews = useMemo(
    () => destination?.reviews ?? [],
    [destination]
  );

  const rating = formatRating(
    destination?.rating
  );

  const reviewCount =
    destination?.total_reviews ??
    reviews.length;

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return <DestinationDetailsSkeleton />;
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Destination"
        message={error}
      />
    );
  }

  /* ============================================================
     404
  ============================================================ */

  if (
    notFound ||
    !destination
  ) {
    return (
      <ErrorState
        title="Destination Not Found"
        message="We couldn't find the destination you're looking for. It may have been removed or the URL may be incorrect."
      />
    );
  }

  /* ============================================================
     HERO IMAGE
  ============================================================ */

  const heroImage =
    destination.hero_image ||
    images[0]?.image_url ||
    "";

  /* ============================================================
     MAP URL
  ============================================================ */

  const mapUrl =
    destination.map_url ||
    (destination.latitude !== null &&
    destination.latitude !== undefined &&
    destination.longitude !== null &&
    destination.longitude !== undefined
      ? `https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`
      : null);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section className="bg-[#f7f5ee] py-10 md:py-14">
      <Container>

        {/* ======================================================
            BREADCRUMB
        ====================================================== */}

        <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-500">

          <Link
            to="/"
            className="transition hover:text-emerald-700"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/explore"
            className="transition hover:text-emerald-700"
          >
            Explore
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-800">
            {destination.name}
          </span>

        </div>

        {/* ======================================================
            HERO
        ====================================================== */}

        <div className="relative overflow-hidden rounded-[2rem]">

          {heroImage ? (
            <img
              src={heroImage}
              alt={destination.name}
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          ) : (
            <div className="flex h-[420px] w-full items-center justify-center bg-slate-800 md:h-[560px]">

              <div className="text-center text-white">

                <MapPin className="mx-auto h-12 w-12 text-lime-300" />

                <p className="mt-3 text-lg font-semibold">
                  {destination.name}
                </p>

                <p className="mt-1 text-sm text-white/60">
                  No destination image available
                </p>

              </div>

            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-5 right-5 md:bottom-10 md:left-10 md:right-10">

            <div className="flex flex-wrap items-center gap-3">

              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-emerald-800 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Explore Bangladesh
              </span>

              {destination.category && (
                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {destination.category}
                </span>
              )}

              {isTrue(destination.featured) && (
                <span className="rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-slate-900">
                  Featured
                </span>
              )}

            </div>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              {destination.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/90 md:text-base">

              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />

                {destination.district},{" "}
                {destination.division}
              </span>

              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-300" />

                {rating}

                <span className="text-white/70">
                  ({reviewCount}{" "}
                  {reviewCount === 1
                    ? "review"
                    : "reviews"}
                  )
                </span>
              </span>

            </div>
          </div>
        </div>

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* ====================================================
              LEFT CONTENT
          ==================================================== */}

          <div>

            {/* ==================================================
                ABOUT
            ================================================== */}

            <div className="rounded-3xl bg-white p-7 shadow-sm md:p-9">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Sparkles className="h-5 w-5 text-emerald-700" />
                </div>

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                    Discover
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900">
                    About {destination.name}
                  </h2>

                </div>

              </div>

              <p className="leading-8 text-slate-600">
                {destination.description ||
                  destination.short_description ||
                  "No description is available for this destination yet."}
              </p>

            </div>

            {/* ==================================================
                GALLERY
            ================================================== */}

            <div className="mt-8">

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                    Visual journey
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Gallery
                  </h2>

                </div>

              </div>

              {images.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">

                  {images.map(
                    (image, index) => (
                      <div
                        key={image.id}
                        className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                      >

                        <img
                          src={image.image_url}
                          alt={
                            image.alt_text ||
                            `${destination.name} ${
                              index + 1
                            }`
                          }
                          loading="lazy"
                          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                    <MapPin className="h-6 w-6 text-emerald-700" />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">
                    No Gallery Images
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Photos for this destination haven't
                    been added yet.
                  </p>

                </div>
              )}

            </div>

            {/* ==================================================
                HIGHLIGHTS
            ================================================== */}

            <div className="mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-9">

              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Don't miss
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Highlights
              </h2>

              {highlights.length > 0 ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">

                  {highlights.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4"
                      >

                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                          <Check className="h-3.5 w-3.5" />
                        </div>

                        <span className="font-medium text-slate-700">
                          {item.highlight}
                        </span>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                  No highlights have been added for this
                  destination yet.
                </div>
              )}

            </div>

            {/* ==================================================
                THINGS TO DO
            ================================================== */}

            <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">

              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Experiences
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Things To Do
              </h2>

              {activities.length > 0 ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">

                  {activities.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >

                        <Check className="h-5 w-5 shrink-0 text-emerald-700" />

                        <span className="font-medium text-slate-700">
                          {item.activity}
                        </span>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                  No activities have been added for this
                  destination yet.
                </div>
              )}

            </div>

            {/* ==================================================
                HOW TO GET THERE
            ================================================== */}

            <div className="mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-9">

              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                    Plan your journey
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    How to Get There
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Explore available transportation options,
                    estimated travel time and indicative costs
                    for reaching {destination.name}.
                  </p>

                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 md:flex">
                  <Navigation className="h-6 w-6 text-emerald-700" />
                </div>

              </div>

              {/* TRANSPORT LOADING */}

              {transportLoading && (
                <div className="mt-7 grid gap-4 md:grid-cols-2">

                  {[1, 2].map(
                    (item) => (
                      <div
                        key={item}
                        className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-5"
                      >

                        <div className="flex gap-4">

                          <div className="h-12 w-12 rounded-xl bg-slate-200" />

                          <div className="flex-1">

                            <div className="h-5 w-32 rounded bg-slate-200" />

                            <div className="mt-3 h-4 w-24 rounded bg-slate-200" />

                          </div>

                        </div>

                        <div className="mt-5 h-4 w-full rounded bg-slate-200" />

                        <div className="mt-3 h-4 w-4/5 rounded bg-slate-200" />

                      </div>
                    )
                  )}

                </div>
              )}

              {/* TRANSPORT ERROR */}

              {!transportLoading &&
                transportError && (
                  <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <Navigation className="h-4 w-4 text-red-600" />
                      </div>

                      <div>

                        <h3 className="font-semibold text-red-800">
                          Travel information unavailable
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-red-700/80">
                          {transportError}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              {/* TRANSPORT OPTIONS */}

              {!transportLoading &&
                !transportError &&
                transportOptions.length > 0 && (
                  <div className="mt-7 grid gap-4 md:grid-cols-2">

                    {transportOptions.map(
                      (option) => {

                        const Icon =
                          getTransportIcon(
                            option.transport_type
                          );

                        const minCost =
                          formatCost(
                            option.estimated_cost_min
                          );

                        const maxCost =
                          formatCost(
                            option.estimated_cost_max
                          );

                        let costText =
                          "Cost not specified";

                        if (
                          minCost &&
                          maxCost
                        ) {
                          costText =
                            `৳ ${minCost} – ৳ ${maxCost}`;
                        } else if (minCost) {
                          costText =
                            `From ৳ ${minCost}`;
                        } else if (maxCost) {
                          costText =
                            `Up to ৳ ${maxCost}`;
                        }

                        return (
                          <div
                            key={option.id}
                            className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:bg-white hover:shadow-lg"
                          >

                            {/* HEADER */}

                            <div className="flex items-start justify-between gap-4">

                              <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">

                                  <Icon className="h-6 w-6" />

                                </div>

                                <div>

                                  <h3 className="text-lg font-bold text-slate-900">
                                    {option.title}
                                  </h3>

                                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                    {option.transport_type.replace(
                                      /[_-]/g,
                                      " "
                                    )}
                                  </p>

                                </div>

                              </div>

                              {option.estimated_time && (
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">

                                  <Clock3 className="h-3.5 w-3.5 text-emerald-700" />

                                  {option.estimated_time}

                                </span>
                              )}

                            </div>

                            {/* DESCRIPTION */}

                            {option.description && (
                              <p className="mt-5 text-sm leading-6 text-slate-600">
                                {option.description}
                              </p>
                            )}

                            {/* COST */}

                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">

                              <div>

                                <p className="text-xs font-medium text-slate-400">
                                  Estimated Cost
                                </p>

                                <p className="mt-1 font-bold text-emerald-700">
                                  {costText}
                                </p>

                              </div>

                              {option.estimated_time && (
                                <div className="text-right">

                                  <p className="text-xs font-medium text-slate-400">
                                    Travel Time
                                  </p>

                                  <p className="mt-1 font-semibold text-slate-700">
                                    {option.estimated_time}
                                  </p>

                                </div>
                              )}

                            </div>

                            {/* INSTRUCTION */}

                            {option.instruction && (
                              <div className="mt-4 rounded-xl bg-white p-4">

                                <div className="flex items-start gap-3">

                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />

                                  <div>

                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                      Route Instructions
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                      {option.instruction}
                                    </p>

                                  </div>

                                </div>

                              </div>
                            )}

                          </div>
                        );
                      }
                    )}

                  </div>
                )}

              {/* EMPTY STATE */}

              {!transportLoading &&
                !transportError &&
                transportOptions.length === 0 && (
                  <div className="mt-7 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <Navigation className="h-6 w-6 text-emerald-700" />
                    </div>

                    <h3 className="mt-4 font-bold text-slate-900">
                      Travel Information Coming Soon
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Transportation details for this
                      destination haven't been added yet.
                    </p>

                  </div>
                )}

              {/* MAP SHORTCUT */}

              {mapUrl && (
                <div className="mt-6 rounded-2xl bg-emerald-50 p-5">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                        <MapPin className="h-5 w-5 text-emerald-700" />
                      </div>

                      <div>

                        <h3 className="font-bold text-slate-900">
                          Need directions?
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          Open the destination location directly
                          in Google Maps.
                        </p>

                      </div>

                    </div>

                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      <MapPin className="h-4 w-4" />
                      Get Directions
                      <ExternalLink className="h-4 w-4" />
                    </a>

                  </div>

                </div>
              )}

            </div>

            {/* ==================================================
                REVIEWS
            ================================================== */}

            <div className="mt-10">

              <div className="mb-5">

                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Traveler feedback
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Visitor Reviews
                </h2>

              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">

                  {reviews.map(
                    (review) => (
                      <div
                        key={review.id}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                      >

                        <div className="flex flex-wrap items-start justify-between gap-3">

                          <div>

                            <h3 className="font-bold text-slate-900">
                              {review.user_name ||
                                "Traveler"}
                            </h3>

                            {formatReviewDate(
                              review
                            ) && (
                              <p className="mt-1 text-sm text-slate-400">
                                {formatReviewDate(
                                  review
                                )}
                              </p>
                            )}

                          </div>

                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">

                            <Star className="h-4 w-4 fill-current" />

                            {formatRating(
                              review.rating
                            )}

                          </span>

                        </div>

                        <p className="mt-5 leading-7 text-slate-600">
                          {review.comment}
                        </p>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
                    <Star className="h-6 w-6 text-amber-500" />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">
                    No Reviews Yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Be one of the first travelers to share
                    your experience.
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">

              <div className="p-7">

                <p className="text-sm font-semibold uppercase tracking-wider text-lime-300">
                  Plan your visit
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Travel Information
                </h2>

                <div className="mt-7 space-y-5">

                  {/* BEST SEASON */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>

                      <p className="text-sm text-white/60">
                        Best Season
                      </p>

                      <p className="mt-1 font-semibold">
                        {destination.best_season ||
                          "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* ENTRY FEE */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Ticket className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>

                      <p className="text-sm text-white/60">
                        Entry Fee
                      </p>

                      <p className="mt-1 font-semibold">

                        {destination.entry_fee ===
                          null ||
                        destination.entry_fee ===
                          undefined ||
                        destination.entry_fee ===
                          ""
                          ? "Not specified"
                          : `৳ ${formatEntryFee(
                              destination.entry_fee
                            )}`}

                      </p>

                    </div>

                  </div>

                  {/* OPENING HOURS */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock3 className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>

                      <p className="text-sm text-white/60">
                        Opening Hours
                      </p>

                      <p className="mt-1 font-semibold">
                        {destination.opening_hours ||
                          "Not specified"}
                      </p>

                    </div>

                  </div>

                  {/* SUGGESTED DURATION */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock3 className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>

                      <p className="text-sm text-white/60">
                        Suggested Duration
                      </p>

                      <p className="mt-1 font-semibold">
                        {destination.estimated_duration ||
                          "Not specified"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* GOOGLE MAPS */}

                {mapUrl ? (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3.5 font-bold text-slate-900 transition hover:bg-lime-200"
                  >

                    <MapPin className="h-5 w-5" />

                    Open in Google Maps

                    <ExternalLink className="h-4 w-4" />

                  </a>
                ) : (
                  <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-center text-sm text-white/50">
                    Map location unavailable
                  </div>
                )}

                {/* EXPLORE MORE */}

                <Link
                  to="/explore"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore More
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </Container>
    </section>
  );
};

export default DestinationDetails;