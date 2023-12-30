"use client";
import React, { useEffect, useState } from "react";
import {
  levelsData,
  gamesData,
} from "../../components/game-home/game-data/game-data";
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
  const [typeGame, setTypeGame] = useState<string | null>(null);
  const [levelGame, setLevelGame] = useState<string | null>(null);
  const [selected, setSelected] = useState<boolean>(false);

  const good: boolean = levelGame != null && typeGame != null;

  const handleManualClick = () => {
    setShowManual(true);
  };

  useEffect(() => {
    if (step === 2) {
      setPlaying(true);
    }
  }, [step]);

  return (
    <div className="flex flex-col w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto max-h-screen h-full rounded-xl bg-[#1B1B1B] text-white text-center pt-8">
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
        className=" py-2 px-6 rounded-lg mt-4 cursor-pointer bg-[#e5e7eb] hover:opacity-90 text-black font-bold "
        onClick={handleManualClick}
      >
        <span className="bg-[#e5e7eb]  rounded-full p-1 mr-2">?</span>Game
        Manual
      </div>
      <div className="w-full mx-auto h-fit rounded-xl bg-[#1B1B1B] text-white text-center px-2 py-2">
        {!selected && (
          <div className="flex flex-col md:flex-col">
            <OptionList data={levelsData} setLevelOrType={setLevelGame} />
            <OptionList data={gamesData} setLevelOrType={setTypeGame} />
          </div>
        )}
        {selected && (
          <div className="flex flex-col md:flex-col">
            {typeGame === "friend" && <InviteFriend />}
            {typeGame === "random" && <PlayRandom />}
            {typeGame === "bot" && <div>bb</div>}
          </div>
        )}
        <button
          className={`w-full mb-10 ${
            good
              ? "bg-purple-700 hover:bg-purple-800 cursor-pointer"
              : " bg-purple-300 cursor-default"
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

        {showManual && (
          <GameManualDialog
            onClose={(e) => {
              setShowManual(false);
            }}
          />
        )}
        {playing ? (
          <Modal>
            <GameWaiting />
          </Modal>
        ) : null}
      </div>
    </div>
  );
}
