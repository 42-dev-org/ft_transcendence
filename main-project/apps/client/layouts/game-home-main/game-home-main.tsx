"use client";
import React, { useEffect, useState } from "react";
import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import OptionList from "../../components/game-home/option-list/option-list";
import GameWaiting from "../../components/game-home/game-waiting/game-waiting";
import Modal from "../../components/ui/modal";
import Avatar from "assets-workspace/images/robin_mqawed.jpeg";
import Image from "next/image";
import GameManualDialog from "../../components/game-home/game-manual/game-manual";

const levelsData = {
  label: "",
  items: [
    { label: "intermediate", key: Math.random() },
    { label: "beginner", key: Math.random() },
    { label: "advanced", key: Math.random() },
  ],
};

const gamesData = {
  label: "",
  items: [
    {
      icon: FaUserFriends,
      label: "Play vs friend",
      key: Math.random(),
    },
    {
      icon: GiPerspectiveDiceSixFacesRandom,
      label: "Play vs Random",
      key: Math.random(),
    },
    { icon: AiFillRobot, label: "Play vs bot", key: Math.random() },
  ],
};

export default function HomeGameMain(): JSX.Element {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showManual, setShowManual] = useState(false);

  const handleManualClick = () => {
    setShowManual(true);
  };

  const handleClose = () => {
    setShowManual(false);
  };



  useEffect(() => {
    if (step === 2) {
      setPlaying(true);
    }
  }, [step]);

  return (
    <div className="max-w-[820px] mx-auto h-fit rounded-xl bg-neutral-600 text-white text-center p-8">
      <div className="flex flex-col items-center">
        <Image
          src={Avatar}
          alt="User Avatar"
          className="rounded-full w-20 h-20 mb-4"
        />
        <p className="text-lg font-bold mb-2">Anas jaidi</p>
        <p className="text-white">Welcome! Start your game here.</p>
      </div>
      <div className="max-w-[820px] mx-auto h-fit rounded-xl bg-neutral-600 text-white text-center px-8 py-2">
        <OptionList data={step ? gamesData : levelsData} />
        <div
          className="bg-purple-700 text-white py-3 px-6 rounded-lg mt-8 cursor-pointer hover:bg-purple-800 font-bold"
          onClick={() => {
            setStep((prev) => prev + 1);
          }}
        >
          {step ? "Play" : "Next"}
        </div>
        <div
        className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 cursor-pointer hover:bg-gray-600 hover:text-white font-bold"
        onClick={handleManualClick}
      >
        <span className="bg-gray-700 rounded-full p-1 mr-2">?</span>Game Manual
      </div>

      {showManual && <GameManualDialog onClose={handleClose} />}
        {playing ? (
          <Modal>
            <GameWaiting />
            {/* <p className="text-black">anas jaidi</p>

          <button>next</button> */}
          </Modal>
        ) : null}
      </div>
    </div>
  );
}
