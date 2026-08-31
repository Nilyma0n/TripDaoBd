import { Link } from "react-router-dom";
import type { Transport } from "../../types/transport";

interface TransportCardProps {
  transport: Transport;
}

const TransportCard = ({ transport }: TransportCardProps) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative">
        <img
          src={transport.image}
          alt={transport.name}
          className="w-full h-64 object-cover"
        />

        {transport.featured && (
          <span className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}

        <span className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow font-semibold">
          ⭐ {transport.rating}
        </span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">{transport.name}</h2>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {transport.type}
          </span>
        </div>

        <p className="text-gray-500 mt-2">
          {transport.company}
        </p>

        <p className="mt-3 font-medium">
          📍 {transport.from} → {transport.to}
        </p>

        <p className="text-gray-500 mt-2">
          🕒 {transport.departureTime} - {transport.arrivalTime}
        </p>

        <p className="text-gray-500">
          ⏱ {transport.duration}
        </p>

        <p className="mt-4 text-2xl font-bold text-blue-700">
          ৳ {transport.price}
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to={`/transport/${transport.slug}`}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-xl font-semibold"
          >
            View Details
          </Link>

          <a
            href={transport.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center"
          >
            🗺️
          </a>
        </div>
      </div>
    </div>
  );
};

export default TransportCard;