import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { destinations } from "../../data/mock/destinations";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  Hotel,
  MapPin,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";

const DestinationDetails = () => {
  const { slug } = useParams();

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    return (
      <section className="min-h-[70vh] bg-[#f7f5ee] py-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <MapPin className="h-7 w-7 text-emerald-700" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Destination Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              We couldn't find the destination you're looking for.
            </p>

            <Link
              to="/explore"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f5ee] py-10 md:py-14">
      <Container>
        {/* Breadcrumb */}
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

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="h-[420px] w-full object-cover md:h-[560px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute left-5 right-5 bottom-6 md:left-10 md:right-10 md:bottom-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-emerald-800 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Explore Bangladesh
              </span>

              {destination.featured && (
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
                {destination.district}, {destination.division}
              </span>

              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-300" />
                {destination.rating}
                <span className="text-white/70">
                  ({destination.totalReviews} reviews)
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left */}
          <div>
            {/* About */}
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
                {destination.description}
              </p>
            </div>

            {/* Gallery */}
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

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {destination.images.map((image, index) => (
                  <div
                    key={index}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${destination.name}-${index + 1}`}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-9">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Don't miss
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Highlights
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {destination.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to do */}
            <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Experiences
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Things To Do
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {destination.thingsToDo.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <Check className="h-5 w-5 shrink-0 text-emerald-700" />

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            <div className="mt-8">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Stay nearby
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Recommended Hotels
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {destination.hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                      <Hotel className="h-5 w-5 text-emerald-700" />
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      {hotel.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      {hotel.rating}
                    </div>

                    <p className="mt-4 text-lg font-bold text-emerald-700">
                      ৳ {hotel.pricePerNight}
                      <span className="ml-1 text-sm font-normal text-slate-500">
                        / night
                      </span>
                    </p>

                    <Link
                      to={`/hotels/${hotel.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                      View Hotel
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby hotels */}
            <div className="mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <Hotel className="h-5 w-5 text-emerald-700" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Nearby Hotels
                </h2>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {destination.nearbyHotels.map((hotel) => (
                  <div
                    key={hotel}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium text-slate-700"
                  >
                    {hotel}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Traveler feedback
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Visitor Reviews
                </h2>
              </div>

              <div className="space-y-4">
                {destination.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {review.user}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {review.date}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating}
                      </span>
                    </div>

                    <p className="mt-5 leading-7 text-slate-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
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
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>
                      <p className="text-sm text-white/60">
                        Best Season
                      </p>
                      <p className="mt-1 font-semibold">
                        {destination.bestSeason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Ticket className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>
                      <p className="text-sm text-white/60">
                        Entry Fee
                      </p>
                      <p className="mt-1 font-semibold">
                        ৳ {destination.entryFee}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock3 className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>
                      <p className="text-sm text-white/60">
                        Opening Hours
                      </p>
                      <p className="mt-1 font-semibold">
                        {destination.openingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock3 className="h-5 w-5 text-lime-300" />
                    </div>

                    <div>
                      <p className="text-sm text-white/60">
                        Suggested Duration
                      </p>
                      <p className="mt-1 font-semibold">
                        {destination.estimatedDuration}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={destination.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3.5 font-bold text-slate-900 transition hover:bg-lime-200"
                >
                  <MapPin className="h-5 w-5" />
                  Open in Google Maps
                  <ExternalLink className="h-4 w-4" />
                </a>

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