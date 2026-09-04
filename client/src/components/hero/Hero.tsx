import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative">
      <div className="relative h-[560px] lg:h-[640px] overflow-hidden">
        <img
          src={heroImage}
          alt="Sunset over the forested hills of Bangladesh"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Scrim so dark text stays legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-transparent to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-5 lg:px-8 flex items-center">
          <div className="max-w-xl animate-rise-in">
            <p className="text-sm font-semibold tracking-wide text-ink-soft">
              Explore Bangladesh
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] text-ink text-balance">
              Discover Bangladesh.
              <br />
              <span className="text-forest">Travel it prepared.</span>
            </h1>

            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
              Beaches, hills and tea gardens matched with a place to stay,
              a way to get there, and the nearest help if you need it.
            </p>

            <Link
              to="/explore"
              className="mt-8 inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-ink px-7 py-3.5 rounded-full font-semibold transition-colors"
            >
              Explore now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;