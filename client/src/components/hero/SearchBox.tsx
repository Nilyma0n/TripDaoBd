import { Search, MapPin, Calendar, Users } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative -mt-8 z-20 px-5 lg:px-8">
      <div className="max-w-5xl mx-auto bg-paper-raised rounded-full shadow-xl border border-mist pl-6 pr-2 py-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-mist">
        <label className="flex items-center gap-3 py-2.5 lg:px-5 lg:flex-1">
          <MapPin size={18} className="text-forest shrink-0" />
          <span className="w-full">
            <span className="block text-xs text-ink-soft">Where to?</span>
            <input
              placeholder="Any destination"
              className="w-full outline-none text-ink placeholder:text-ink-soft/60 bg-transparent text-sm"
            />
          </span>
        </label>

        <label className="flex items-center gap-3 py-2.5 lg:px-5 lg:flex-1">
          <Calendar size={18} className="text-forest shrink-0" />
          <span className="w-full">
            <span className="block text-xs text-ink-soft">Check in</span>
            <input
              type="date"
              className="w-full outline-none text-ink-soft bg-transparent text-sm"
            />
          </span>
        </label>

        <label className="flex items-center gap-3 py-2.5 lg:px-5 lg:flex-1">
          <Calendar size={18} className="text-forest shrink-0" />
          <span className="w-full">
            <span className="block text-xs text-ink-soft">Check out</span>
            <input
              type="date"
              className="w-full outline-none text-ink-soft bg-transparent text-sm"
            />
          </span>
        </label>

        <label className="flex items-center gap-3 py-2.5 lg:px-5 lg:flex-1">
          <Users size={18} className="text-forest shrink-0" />
          <span className="w-full">
            <span className="block text-xs text-ink-soft">Travelers</span>
            <select className="w-full outline-none text-ink-soft bg-transparent text-sm">
              <option>travelers</option>
              <option>group</option>
              <option>2 travelers</option>
              <option>1 traveler</option>
              <option>3 travelers</option>
              <option>Family (4+)</option>
            </select>
          </span>
        </label>

        <button className="flex items-center justify-center gap-2 bg-forest hover:bg-forest-deep text-white px-6 py-3.5 rounded-full font-semibold transition-colors shrink-0">
          <Search size={17} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;