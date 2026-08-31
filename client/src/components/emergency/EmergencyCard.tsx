import { Link } from "react-router-dom";
import type { EmergencyService } from "../../types/emergency";

interface Props {
  service: EmergencyService;
}

const EmergencyCard = ({ service }: Props) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-60 object-cover"
        />

        {service.featured && (
          <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}

        {service.available24Hours && (
          <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            24/7
          </span>
        )}
      </div>

      <div className="p-6">

        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {service.type}
        </span>

        <h2 className="text-2xl font-bold mt-4">
          {service.name}
        </h2>

        <p className="mt-3 text-gray-500">
          📍 {service.district}, {service.division}
        </p>

        <p className="mt-2 text-gray-600">
          📞 {service.phone}
        </p>

        <p className="mt-4 text-gray-600 line-clamp-3">
          {service.description}
        </p>

        <div className="flex gap-3 mt-6">

          <Link
            to={`/emergency/${service.slug}`}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-xl font-semibold"
          >
            Details
          </Link>

          <a
            href={service.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 hover:bg-gray-300 px-5 rounded-xl flex items-center justify-center"
          >
            🗺️
          </a>

        </div>

      </div>

    </div>
  );
};

export default EmergencyCard;