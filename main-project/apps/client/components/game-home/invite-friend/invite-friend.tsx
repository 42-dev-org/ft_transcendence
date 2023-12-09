import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import FriendItem from "./friend-item";
import { friends } from "./data/friends";
import { user } from "./interface/user";
import SearchBar from "./search-bar";

const InviteFriend = () => {
  const [end, setEnd] = useState<number>(10);
  const [friendsData, setFriendsData] = useState<user[]>(friends.slice(0, end));


    
    const handleMore = () => {
      setFriendsData(friends.slice(0, end + 10));
      setEnd(end + 10);
  };

  return (
    <div className="container  h-full w-full flex justify-center items-center">
      <div className="flex w-full flex-col justify-center items-center px-4 gap-8 pt-7 ">
        <div className="w-full ">
          <SearchBar setFriendsData={setFriendsData} setEnd={setEnd} end={end}/>
          <ul className=" w-full flex flex-col justify-start items-center pt-10 gap-4">
            {friendsData.map((friend: user) => (
              <FriendItem
                key={friend.id}
                fullName={friend.fullName}
                username={friend.username}
                avatar={friend.avatar}
                id={friend.id}
              />
            ))}
          </ul>
        </div>
        <button className="bg-black w-full py-3 mt-4 rounded-lg text-white flex justify-center items-center" onClick={handleMore}>
          More
        </button>
      </div>
    </div>
  );
};

export default InviteFriend;
