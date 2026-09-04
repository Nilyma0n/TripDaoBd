import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#183d2e] sm:min-h-[760px]">

      {/* ================= HERO IMAGE ================= */}
      <img
        src={heroImage}
        alt="Beautiful Bangladesh landscape"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ================= OVERLAYS ================= */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#102b20]/80 via-[#183d2e]/35 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* ================= DECORATIVE SHAPE ================= */}
      <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[#e99a36]/10 blur-3xl" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-32 pt-28 sm:pb-44 sm:min-h-[760px] sm:px-8 sm:pb-44">

        <div className="max-w-[700px]">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#e99a36]" />

            <p className="text-[11px] font-bold tracking-[3px] text-[#f5b45c] sm:text-xs">
              EXPLORE BANGLADESH
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-[42px] font-extrabold sm:text-6xl lg:text-[76px] leading-[1.04] tracking-[-1.5px] text-white sm:text-6xl lg:text-[76px]">

            Discover Nature.
            <br />

            <span className="text-[#e8a044]">
              Find Your Escape.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
            Discover breathtaking beaches, green hills, peaceful
            forests and hidden gems across Bangladesh.
            Your next adventure starts here.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">

            <Link
              to="/explore"
              className="group inline-flex items-center gap-3 rounded-full bg-[#e99a36] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d98925] hover:shadow-xl sm:px-7"
            >
              Explore Destinations

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/features"
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#183d2e]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#183d2e]">
                <Play size={12} fill="currentColor" />
              </span>

              Discover More
            </Link>
          </div>

          {/* Small trust line */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/75">
            <span>✓ Local destinations</span>
            <span>✓ Easy booking</span>
            <span>✓ Trusted travel experience</span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FADE ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f7f5ef] to-transparent" />
    </section>
  );
};

export default Hero;