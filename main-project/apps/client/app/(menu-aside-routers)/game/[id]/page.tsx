"use client";
import { useParams } from "next/navigation";
import SingleGameContainer from "../../../../containers/single-game/single-game-container";

export default function InternalGamePage(): JSX.Element {
  const { id } = useParams();

  return <SingleGameContainer _gameid={id as string} />;
}
