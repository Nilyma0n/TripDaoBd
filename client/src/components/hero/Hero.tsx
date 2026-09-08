import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[680px] overflow-hidden sm:min-h-[720px]">

      {/* ================= BACKGROUND ================= */}

      <img
        src={heroImage}
        alt="Beautiful destination in Bangladesh"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ================= OVERLAY ================= */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* ================= DECORATIVE SHAPE ================= */}

      <div className="absolute -bottom-28 -right-28 hidden h-72 w-72 rounded-full border-[45px] border-white/10 lg:block" />

      {/* ================= CONTENT ================= */}

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 pb-32 pt-28 sm:min-h-[720px] sm:px-6">

        <div className="max-w-3xl text-white">

          {/* SMALL LABEL */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[1.8px] backdrop-blur-md">

            <Sparkles size={14} />

            Explore Bangladesh

          </div>

          {/* HEADING */}

          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">

            Discover nature.
            <br />

            <span className="text-[#f2b65f]">
              Find your escape.
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Explore beautiful beaches, peaceful hills, lush forests,
            tea gardens and hidden gems across Bangladesh.
          </p>

          {/* BUTTONS */}

          <div className="mt-8 flex flex-wrap items-center gap-3">

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-[#e99a36] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#d98927]"
            >
              Explore destinations

              <ArrowRight size={17} />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Discover TripDaoBD
            </Link>

          </div>

          {/* LOCATION INDICATOR */}

          <div className="mt-9 flex items-center gap-2 text-sm text-white/70">

            <MapPin
              size={16}
              className="text-[#f2b65f]"
            />

            <span>
              Discover destinations across Bangladesh
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;