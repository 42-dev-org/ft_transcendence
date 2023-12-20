"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import BannedCArd from "../../../components/Card/BannedCArd";
import FriendCard from "../../../components/Card/FriendCard";
import InviteCard from "../../../components/Card/FriendCard";
import InvitationsCard from "../../../components/Card/InvitationsCard";
import withAuth from "../../../hoc/auth";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api";

type ComponeetType = "search" | "friends" | "invitations" | "banned";

function Users(): JSX.Element {
  const [componenet, setComponent] = useState<ComponeetType>("search");
  const [searchString, setSearchString] = useState("");
  const searchMutation = useMutation({
    mutationKey: ["search-mutation"],
    mutationFn: api.api().users.search,
    onSuccess: (data) => {
      data.data;
    },
  });
  const getMutation = useMutation({
    mutationFn: api.api().users.findAll,
    mutationKey: ["get-with-type"],
  });

  useEffect(() => {
    if (componenet === "search") searchMutation.mutate(searchString);
    else if (componenet === "friends") getMutation.mutate("Accepted");
    else if (componenet === "invitations") getMutation.mutate("Pending");
  }, [componenet]);

  if (searchMutation.isSuccess) {
    console.log(searchMutation.data);
  }
  const render = () => {
    if (componenet === "banned") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {searchMutation.isSuccess &&
            searchMutation.data.data.map((user, idx) => (
              <BannedCArd {...user} key={idx} />
            ))}
        </div>
      );
    }
    if (componenet === "invitations") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {[...Array(8)].map((_, idx) => (
            <InvitationsCard
              url="https://cdn.intra.42.fr/users/65ffe01475f6bd67b479d2df8887d500/mouarsas.jpg"
              username="Mustapha Ouarsass"
              key={idx}
            />
          ))}
        </div>
      );
    }
    if (componenet === "friends") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {[...Array(8)].map((_, idx) => (
            <FriendCard
              url="https://cdn.intra.42.fr/users/e02b4524213b7315479b9ed9f3551093/amounach.jpg"
              username="Abdessalam Mounach"
              key={idx}
            />
          ))}
        </div>
      );
    }
    if (componenet === "search") {
      return (
        // <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
            {searchMutation.isSuccess &&
              searchMutation.data?.data?.data.map((user, idx) => (
                <Card {...user} key={idx} />
              ))}
          </div>
        // </div>
      );
    }
  };
  return (
    <div className="flex flex-col overflow-y-auto  whitespace-nowrap  p-4 h-full w-full gap-10">
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
        <select
          value={componenet}
          onChange={(e) => {
            setComponent(e.target.value as ComponeetType);
          }}
          className="block w-full p-2  text-sm rounded-lg bg-[#ffffff1a] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          {["search", "friends", "invitations", "banned"].map((el) => (
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
