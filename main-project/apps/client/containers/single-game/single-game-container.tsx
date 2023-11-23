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
            score: 9,
          }}
          player2={{
            fullName: " mustapha",
            username: "mouarsas",
            score: 5,
            image: Profile,
          }}
        />

        <SinglegameMain isActive={gamePlaying}/>

        
      </div>
    </div>
  );
}
