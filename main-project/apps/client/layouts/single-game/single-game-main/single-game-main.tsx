import React from "react";

export default function SinglegameMain({isActive} : {isActive: boolean}): JSX.Element {



  return (
    <div className=" w-full h-[1024px] p-8">
      <div className="game-canvas  bg-[#c2c6c5] w-full h-full relative">
        xxxxx
          {isActive && 
          <div className="absolute  top-0 flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.1)]">
            <div className=" w-3/4 z-50 h-3/4 flex flex-col py-5 items-center bg-black rounded-lg text-white">
              GAME OVER
                <div className="w-2/3 flex flex-row h-2/3  items-center text-white">
                    here
                </div>
            </div> 
            </div>
          }
      </div>
    </div>
  );
}
