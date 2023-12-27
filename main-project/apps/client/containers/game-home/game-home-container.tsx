import React from "react";
import HomeGameMain from "../../layouts/game-home-main/game-home-main";

export default function GameHomeContainer() :JSX.Element {
  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <HomeGameMain />
    </div>
  );
}
