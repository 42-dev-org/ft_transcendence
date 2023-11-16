import type { StaticImageData } from "next/image";
import SingleGamePlayerCard from "../../../components/single-game/single-game-player-card/single-game-player-card";
import SingleGameResult from "../../../components/single-game/single-game-result/single-game-result";

interface Player {
  username: string;
  fullName: string;
  image: string | StaticImageData;
  score: number;
}

interface PropsType {
  player1: Player;
  player2: Player;
}

export default function SingleGameHeader({
  player1,
  player2,
}: PropsType): JSX.Element {
  return (
    <div className="bg-[#1B1B1B] w-full  px-4 py-4 flex justify-between  items-center border-green-600 rounded-lg">
      <SingleGamePlayerCard
        direction="ltr"
        fullName={player1.fullName}
        image={player1.image}
        username={player1.username}
      />
      <SingleGameResult p1={player1.score} p2={player2.score} />

      <SingleGamePlayerCard
        direction="rtl"
        fullName={player2.fullName}
        image={player2.image}
        username={player2.username}
      />
    </div>
  );
}
