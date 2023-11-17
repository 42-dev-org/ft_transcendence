import React from "react";
import Image from "next/image";
import gameover from "assets-workspace/images/GameOver.gif";
import { TbReload } from "react-icons/tb";
import { FaHome } from "react-icons/fa";

export default function SinglegameMain({
  isActive,
}: {
  isActive: boolean;
}): JSX.Element {
  return (
    <div className=" w-full h-[1024px] p-8">
      <div className="game-canvas  bg-black w-full h-full relative border-white border-[10px] flex flex-col justify-between  py-2 ">
        <div className="w-full h-4 flex justify-center items-center">
          <div className="w-20 h-full bg-white"></div>
        </div>
        <div className="w-full h-4 flex justify-center items-center">
          <div className="w-full h-full bg-[#B2F35F]"></div>
        </div>
        <div className="w-full h-4 flex justify-center items-center">
          <div className="w-20 h-full bg-white"></div>
        </div>

        {isActive && (
          <div className="absolute w-full h-full backdrop-blur-sm top-0 flex justify-center items-center ">
            <div className=" flex justify-center items-center w-full">
              <div className=" w-3/4 z-50 h-3/4 flex flex-col py-6 items-center backdrop-blur-2xl bg-white bg-opacity-25 rounded-lg text-white ">
                <Image alt="gameGif" height={200} src={gameover} width={400} />
                <div className="w-2/3 flex flex-col md:flex-row h-full items-center text-white text-sm md:justify-between gap-6">
                  <button className="bg-[#37412b] py-2 px-5 flex flex-row rounded-xl gap-2 items-center hover:bg-[#B2F35F] hover:text-black font-bold">
                    <TbReload />
                    PLAY AGAIN
                  </button>
                  <button className="bg-[#37412b] py-2 px-5 flex flex-row rounded-xl gap-2 items-center hover:bg-[#B2F35F] hover:text-black font-bold">
                    <FaHome />
                    BACK HOME
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
