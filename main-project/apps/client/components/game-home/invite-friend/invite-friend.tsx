import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import FriendItem from "./friend-item";
import { friends } from "./data/friends";
import { user } from "./interface/user";
import SearchBar from "./search-bar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api";


const InviteFriend = () => {
  const [search, setSearch] = useState<string>('');
    const [friendsData, setFriendsData] = useState<user[]|null>(null);

  const usersQuery = useQuery({
    queryFn: (d) => {
      return api.api().users.findAll(d.queryKey[1] as any);
    },
    queryKey: ["get-with-type", 'Accepted'],
    enabled: false,
    staleTime: 0,
  });
  

  const searchMutation = useMutation({
    mutationKey: ['search-mutation'],
    mutationFn: api.api().users.search,
    onSuccess: (d) => {
      setFriendsData(d.data.data);
    },
  });
      // searchMutation.mutate('');


  useEffect(() => {
    // Call searchMutation.mutate() when the component mounts
    searchMutation.mutate(search);
  }, [searchMutation]);


    
  //   const handleMore = () => {
  //     setFriendsData(friends.slice(0, end + 10));
  //     setEnd(end + 10);
  // };

  return (
<div className="container h-full w-full flex justify-center items-center">
        <div className="flex w-full flex-col justify-center items-center px-4 gap-8 pt-7 ">
        <div className="w-full ">
          <SearchBar setFriendsData={setFriendsData} setSearch={setSearch} Search={search}/>
          <ul className="w-full flex flex-col justify-start items-center pt-5 gap-4 overflow-y-auto h-[300px] p-4">
          {friendsData ? (
              friendsData.map((friend: user) => (
                <FriendItem
                  key={friend.id}
                  firstName={friend.firstName}
                  login={friend.login}
                  profileImage={friend.profileImage}
                  id={friend.id}
                />
              ))
            ) : null}
</ul>

        </div>
        {/* <button className="bg-black w-full py-3 mt-4 rounded-lg text-white flex justify-center items-center" onClick={handleMore}>
          More
        </button> */}
      </div>
    </div>
  );
};

export default InviteFriend;
