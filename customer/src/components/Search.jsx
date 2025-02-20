import {
    MagnifyingGlassIcon 
  } from "@heroicons/react/24/outline";
const Search = () => {
  return (
    <div className=" mb-10 ">
      <div className="flex w-full">
        <input
          type="text"
          name="email"
          placeholder="Search for..."
          className="border-green-600 border-3  shadow-md rounded-tl-3xl flex-grow px-4 py-2"
        />
        <span className="bg-green-600  shadow-md  rounded-br-3xl p-2 px-8 cursor-pointer text-white">
            <MagnifyingGlassIcon className="h-6 w-6 text-white-500 " />
        </span>
      </div>
    </div>
  );
};

export default Search;
