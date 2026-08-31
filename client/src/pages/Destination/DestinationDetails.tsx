import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { destinations } from "../../data/mock/destinations";

const DestinationDetails = () => {
  const { slug } = useParams();

  const destination = destinations.find(
    (item) => item.slug === slug
  );

  if (!destination) {
    return (
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Destination Not Found
            </h1>

            <Link
              to="/explore"
              className="inline-block mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
            >
              Back to Explore
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <Container>

        {/* Hero */}

        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-[500px] rounded-3xl object-cover"
        />

        {/* Title */}

        <div className="mt-10">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h1 className="text-5xl font-bold">
                {destination.name}
              </h1>

              <p className="mt-3 text-gray-600 text-lg">
                📍 {destination.district}, {destination.division}
              </p>

            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-yellow-500">
                ⭐ {destination.rating}
              </p>

              <p className="text-gray-500">
                {destination.totalReviews} Reviews
              </p>

            </div>

          </div>

        </div>

        {/* Description */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-5">
            About
          </h2>

          <p className="text-gray-700 leading-8">
            {destination.description}
          </p>

        </div>

        {/* Gallery */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">
            Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {destination.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${destination.name}-${index}`}
                className="rounded-2xl h-60 w-full object-cover"
              />
            ))}

          </div>

        </div>

        {/* Travel Information */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Travel Information
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold">Best Season</h3>
              <p className="mt-2">{destination.bestSeason}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold">Entry Fee</h3>
              <p className="mt-2">
                ৳ {destination.entryFee}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold">Opening Hours</h3>
              <p className="mt-2">
                {destination.openingHours}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold">Duration</h3>
              <p className="mt-2">
                {destination.estimatedDuration}
              </p>
            </div>

          </div>

        </div>

        {/* Highlights */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {destination.highlights.map((item) => (
              <div
                key={item}
                className="bg-blue-50 rounded-xl p-5"
              >
                ⭐ {item}
              </div>
            ))}

          </div>

        </div>

        {/* Things To Do */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Things To Do
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {destination.thingsToDo.map((item) => (
              <div
                key={item}
                className="bg-green-50 rounded-xl p-5"
              >
                ✅ {item}
              </div>
            ))}

          </div>

        </div>

        {/* Hotels */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Recommended Hotels
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {destination.hotels.map((hotel) => (

              <div
                key={hotel.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <h3 className="text-xl font-bold">
                  {hotel.name}
                </h3>

                <p className="mt-3">
                  ⭐ {hotel.rating}
                </p>

                <p className="mt-2 text-blue-700 font-bold">
                  ৳ {hotel.pricePerNight}/Night
                </p>

                <Link
                  to={`/hotels/${hotel.slug}`}
                  className="inline-block mt-5 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl"
                >
                  View Hotel
                </Link>

              </div>

            ))}

          </div>

        </div>

        {/* Nearby Hotels */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Nearby Hotels
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {destination.nearbyHotels.map((hotel) => (

              <div
                key={hotel}
                className="bg-white rounded-xl shadow p-5"
              >
                🏨 {hotel}
              </div>

            ))}

          </div>

        </div>

        {/* Reviews */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Visitor Reviews
          </h2>

          <div className="space-y-5">

            {destination.reviews.map((review, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow p-6"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {review.user}
                  </h3>

                  <span>
                    ⭐ {review.rating}
                  </span>

                </div>

                <p className="mt-4 text-gray-700">
                  {review.comment}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  {review.date}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Map */}

        <div className="mt-16 text-center">

          <a
            href={destination.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold"
          >
            📍 Open in Google Maps
          </a>

        </div>

      </Container>
    </section>
  );
};

export default DestinationDetails;