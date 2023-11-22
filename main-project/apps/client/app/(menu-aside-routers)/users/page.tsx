"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import BannedCArd from "../../../components/Card/BannedCArd";
import FriendCard from "../../../components/Card/FriendCard";
import InviteCard from "../../../components/Card/FriendCard";
import InvitationsCard from "../../../components/Card/InvitationsCard";

type ComponeetType = "search" | "friends" | "invitations" | "banned";

export default function Users(): JSX.Element {
  const [componenet, setComponent] = useState<
    ComponeetType
  >("search");
  const render = () => {
    if (componenet === "banned") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {[...Array(8)].map((_, idx) => (
            <BannedCArd
              url="https://cdn.intra.42.fr/users/9eb5fce9483da7ea041fe0d76af575bc/ajaidi.jpg"
              username="Anas Jaidi"
              key={idx}
            />
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
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {[...Array(20)].map((_, idx) => (
            <Card
              url="https://cdn.intra.42.fr/users/ebae6bac7ffbfd12e22358678f3312eb/mbaazzy.jpg"
              username="Mohamed Baazzy"
              key={idx}
            />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col overflow-y-auto  whitespace-nowrap  p-4 h-full w-full gap-10">
      <div className="flex md:flex-row flex-col w-full items-center justify-center gap-5 mt-10">
        <input className="h-10 p-1 px-3 rounded-md w-full " />
        <Button onClick={() => {}} title="Search" className="w-full" />
        <select value={componenet} onChange={(e) => {setComponent(e.target.value as ComponeetType)}}  className="block w-full p-2  text-sm rounded-lg bg-[#ffffff1a] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
        {["search", "friends", "invitations", "banned"].map((el) => (
            <option
              key={el}
              value={el}
            >
              {el}
            </option>
          ))}
</select>
      </div>
      {render()}
    </div>
  );
}
