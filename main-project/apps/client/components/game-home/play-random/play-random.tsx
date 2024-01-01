import React, { useCallback, useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Avatar from "assets-workspace/images/mouarsas.jpeg";
import Image from "next/image";
import spinner from "assets-workspace/images/spinner.gif";
import { friends } from "../invite-friend/data/friends";
import { user } from "../invite-friend/interface/user";
import { useAppSelector } from "../../../store/store";


export default function PlayRandom(): JSX.Element {
  // TODO: re check this
  const [timer, setTimer] = useState(60); // Initial timer value in seconds

  // Function to decrement the timer every second
  const decrementTimer = useCallback(() => {
    if (timer > 0) {
      setTimer((prevTimer) => prevTimer - 1);
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(decrementTimer, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [timer, decrementTimer]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 mt-10">
          <div className="w-full h-40 flex rounded-lg border border-[#B2F35F] overflow-hidden flex-col">
            <Image
              className="w-full h-40 object-cover max-w-full"
              alt="profile"
              src={Avatar}
            />
            <div className="bg-[#1c1e21] w-full h-1/4 space-y-2 flex py-2 px-5 flex-col items-center">
              <span className="text-[#e4e6eb] capitalize">eheh</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-20 h-20 rounded-full border border-[#B2F35F]">
          <Image
            className="w-20 h-20 object-cover rounded-full"
            alt="profile"
            src={spinner}
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 mt-10">
          <div className="w-full h-40 flex rounded-lg border border-[#B2F35F] overflow-hidden flex-col">
            <Image
              className="w-full h-40 object-cover max-w-full"
              alt="profile"
              src={Avatar}
            />
            <div className="bg-[#1c1e21] w-full h-1/4 space-y-2 flex py-2 px-5 flex-col items-center">
              <span className="text-[#e4e6eb] capitalize">eheh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center">
        <p className="text-[#e4e6eb]">Queue: 2/20 waiting in the Queue</p>
        <span className="text-[#e4e6eb]">Time remaining: {timer} seconds</span>
      </div>
    </div>
  );
}
