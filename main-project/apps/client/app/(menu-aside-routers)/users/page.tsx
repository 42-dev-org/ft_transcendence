"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import BannedCArd from "../../../components/Card/BannedCArd";
import FriendCard from "../../../components/Card/FriendCard";
import InviteCard from "../../../components/Card/FriendCard";
import InvitationsCard from "../../../components/Card/InvitationsCard";
import withAuth from "../../../hoc/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api";

type ComponeetType = "search" | "friends" | "invitations" | "blocked";

function Users(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [componenet, setComponent] = useState<ComponeetType>("search");
  const [searchString, setSearchString] = useState("");

  const queryParam =
    componenet == "friends"
      ? "Accepted"
      : componenet === "invitations"
      ? "Pending"
      : componenet === "blocked"
      ? "banned"
      : undefined;

  const usersQuery = useQuery({
    queryFn: (d) => {
      return api.api().users.findAll(d.queryKey[1] as any);
    },
    queryKey: ["get-with-type", queryParam],
    enabled: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (usersQuery.isFetched && usersQuery.data && usersQuery.data.data) {
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      console.log(usersQuery.data.data.data.data)
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      console.log('------------------------------------------------')
      setData(usersQuery.data?.data?.data);
    }
  }, [usersQuery.data]);

  const searchMutation = useMutation({
    mutationKey: ["search-mutation"],
    mutationFn: api.api().users.search,
    onSuccess: (d) => {
      setData(d.data.data);
    },
  });

  useEffect(() => {
    if (componenet === "search") searchMutation.mutate(searchString);
    else usersQuery.refetch();
  }, [componenet]);

  console.log(searchMutation.data?.data)

  const render = () => {

    if (componenet === "blocked") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {searchMutation.isSuccess &&
            data.map((user, idx) => (
              <BannedCArd {...user} 
              key={idx} 
              refetch={usersQuery.refetch}
              />
            ))}
        </div>
      );
    }

    if (componenet === "invitations") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {searchMutation.isSuccess &&
            data.map((inveted, idx) => (
              <InvitationsCard
                {...inveted}
                key={idx}
                refetch={usersQuery.refetch}
              />
            ))}
        </div>
      );
    }
    if (componenet === "friends") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {data.map((_, idx) => (
            <FriendCard {..._} key={idx} refetch={usersQuery.refetch} />
          ))}
        </div>
      );
    }
    if (componenet === "search") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {searchMutation.isSuccess &&
            data.map((user, idx) => (
              <Card
                {...user}
                key={idx}
                refetch={searchMutation.mutate.bind(null, searchString)}
              />
            ))}
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col overflow-y-auto  whitespace-nowrap  p-4 h-full w-full gap-5">
      {componenet === "search" && (
        <div className="flex md:flex-row flex-col w-full items-center justify-center gap-5 mt-10">
          <input
            className="h-10 p-1 px-3 rounded-md w-full "
            type="text"
            placeholder=" Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <Button
            onClick={() => searchMutation.mutate(searchString)}
            title="Search"
            className="w-full"
          />
        </div>
      )}
      <div>
        <select
          value={componenet}
          onChange={(e) => {
            setComponent(e.target.value as ComponeetType);
          }}
          className="block w-full p-2  text-sm rounded-lg bg-[#ffffff1a] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          {["search", "friends", "invitations", "blocked"].map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      {render()}
    </div>
  );
}


export default withAuth(Users);
