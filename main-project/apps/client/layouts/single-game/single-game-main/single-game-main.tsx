// import React from "react";

// import { PopupGameOver } from "./popup-gameOver/popup-gameOver";
// import { PopupWinner } from "./popup-winner/popup-winner";

// export default function SinglegameMain({
//   isActive,
// }: {
//   isActive: boolean;
// }): JSX.Element {
//   return (
//     <div className=" w-[70%] p-8" style={{aspectRatio: 9/16}}>

//       <div className="game-canvas  bg-blue-950 w-full h-full relative border-[#B2F35F] border-[5px] flex flex-col justify-between  py-2 ">
//         <div className="w-full h-4 flex justify-center items-center">
//           <div className="w-20 h-full bg-white"></div> {/* padddle2 */}
//         </div>
//         <div className="w-full h-2 flex justify-center items-center">
//           <div className="w-full h-1/3 bg-[#B2F35F]"></div>
//         </div>
//         <div className="w-full h-4 flex justify-center items-center">
//           <div className="w-20 h-full bg-white"></div> {/* padddle2 */}
//         </div>
//         {/* {isActive && <PopupWinner />} */}
//         {/* {isActive && <PopupGameOver />} */}
//       </div>
      
//     </div>
//   );
// }

import React from "react";
import PingPongGame from "../../game-home-main/PingPongGame";

export default function SinglegameMain({
  isActive,
}: {
  isActive: boolean;
}): JSX.Element {
  return (
    <div className="w-[70%] p-8" style={{ aspectRatio: 9 / 16 }}>
      {isActive && <PingPongGame />}
    </div>
  );
}
