import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

import fallbackImage from "../../assets/images/hero.jpg";

const hotels = [
  {
    id: 1,
    name: "Sea Pearl Beach Resort",
    place: "Cox's Bazar",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "Grand Sultan Resort",
    place: "Sreemangal",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: 3,
    name: "Hotel Rose View",
    place: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  },
  {
    id: 4,
    name: "The Westin Dhaka",
    place: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
  },
  {
    id: 5,
    name: "Radisson Blu Chattogram",
    place: "Chattogram",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
  },
  {
    id: 6,
    name: "Hotel Star Pacific",
    place: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
  },
];

const PopularHotels = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#e99a36]">
              Places to stay
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#26382f] sm:text-4xl">
              Popular Hotels
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              Comfortable stays for your next Bangladesh adventure.
            </p>

          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1f5b43] transition hover:text-[#e99a36]"
          >
            View all hotels
            <ArrowRight size={17} />
          </Link>

        </div>

        {/* ================= HOTEL CARDS ================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {hotels.map((hotel) => (
            <Link
              key={hotel.id}
              to="/hotels"
              className="group overflow-hidden rounded-[26px] border border-[#e8e6de] bg-[#fbfaf7] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(31,91,67,0.10)]"
            >

              {/* IMAGE */}

              <div className="relative h-60 overflow-hidden">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#1f5b43] shadow-sm">
                  Featured stay
                </span>

                {/* Arrow */}

                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-lg transition duration-300 group-hover:bg-[#1f5b43] group-hover:text-white">
                  <ArrowRight size={17} />
                </span>

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <h3 className="text-xl font-bold text-[#293a32]">
                  {hotel.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} className="text-[#1f5b43]" />
                  <span>{hotel.place}</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#e8e6de] pt-4">

                  <span className="text-xs font-semibold text-gray-400">
                    Explore accommodation
                  </span>

                  <span className="text-sm font-bold text-[#1f5b43]">
                    View →
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </Container>
    </section>
  );
};

export default PopularHotels;