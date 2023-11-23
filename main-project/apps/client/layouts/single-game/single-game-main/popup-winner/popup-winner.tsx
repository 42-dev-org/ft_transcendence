// components/PopupWinner
import React from "react";
import Image from "next/image";
import trophyyy from "assets-workspace/images/trophyyy.png";
import { TbReload } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import SingleGameMainButton from "../single-game-main-button/single-game-main-button";
import Confetti from "../popup-gameOver/popup-confetti/popup-confetti";

export function PopupWinner() {
  return (
      <div className="absolute w-full h-full backdrop-blur-sm top-0 flex justify-center items-center ">
      <div className=" flex justify-center items-center w-full">
        <div className=" w-3/4 z-50 h-3/4 flex flex-col py-6 items-center backdrop-blur-2xl bg-white bg-opacity-25 rounded-lg text-yellow-300 font-mono text-2xl gap-10">
          <Image alt="gameGif" height={200} src={trophyyy} width={200} />
          Congratulation !
          <div className="w-[80%] flex flex-col md:flex-row h-full items-center text-white text-sm md:justify-between gap-6">
            {/* Add the Confetti component here */}
            <Confetti />
            <SingleGameMainButton
              title="PLAY AGAIN"
              link="#"
              ButtonIcon={TbReload}
              />
            <SingleGameMainButton
              title="BACK HOME"
              link="/profile"
              ButtonIcon={FaHome}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
