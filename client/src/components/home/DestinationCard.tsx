import { Link } from "react-router-dom";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "../../types/destination";

interface Props {
  destination: Destination;
}

const DestinationCard = ({ destination }: Props) => {
  return (
    <article className="group overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(20,45,32,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,45,32,0.14)]">

      {/* ================= IMAGE ================= */}
      <div className="relative h-[290px] overflow-hidden">

        <img
          src={destination.heroImage}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#23362d] shadow-sm backdrop-blur-sm">
          <Star
            size={13}
            fill="currentColor"
            className="text-[#e99a36]"
          />

          {destination.rating}
        </div>

        {/* Category */}
        <div className="absolute right-4 top-4 rounded-full bg-[#1f5b43]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {destination.category}
        </div>

        {/* Bottom image content */}
        <div className="absolute bottom-4 left-4 right-4 text-white">

          <h3 className="text-2xl font-bold tracking-tight">
            {destination.name}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/85">
            <MapPin size={13} />
            <span>
              {destination.district}, {destination.division}
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">

        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {destination.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Best season
            </p>

            <p className="mt-1 text-sm font-semibold text-[#25372e]">
              {destination.bestSeason}
            </p>
          </div>

          <Link
            to={`/destination/${destination.slug}`}
            className="group/button flex h-11 w-11 items-center justify-center rounded-full bg-[#edf3ee] text-[#1f5b43] transition-all duration-300 hover:bg-[#1f5b43] hover:text-white"
            aria-label={`View ${destination.name}`}
          >
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;