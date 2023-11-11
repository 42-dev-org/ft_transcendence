'use client';
import React, { useEffect, useState } from "react";
import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import OptionList from "../../../components/game-home/option-list/option-list";

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

  useEffect(() => {
    if (step === 2) {
        // TODO: intgration
    } 
  }, [step])

  return (
    <div className="max-w-[820px] mx-auto h-fit rounded-xl bg-neutral-600 text-white text-center p-8">
      <OptionList data={step ? gamesData : levelsData} />
      <div
        className="bg-purple-700 text-white py-3 px-6 rounded-lg mt-8 cursor-pointer hover:bg-purple-800 font-bold"
        onClick={() =>{ setStep(prev => prev + 1)}}
      >
        {step ? "Play" : "Next"}
      </div>
    </div>
  );
}
