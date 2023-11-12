import React, { useEffect } from "react";
import Profile from "assets-workspace/images/mouarsas.jpeg";
import SingleGameHeader from "../../layouts/single-game/single-game-header/single-game-header";
import SinglegameMain from "../../layouts/single-game/single-game-main/single-game-main";

interface PropsTye {
  _gameid: string;
}

export default function SingleGameContainer({
  _gameid,
}: PropsTye): JSX.Element {
  useEffect(() => {
    // TODO: fetch using id for seeting the players props
  }, []);

  return (
    <div className="w-full h-screen bg-[#1B1B1B] flex justify-start">
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        <SingleGameHeader
          player1={{
            fullName: "anas jaidi",
            username: "ajaidi",
            image: Profile,
            score: 999,
          }}
          player2={{
            fullName: "ouarsas mus",
            username: "oursas",
            score: -999,
            image: Profile,
          }}
        />

        <SinglegameMain />
      </div>
    </div>
  );
}
