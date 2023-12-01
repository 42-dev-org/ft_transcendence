// SearchBar.js
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchButton from "./search-button";
import { friends } from "./data/friends";
import { user } from "./interface/user";

const SearchBar = ({setFriendsData, end, setEnd} ) => {
const [search, setSearch] = useState<string>("")


const handelOnClick = () =>  {
  
  const fetchData = async () => {

  const res = await fetch('http://localhost:3001/api/search?key='+search, {
    method: "GET",
  });
  const result = await res.json();
  setEnd(10);
  setFriendsData(result.slice(0, end))
  }
  fetchData();
}


    const handleChange =  (e: any) =>
    {
        setSearch(e.target.value);
        
        // if(e.target.value == ""){
        //     setEnd(10);
        // }
        // // friends.slice(0, end)
        // setFriendsData(friends.filter((friend: user) => friend.username.startsWith(e.target.value)).slice(0, end));
    }
  return (
    // <form className="flex items-center">
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
      <SearchButton handleChange={handelOnClick}/>
      </div>
    // </form>
  );
};

export default SearchBar;
