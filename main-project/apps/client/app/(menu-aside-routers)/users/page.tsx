"use client";
import React, { useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

export default function Users(): JSX.Element {
  const [componenet, setComponent] = useState<
    "search" | "friends" | "invitations" | "banned"
  >("search");
  const render = () => {
    if (componenet === "banned") {
      return <div className="text-white">banned</div>;
    }
    if (componenet === "invitations") {
      return <div className="text-white">invit</div>;
    }
    if (componenet === "friends") {
      return <div className="text-white">fri</div>;
    }
    if (componenet === "search") {
      return (
        <div className="grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full">
          {[...Array(20)].map((_, idx) => (
            <Card
              url="https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg"
              username="zakaria"
              key={idx}
            />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col  p-4 h-full w-full gap-10 text-white">
      <div className="flex w-full items-center justify-center gap-5 mt-10">
        <input className="h-10 p-1 px-3 w-1/2 rounded-md " />
        <Button onClick={() => {}} title="Search" className="w-40" />
        <select value={componenet} onChange={(e) => {setComponent(e.target.value)}} className="text-black">
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
