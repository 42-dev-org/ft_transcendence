import React from "react";

import { PopupGameOver } from "./popup-gameOver/popup-gameOver";

export default function SinglegameMain({
  isActive,
}: {
  isActive: boolean;
}): JSX.Element {
  return (
    <div className=" w-full h-[1024px] p-8">
      <div className="game-canvas  bg-blue-950 w-full h-full relative border-[#B2F35F] border-[5px] flex flex-col justify-between  py-2 ">
        <div className="w-full h-4 flex justify-center items-center">
          <div className="w-20 h-full bg-white"></div>
        </div>
        <div className="w-full h-2 flex justify-center items-center">
          <div className="w-full h-1/3 bg-[#B2F35F]"></div>
        </div>
        <div className="w-full h-4 flex justify-center items-center">
          <div className="w-20 h-full bg-white"></div>
        </div>
        {isActive && <PopupGameOver />}
      </div>
    </div>
  );
}
