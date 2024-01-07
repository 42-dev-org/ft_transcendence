"use client";
import { useParams } from "next/navigation";
import SingleGameContainer from "../../../../containers/single-game/single-game-container";

export default function InternalGamePage({ params }: { params: { id: string } }): JSX.Element {
  const { id } = useParams();
console.log("param: ", params.id)
  return <SingleGameContainer _gameid={params.id as string} />;
}
