import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
      <input
        type="text"
        placeholder="Search destinations..."
        className="flex-1 px-5 py-4 outline-none text-black"
      />

      <button className="bg-blue-700 text-white px-6">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchInput;