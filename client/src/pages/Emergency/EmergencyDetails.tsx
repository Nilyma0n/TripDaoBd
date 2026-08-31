import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { emergencyServices } from "../../data/mock/emergency";

const EmergencyDetails = () => {
  const { slug } = useParams();

  const service = emergencyServices.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <div className="py-24 text-center text-3xl font-bold">
        Emergency Service Not Found
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <Container>

        {/* Hero */}

        <img
          src={service.image}
          alt={service.name}
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
        />

        {/* Header */}

        <div className="mt-10 flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <span className="bg-red-600 text-white px-4 py-2 rounded-full">
              {service.type}
            </span>

            <h1 className="text-5xl font-bold mt-5">
              {service.name}
            </h1>

            <p className="mt-4 text-gray-600">
              📍 {service.address}
            </p>

            <p className="mt-2 text-gray-600">
              {service.district}, {service.division}
            </p>

          </div>

          <div className="bg-white shadow rounded-2xl p-8 min-w-[280px]">

            <h2 className="text-2xl font-bold mb-5">
              Contact
            </h2>

            <p>
              📞 {service.phone}
            </p>

            {service.email && (
              <p className="mt-3">
                ✉️ {service.email}
              </p>
            )}

            {service.website && (
              <a
                href={service.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-blue-700 underline"
              >
                Visit Website
              </a>
            )}

            <p className="mt-5 font-semibold text-green-700">
              {service.available24Hours
                ? "Open 24 Hours"
                : "Limited Hours"}
            </p>

          </div>

        </div>

        {/* Description */}

        <div className="bg-white rounded-3xl shadow mt-14 p-8">

          <h2 className="text-3xl font-bold mb-6">
            About This Service
          </h2>

          <p className="text-gray-700 leading-8">
            {service.description}
          </p>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-5 mt-12">

          <a
            href={`tel:${service.phone}`}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            📞 Call Now
          </a>

          <a
            href={service.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
          >
            🗺️ Open Google Maps
          </a>

        </div>

      </Container>
    </section>
  );
};

export default EmergencyDetails;