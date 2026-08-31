const SearchBox = () => {
  return (
    <div className="relative -mt-20 z-20">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <div className="grid lg:grid-cols-5 gap-5">

          <input
            placeholder="Destination"
            className="border rounded-xl p-4"
          />

          <input
            type="date"
            className="border rounded-xl p-4"
          />

          <input
            type="date"
            className="border rounded-xl p-4"
          />

          <select className="border rounded-xl p-4">
            <option>Travelers</option>
            <option>1 Person</option>
            <option>2 People</option>
            <option>Family</option>
          </select>

          <button className="bg-blue-700 text-white rounded-xl">
            Search
          </button>

        </div>

      </div>
    </div>
  );
};

export default SearchBox;