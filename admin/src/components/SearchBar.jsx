import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Search } from "../utils/SearchUtil"; // Import hàm tìm kiếm
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className=" items-center">
      <div className="flex w-full ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setActive && setActive(null)} 
          placeholder={placeholder}
          onBlur={handleBlur}
          className=" border-2 shadow-md focus:outline-none rounded-tl-3xl rounded-bl-3xl flex-grow ite px-4 py-1"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className="bg-black shadow-md rounded-br-3xl rounded-tr-3xl p-2 px-8 cursor-pointer text-white"
          onClick={handleSubmit}
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white-500" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
