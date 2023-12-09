// SearchBar.js
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchButton from "./search-button";
import { friends } from "./data/friends";
import { user } from "./interface/user";

const SearchBar = ({setFriendsData, end, setEnd} ) => {
  const [search, setSearch] = useState<string>("")


  const handleOnClick = async () => {
    const currentSearch = search; // Capture the current value of the search state
  
    try {
      const res = await fetch(`http://localhost:3001/api/search?key=${currentSearch}`, {
        method: "GET",
      });
      const result = await res.json();
      setEnd(10);
      setFriendsData(result.slice(0, 10));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  };


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
};

  return (
    <div className="flex flex-row gap-2">
            <label htmlFor="game search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <BiSearchAlt className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search for Friend"
                onChange={handleChange}
                value={search}
                required
              />
            </div>
            <button
              onClick={handleOnClick}
              type="button" // Specify the button type
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-[#00000097] focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </div>
  );
};

export default SearchBar;
