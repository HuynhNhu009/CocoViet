import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "../utils/SearchUtil";

const SearchBar = ({ placeholder, dataList,parameter1, parameter2, dispatchFunction, setActive, navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = () => {
    Search(searchTerm, dataList,parameter1, parameter2, dispatchFunction);
    if (location.pathname !== navigateTo) navigate(navigateTo);
  };

  const handleBlur = () => {
    setTimeout(() => setSearchTerm(""), 1000);
  };

  return (
    <div className="mb-10">
      <div className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setActive && setActive(null)} 
          placeholder={placeholder}
          onBlur={handleBlur}
          className="border-green-600 border-3 shadow-md focus:outline-none rounded-tl-3xl flex-grow px-4 py-2"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="bg-green-600 shadow-md rounded-br-3xl p-2 px-8 cursor-pointer text-white"
          onClick={handleSubmit}
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white-500" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
