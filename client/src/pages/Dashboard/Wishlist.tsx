import { useState } from "react";
import {
  Heart,
  MapPin,
  Star,
  ArrowRight,
  Compass,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WishlistItem {
  id: number;
  name: string;
  location: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
}

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Bandarban Tour",
      location: "Bandarban, Bangladesh",
      rating: "4.8",
      reviews: "120",
      price: "8,500",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Sundarbans Safari",
      location: "Khulna, Bangladesh",
      rating: "4.7",
      reviews: "98",
      price: "12,000",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Saint Martin Island",
      location: "Cox's Bazar, Bangladesh",
      rating: "4.6",
      reviews: "76",
      price: "7,500",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Sylhet Tea Gardens",
      location: "Sylhet, Bangladesh",
      rating: "4.9",
      reviews: "150",
      price: "6,000",
      image:
        "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="min-h-screen bg-[#071817] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>
            <p className="text-[#d6ae52] text-sm font-medium mb-2">
              Your Favorites
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Wishlist
            </h1>

            <p className="text-slate-400 mt-3 max-w-xl">
              Keep track of the places you've always wanted to explore.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0d2523] border border-white/5 rounded-xl px-4 py-3">
            <Heart
              size={18}
              className="text-[#d9b45c] fill-[#d9b45c]"
            />

            <span className="text-sm text-slate-300">
              {wishlistItems.length} Saved Places
            </span>
          </div>

        </div>

        {/* ================= WISHLIST ================= */}

        {wishlistItems.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="group bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a34e]/20 hover:-translate-y-1 transition-all duration-300"
              >

                {/* IMAGE */}

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* REMOVE */}

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    title="Remove from wishlist"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500/80 transition"
                  >
                    <Heart
                      size={18}
                      className="fill-[#d9b45c] text-[#d9b45c]"
                    />
                  </button>

                  {/* LOCATION */}

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs">
                    <MapPin
                      size={14}
                      className="text-[#d9b45c]"
                    />

                    {item.location}
                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h2 className="text-lg font-semibold group-hover:text-[#d9b45c] transition">
                    {item.name}
                  </h2>

                  {/* RATING */}

                  <div className="flex items-center gap-2 mt-3">

                    <Star
                      size={14}
                      className="text-[#d9b45c] fill-[#d9b45c]"
                    />

                    <span className="text-sm font-medium">
                      {item.rating}
                    </span>

                    <span className="text-xs text-slate-500">
                      ({item.reviews} reviews)
                    </span>

                  </div>

                  {/* PRICE */}

                  <div className="flex items-end justify-between mt-5">

                    <div>
                      <p className="text-xs text-slate-500">
                        Starting from
                      </p>

                      <p className="text-lg font-bold text-[#d9b45c] mt-1">
                        ৳ {item.price}
                      </p>
                    </div>

                    <span className="text-xs text-slate-500">
                      / person
                    </span>

                  </div>

                  {/* BUTTONS */}

                  <div className="grid grid-cols-[1fr_auto] gap-2 mt-5">

                    <button
                      type="button"
                      onClick={() => navigate("/explore")}
                      className="flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] py-2.5 rounded-xl text-sm font-semibold transition"
                    >
                      View Details
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      title="Remove"
                      className="w-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-400/20 transition"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY WISHLIST ================= */

          <div className="bg-[#0d2523] border border-white/5 rounded-3xl p-12 md:p-20 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-[#c9a34e]/10 border border-[#c9a34e]/20 flex items-center justify-center">

              <Heart
                size={34}
                className="text-[#d9b45c]"
              />

            </div>

            <h2 className="text-2xl font-semibold mt-7">
              Your wishlist is empty
            </h2>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              Start exploring Bangladesh and save the destinations you'd
              love to visit.
            </p>

            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="mt-7 inline-flex items-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
            >
              <Compass size={18} />
              Explore Destinations
              <ArrowRight size={16} />
            </button>

          </div>
        )}

        {/* ================= BOTTOM CTA ================= */}

        {wishlistItems.length > 0 && (

          <div className="mt-10 relative overflow-hidden rounded-3xl border border-[#c9a34e]/10 bg-gradient-to-br from-[#163b35] to-[#0b2422] p-7 md:p-9">

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <p className="text-[#d9b45c] text-sm font-medium">
                  Keep exploring
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                  Discover your next favorite destination.
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  Explore more beautiful places across Bangladesh.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-6 py-3 rounded-xl font-semibold transition"
              >
                <Compass size={18} />
                Explore Now
                <ArrowRight size={16} />
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default Wishlist;