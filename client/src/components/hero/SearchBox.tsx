import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";

const SearchBox = () => {
  return (
    <section className="relative z-20 -mt-20 px-5 sm:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="rounded-[24px] border border-white/70 bg-white p-3 shadow-[0_20px_60px_rgba(20,50,35,0.16)] sm:rounded-[28px] sm:p-4">

          <div className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr_auto]">

            {/* ================= WHERE ================= */}
            <div className="flex min-h-[64px] items-center gap-3 rounded-2xl px-4 transition hover:bg-[#f7f8f5]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3ee]">
                <MapPin
                  size={19}
                  className="text-[#1f5b43]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#24372e]">
                  Where to?
                </p>

                <input
                  type="text"
                  placeholder="Any destination"
                  className="mt-1 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* ================= CHECK IN ================= */}
            <div className="flex min-h-[64px] items-center gap-3 rounded-2xl px-4 transition hover:bg-[#f7f8f5]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3ee]">
                <CalendarDays
                  size={18}
                  className="text-[#1f5b43]"
                />
              </div>

              <div>
                <p className="text-[11px] font-bold text-[#24372e]">
                  Check in
                </p>

                <input
                  type="date"
                  className="mt-1 w-full bg-transparent text-xs text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* ================= CHECK OUT ================= */}
            <div className="flex min-h-[64px] items-center gap-3 rounded-2xl px-4 transition hover:bg-[#f7f8f5]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3ee]">
                <CalendarDays
                  size={18}
                  className="text-[#1f5b43]"
                />
              </div>

              <div>
                <p className="text-[11px] font-bold text-[#24372e]">
                  Check out
                </p>

                <input
                  type="date"
                  className="mt-1 w-full bg-transparent text-xs text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* ================= TRAVELERS ================= */}
            <div className="flex min-h-[64px] items-center gap-3 rounded-2xl px-4 transition hover:bg-[#f7f8f5]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3ee]">
                <Users
                  size={19}
                  className="text-[#1f5b43]"
                />
              </div>

              <div className="w-full">
                <p className="text-[11px] font-bold text-[#24372e]">
                  Travelers
                </p>

                <select
                  defaultValue="2"
                  className="mt-1 w-full cursor-pointer bg-transparent text-sm text-gray-600 outline-none"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5+ Travelers</option>
                </select>
              </div>
            </div>

            {/* ================= SEARCH ================= */}
            <button
              type="button"
              className="flex min-h-[60px] items-center justify-center gap-2 rounded-2xl bg-[#1f5b43] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#174a36] hover:shadow-lg lg:px-5"
            >
              <Search size={18} />

              <span className="lg:hidden">
                Search Destinations
              </span>

              <span className="hidden lg:inline">
                Search
              </span>

              <ArrowRight
                size={16}
                className="hidden sm:block lg:hidden"
              />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBox;