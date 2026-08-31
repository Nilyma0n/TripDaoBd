import {
  MapPin,
  Hotel,
  Bus,
  Heart,
  CalendarDays,
  Users,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock3,
  Headphones,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const recommendations = [
    {
      name: "Bandarban Tour",
      rating: "4.8",
      reviews: "120",
      price: "8,500",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Sundarbans Safari",
      rating: "4.7",
      reviews: "98",
      price: "12,000",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Saint Martin Island",
      rating: "4.6",
      reviews: "76",
      price: "7,500",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Tea Garden Experience",
      rating: "4.9",
      reviews: "150",
      price: "6,000",
      image:
        "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <div className="space-y-10">

      {/* ================= GREETING ================= */}

      <section>
        <p className="text-[#d6ae52] text-sm mb-2">
          Good evening,
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Hello, {user?.full_name?.split(" ")[0] || "Traveler"}! 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Ready for your next adventure?
        </p>
      </section>


      {/* ================= STATISTICS ================= */}

      <section className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">

        {/* Places */}
        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <MapPin
                size={25}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                12
              </h2>

              <p className="text-slate-400 text-sm">
                Places Visited
              </p>
            </div>

          </div>

          <p className="text-emerald-400 text-xs mt-4">
            +2 this month
          </p>
        </div>


        {/* Hotels */}
        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">
              <Hotel
                size={25}
                className="text-[#d9b45c]"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                5
              </h2>

              <p className="text-slate-400 text-sm">
                Hotel Bookings
              </p>
            </div>

          </div>

          <p className="text-[#d9b45c] text-xs mt-4">
            +1 this month
          </p>
        </div>


        {/* Transport */}
        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bus
                size={25}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                8
              </h2>

              <p className="text-slate-400 text-sm">
                Transport Tickets
              </p>
            </div>

          </div>

          <p className="text-blue-400 text-xs mt-4">
            +3 this month
          </p>
        </div>


        {/* Wishlist */}
        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Heart
                size={25}
                className="text-red-400"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                14
              </h2>

              <p className="text-slate-400 text-sm">
                Wishlist Items
              </p>
            </div>

          </div>

          <p className="text-red-400 text-xs mt-4">
            +4 this month
          </p>
        </div>

      </section>


      {/* ================= UPCOMING TRIPS ================= */}

      <section>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">
            Upcoming Trips
          </h2>

          <button className="text-[#d9b45c] text-sm hover:underline">
            View All
          </button>
        </div>


        <div className="grid xl:grid-cols-3 gap-5">

          {/* Main Trip */}
          <div className="xl:col-span-2 bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden">

            <div className="grid md:grid-cols-2">

              <div
                className="min-h-[300px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=900&q=80')",
                }}
              />

              <div className="p-7">

                <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={13} />
                  Confirmed
                </span>

                <h3 className="text-2xl font-semibold mt-5">
                  Cox's Bazar Retreat
                </h3>

                <p className="text-slate-400 mt-2">
                  📍 Cox's Bazar, Bangladesh
                </p>

                <p className="text-slate-400 mt-3 text-sm">
                  <CalendarDays
                    size={15}
                    className="inline mr-2"
                  />
                  18 Aug 2026 - 21 Aug 2026
                </p>

                <p className="text-slate-400 mt-3 text-sm">
                  <Users
                    size={15}
                    className="inline mr-2"
                  />
                  2 Adults • 0 Children
                </p>

                <button className="mt-7 bg-[#d6ae52] hover:bg-[#e3be67] text-[#071817] px-5 py-3 rounded-xl font-semibold text-sm transition">
                  View Trip Details
                  <ArrowRight
                    size={16}
                    className="inline ml-2"
                  />
                </button>

              </div>

            </div>

          </div>


          {/* Small Trips */}
          <div className="space-y-4">

            <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-4 flex gap-4">

              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=300&q=80"
                alt="Sylhet"
                className="w-28 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="font-semibold">
                  Sylhet Valley Tour
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  10 Sep 2026
                </p>

                <span className="inline-block mt-3 text-xs text-emerald-400">
                  Confirmed
                </span>

              </div>

            </div>


            <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-4 flex gap-4">

              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&q=80"
                alt="Adventure"
                className="w-28 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="font-semibold">
                  Sylhet Adventure
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  05 Oct 2026
                </p>

                <span className="inline-flex items-center gap-1 mt-3 text-xs text-[#d9b45c]">
                  <Clock3 size={12} />
                  Pending
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= RECOMMENDED ================= */}

      <section>

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-semibold">
            Recommended For You
          </h2>

          <button className="text-[#d9b45c] text-sm hover:underline">
            View All
          </button>

        </div>


        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">

          {recommendations.map((item) => (

            <div
              key={item.name}
              className="group bg-[#0d2523] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >

              <div className="relative">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />

                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur flex items-center justify-center hover:bg-black/60">
                  <Heart size={17} />
                </button>

              </div>


              <div className="p-5">

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 mt-3">

                  <Star
                    size={14}
                    className="text-[#d9b45c] fill-[#d9b45c]"
                  />

                  <span className="text-sm">
                    {item.rating}
                  </span>

                  <span className="text-xs text-slate-500">
                    ({item.reviews})
                  </span>

                </div>


                <div className="flex items-center justify-between mt-5">

                  <span className="text-xs text-slate-500">
                    From
                  </span>

                  <span className="font-semibold text-[#d9b45c]">
                    ৳ {item.price}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= ACCOUNT / SUPPORT ================= */}

      <section className="grid lg:grid-cols-2 gap-5 pb-5">

        {/* Account */}
        <div className="bg-[#0d2523] border border-white/5 rounded-2xl p-7">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#c9a34e]/10 flex items-center justify-center">

              <Users
                size={24}
                className="text-[#d9b45c]"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                Your Account
              </h3>

              <p className="text-sm text-slate-500">
                Manage your personal information
              </p>

            </div>

          </div>


          <div className="grid grid-cols-2 gap-4 mt-6">

            <div>
              <p className="text-xs text-slate-500">
                Name
              </p>

              <p className="mt-1 text-sm">
                {user?.full_name || "Traveler"}
              </p>
            </div>


            <div>

              <p className="text-xs text-slate-500">
                Email
              </p>

              <p className="mt-1 text-sm truncate">
                {user?.email || "Not available"}
              </p>

            </div>

          </div>

        </div>


        {/* Support */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#163b35] to-[#0b2422] border border-[#c9a34e]/10 rounded-2xl p-7">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold">
                Need Help?
              </h3>

              <p className="text-sm text-slate-400 mt-2">
                Our support team is always here for you.
              </p>

              <button className="mt-5 border border-white/10 bg-black/10 hover:bg-[#d6ae52] hover:text-[#071817] px-4 py-2 rounded-lg text-sm transition">
                Contact Support
              </button>

            </div>

            <div className="w-20 h-20 rounded-full bg-[#c9a34e]/10 flex items-center justify-center">

              <Headphones
                size={38}
                className="text-[#d9b45c]"
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;