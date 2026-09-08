import {
  CalendarDays,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination.trim()) {
      params.set("search", destination.trim());
    }

    if (date) {
      params.set("date", date);
    }

    const query = params.toString();

    navigate(
      query
        ? `/explore?${query}`
        : "/explore"
    );
  };

  return (
    <section className="relative z-20 -mt-20 px-5 sm:px-6">

      <div className="mx-auto max-w-6xl">

        <div className="rounded-[28px] border border-white/60 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.14)]">

          <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_auto]">

            {/* ================= DESTINATION ================= */}

            <div className="flex items-center gap-3 rounded-2xl bg-[#f6f5ef] px-4 py-3.5">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7efe9] text-[#1f5b43]">
                <MapPin size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <label
                  htmlFor="destination"
                  className="block text-[10px] font-bold uppercase tracking-[1.2px] text-gray-400"
                >
                  Where to?
                </label>

                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(event) =>
                    setDestination(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search a destination"
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-[#293a32] outline-none placeholder:text-gray-400"
                />

              </div>

            </div>

            {/* ================= DATE ================= */}

            <div className="flex items-center gap-3 rounded-2xl bg-[#f6f5ef] px-4 py-3.5">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5eadc] text-[#e99a36]">
                <CalendarDays size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <label
                  htmlFor="travel-date"
                  className="block text-[10px] font-bold uppercase tracking-[1.2px] text-gray-400"
                >
                  Travel date
                </label>

                <input
                  id="travel-date"
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-[#293a32] outline-none"
                />

              </div>

            </div>

            {/* ================= SEARCH BUTTON ================= */}

            <button
              type="button"
              onClick={handleSearch}
              className="flex min-h-[68px] items-center justify-center gap-2 rounded-2xl bg-[#1f5b43] px-7 text-sm font-bold text-white transition hover:bg-[#174a36] md:min-w-[150px]"
            >
              <Search size={18} />

              <span>Search</span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SearchBox;