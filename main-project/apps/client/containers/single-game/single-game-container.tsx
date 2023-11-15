import React, { useEffect, useState } from "react";
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
 const [gamePlaying, setGamePlaying] = useState(true);

  return (
    <div className="relative w-full h-screen bg-[#1B1B1B] flex justify-center items-center flex-col">
      <div className="w-full lg:w-[700px] h-full flex flex-col justify-center items-center gap-4">
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
      {gamePlaying && 
        <div className="absolute w-full h-full  bg-white bg-opacity-5  backdrop-blur-sm flex justify-center items-center">
            <div className="pop-up bg-white rounded-md ">
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
            </div>
        </div>
      }
    </div>
  );
}
