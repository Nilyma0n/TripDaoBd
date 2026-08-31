import { Link } from "react-router-dom";
import { Star, MapPin, Map } from "lucide-react";
import type { Destination } from "../../types/destination";

interface Props {
  destination: Destination;
}

const DestinationCard = ({ destination }: Props) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">

      <div className="relative overflow-hidden">

        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        <span className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
          {destination.category}
        </span>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {destination.name}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <MapPin size={18} />
          <span>
            {destination.district}, {destination.division}
          </span>
        </div>

        <div className="flex justify-between mt-4">

          <div className="flex items-center gap-1">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
            <span>{destination.rating}</span>
          </div>

          <span className="text-gray-500">
            {destination.bestSeason}
          </span>

        </div>

        <p className="mt-4 text-gray-600 line-clamp-3">
          {destination.shortDescription}
        </p>

        <div className="flex gap-3 mt-6">

          <Link
            to={`/destination/${destination.slug}`}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-center"
          >
            View Details
          </Link>

          <a
            href={destination.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl"
          >
            <Map size={22} />
          </a>

        </div>

      </div>

    </div>
  );
};

export default DestinationCard;