"use client";
import React, { useEffect, useState } from "react";
import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { levelsData, gamesData } from "../../components/game-home/game-data/game-data";
import OptionList from "../../components/game-home/option-list/option-list";
import GameWaiting from "../../components/game-home/game-waiting/game-waiting";
import Modal from "../../components/ui/modal";
import Avatar from "assets-workspace/images/mouarsas.jpeg";
import Image from "next/image";
import GameManualDialog from "../../components/game-home/game-manual/game-manual";
import InviteFriend from "../../components/game-home/invite-friend/invite-friend";
import PlayRandom from "../../components/game-home/play-random/play-random";



export default function HomeGameMain(): JSX.Element {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [typeGame, setTypeGame] = useState<string | null>(null)
  const [levelGame, setLevelGame] = useState<string | null>(null)
  const [selected, setSelected] = useState<boolean>(false);

  const good: boolean = (levelGame != null && typeGame != null);


  const handleManualClick = () => {
    setShowManual(true);
  };

  const handleClose = () => {
    setShowManual(false);
  };



  useEffect(() => {
    if (step === 2 ) {
      setPlaying(true);
    }
  }, [step]);

  return (
    <div className="w-full mx-auto h-fit rounded-xl bg-neutral-600 text-white text-center p-8 content-center mr-8">
  <div className="flex flex-col items-center">
    <Image
      src={Avatar}
      alt="User Avatar"
      className="rounded-full w-20 h-20 mb-4"
    />
    <p className="text-lg font-bold mb-2">Anas jaidi</p>
    <p className="text-white">Welcome! Start your game here.</p>
  </div>
  <div
    className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 cursor-pointer hover:bg-gray-600 hover:text-white font-bold"
    onClick={handleManualClick}
  >
    <span className="bg-gray-700 rounded-full p-1 mr-2">?</span>Game Manual
  </div>
  <div className="max-w-[820px] mx-auto h-fit rounded-xl bg-neutral-600 text-white text-center px-8 py-2">
    {!selected && (
      <div className="flex flex-col md:flex-col">
        <OptionList data={levelsData} setLevelOrType={setLevelGame} />
        <OptionList data={gamesData} setLevelOrType={setTypeGame} />
      </div>
    )}
    {selected && (
      <>
        {typeGame === "friend" && <InviteFriend />}
        {typeGame === "random" && <PlayRandom />}
        {typeGame === "bot" && <div>bb</div>}
      </>
    )}
    <button
      className={`w-full ${
        good
          ? 'bg-purple-700 hover:bg-purple-800 cursor-pointer'
          : ' bg-purple-300 cursor-default'
      } text-white py-3 px-6 rounded-lg mt-8 cursor-pointer  font-bold`}
      onClick={() => {
        setSelected(!selected);
        if (selected == true) {
          setLevelGame(null);
          setTypeGame(null);
        }
      }}
      disabled={levelGame != null && typeGame != null ? false : true}
    >
      {selected ? "Cancel" : "Next"}
    </button>

    {showManual && <GameManualDialog onClose={handleClose} />}
    {playing ? <Modal><GameWaiting /></Modal> : null}
  </div>
</div>
  );
}
