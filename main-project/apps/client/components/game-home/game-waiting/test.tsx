"use client";
import React, { useState } from "react";
import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";

interface WaitingState {
  isWaiting: boolean;
  message: string;
  icon: React.ReactElement;
}

interface WaitingStateMap {
  playVsFriend: WaitingState;
  playVsRandom: WaitingState;
  playVsBot: WaitingState;
}

const MapChoose: React.FC = () => {
  const [waitingState, setWaitingState] = useState<WaitingStateMap>({
    playVsFriend: {
      isWaiting: false,
      message: "Waiting for friend ...",
      icon: <FaUserFriends />,
    },
    playVsRandom: {
      isWaiting: false,
      message: "Finding a random opponent ...",
      icon: <GiPerspectiveDiceSixFacesRandom />,
    },
    playVsBot: {
      isWaiting: false,
      message: "Preparing to play against the bot ...",
      icon: <AiFillRobot />,
    },
  });

  const subscribeHandlersMap = {
    playVsFriend: () => {},
    playVsRandom: () => {},
    playVsBot: () => {},
  };

  const unsubscribeHandlersMap = {
    playVsFriend: () => {},
    playVsRandom: () => {},
    playVsBot: () => {},
  };

  const handleButtonClick = (
    type: keyof WaitingStateMap,
    action: "subscribe" | "unsubscribe"
  ) => {
    if (!Object.keys(subscribeHandlersMap).includes(type)) {
      // TODO: error case (Toast error)
    }

    if (action === "subscribe") {
      setWaitingState((prevState) => ({
        ...prevState,
        [type]: { ...prevState[type], isWaiting: true },
      }));
      subscribeHandlersMap[type]();
    } else if (action === "unsubscribe") {
      setWaitingState((prevState) => ({
        ...prevState,
        [type]: { ...prevState[type], isWaiting: false },
      }));
      unsubscribeHandlersMap[type]();
    }

    // Simulate an asynchronous operation (e.g., API call) that takes some time
  };

  return (
    <div className="w-full h-screen bg-[#1B1B1B] flex justify-start">
      {/* Left Sidebar */}
      <div className="w-0 md:w-96 h-full bg-red-200">ff</div>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="nav h-20 bg-slate-600 w-full"></div>
        <div className="container h-full w-full flex justify-center items-center">
          <div className="flex w-full flex-col justify-center items-center px-4 xl:px-44 2xl:px-72 gap-8 ">
            {/* Buttons */}
            <button
              className="w-full flex justify-start pl-6 gap-12 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full"
              onClick={() => handleButtonClick("playVsFriend", "subscribe")}
            >
              <FaUserFriends className="w-7 h-7" />
              Play vs friend
            </button>

            <button
              className="w-full flex justify-start pl-6 gap-12 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full"
              onClick={() => handleButtonClick("playVsRandom", "subscribe")}
            >
              <GiPerspectiveDiceSixFacesRandom className="w-7 h-7" />
              Play vs Random
            </button>

            <button
              className="w-full flex justify-start pl-6 gap-12 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full"
              onClick={() => handleButtonClick("playVsBot", "subscribe")}
            >
              <AiFillRobot className="w-7 h-7" />
              Play vs bot
            </button>
          </div>
        </div>
      </div>

      {/* Waiting dialogs */}
      {/* {Object.entries(waitingState).map(
        ([type, { isWaiting, message, icon }]) =>
          isWaiting && (
           
          )
      )} */}
    </div>
  );
};

export default MapChoose;
