import React from 'react'
import Image from "next/image";
import gameover from "assets-workspace/images/GameOver.gif";
import { TbReload } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import SingleGameMainButton from '../single-game-main-button/single-game-main-button';

export default function PopupGameOver() {
  return (
    <div className="absolute w-full h-full backdrop-blur-sm top-0 flex justify-center items-center ">
            <div className=" flex justify-center items-center w-full">
              <div className=" w-3/4 z-50 h-3/4 flex flex-col py-6 items-center backdrop-blur-2xl bg-white bg-opacity-25 rounded-lg text-white ">
                <Image alt="gameGif" height={200} src={gameover} width={400} />
                <div className="w-[80%] flex flex-col md:flex-row h-full items-center text-white text-sm md:justify-between gap-6">

                  <SingleGameMainButton title='PLAY AGAIN' link='#' ButtonIcon={TbReload} />
                  <SingleGameMainButton title='BACK HOME' link='/profile' ButtonIcon={FaHome} />
                </div>
              </div>
            </div>
    </div>
  );
}
