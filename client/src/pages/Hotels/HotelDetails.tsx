import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Wallet,
  Map,
  Calendar,
  Wifi,
} from "lucide-react";

import { hotels } from "../../data/mock/hotels";
import Container from "../../components/ui/Container";

const HotelDetails = () => {
  const { slug } = useParams();

  const hotel = hotels.find((item) => item.slug === slug);

  if (!hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl font-bold">
        Hotel Not Found
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">

      <Container>

        {/* Hero Image */}

        <div className="overflow-hidden rounded-3xl shadow-xl">

          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-[520px] w-full object-cover"
          />

        </div>

        {/* Hotel Info */}

        <div className="mt-10 flex flex-col lg:flex-row justify-between gap-10">

          <div className="flex-1">

            <h1 className="text-5xl font-extrabold">
              {hotel.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-6 text-gray-600">

              <div className="flex items-center gap-2">
                <MapPin size={20} />
                {hotel.district}, {hotel.division}
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />
                {hotel.rating} ({hotel.totalReviews} Reviews)
              </div>

              <div className="flex items-center gap-2">
                <Wallet size={20} />
                ৳ {hotel.pricePerNight} / Night
              </div>

            </div>

            <p className="mt-8 text-lg leading-8 text-gray-700">
              {hotel.description}
            </p>

          </div>

          {/* Booking Card */}

          <div className="w-full lg:w-[350px] rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="text-3xl font-bold">
              Book This Hotel
            </h2>

            <p className="mt-3 text-gray-500">
              Reserve your room quickly and securely.
            </p>

            <div className="mt-8">

              <h3 className="text-4xl font-bold text-blue-700">
                ৳ {hotel.pricePerNight}
              </h3>

              <p className="text-gray-500">
                Per Night
              </p>

            </div>

            <div className="mt-8 space-y-4">

              <Link
                to="/booking"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 font-semibold text-white hover:bg-blue-800"
              >
                <Calendar size={20} />
                Book Now
              </Link>

              <a
                href={hotel.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 py-4 font-semibold hover:bg-gray-300"
              >
                <Map size={20} />
                View on Google Maps
              </a>

            </div>

          </div>

        </div>

        {/* Amenities */}

        <div className="mt-20">

          <h2 className="text-4xl font-bold">
            Hotel Amenities
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {hotel.amenities.map((item) => (

              <div
                key={item}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Wifi
                  size={28}
                  className="text-blue-700"
                />

                <h3 className="mt-4 text-lg font-semibold">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Gallery */}

        {hotel.gallery.length > 0 && (

          <div className="mt-20">

            <h2 className="text-4xl font-bold">
              Hotel Gallery
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">

              {hotel.gallery.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  className="h-64 w-full rounded-2xl object-cover shadow-md transition hover:scale-105"
                />

              ))}

            </div>

          </div>

        )}

      </Container>

    </section>
  );
};

export default HotelDetails;