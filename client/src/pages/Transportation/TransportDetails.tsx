import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { transports } from "../../data/mock/transports";

const TransportDetails = () => {
  const { slug } = useParams();

  const transport = transports.find(
    (item) => item.slug === slug
  );

  if (!transport) {
    return (
      <div className="py-24 text-center text-2xl font-semibold">
        Transport not found.
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <Container>

        {/* Hero */}

        <img
          src={transport.image}
          alt={transport.name}
          className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
        />

        {/* Header */}

        <div className="mt-8 flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">
              {transport.type}
            </span>

            <h1 className="text-5xl font-bold mt-4">
              {transport.name}
            </h1>

            <p className="text-xl text-gray-600 mt-2">
              {transport.company}
            </p>

            <p className="mt-6 text-gray-700 leading-8">
              {transport.description}
            </p>

          </div>

          <div className="bg-blue-700 text-white rounded-3xl p-8 min-w-[280px]">

            <h2 className="text-4xl font-bold">
              ৳ {transport.price}
            </h2>

            <p className="mt-2">
              Ticket Price
            </p>

            <div className="mt-6 space-y-2">

              <p>
                ⭐ {transport.rating}
              </p>

              <p>
                {transport.totalReviews} Reviews
              </p>

            </div>

          </div>

        </div>

        {/* Information */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl mb-4">
              Route
            </h3>

            <p>📍 {transport.from}</p>

            <p className="mt-2">➡ {transport.to}</p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl mb-4">
              Schedule
            </h3>

            <p>Departure: {transport.departureTime}</p>

            <p className="mt-2">
              Arrival: {transport.arrivalTime}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-bold text-xl mb-4">
              Duration
            </h3>

            <p>{transport.duration}</p>

          </div>

        </div>

        {/* Amenities */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Facilities
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {transport.amenities.map((item) => (

              <div
                key={item}
                className="bg-white rounded-xl shadow p-5"
              >
                ✅ {item}
              </div>

            ))}

          </div>

        </div>

        {/* Gallery */}

        {transport.gallery.length > 0 && (

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-6">
              Gallery
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {transport.gallery.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt={`${transport.name}-${index}`}
                  className="rounded-2xl h-64 w-full object-cover shadow hover:scale-105 transition"
                />

              ))}

            </div>

          </div>

        )}

        {/* Buttons */}

        <div className="mt-16 flex flex-wrap gap-4">

          <a
            href={transport.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Book Ticket
          </a>

          <a
            href={transport.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-xl"
          >
            View Route Map
          </a>

          <Link
            to="/transportation"
            className="bg-gray-800 hover:bg-black text-white px-8 py-4 rounded-xl"
          >
            Back to Transportation
          </Link>

        </div>

      </Container>
    </section>
  );
};

export default TransportDetails;