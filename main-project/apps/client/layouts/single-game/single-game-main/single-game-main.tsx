import React from "react";
import PingPongGame from "../../game-home-main/PingPongGame";

export default function SinglegameMain({
  isActive, roomid,
}: {
  isActive: boolean, roomid: string,
}): JSX.Element {
  return (
    <div className="w-[80%] h-[80%] p-8">
      {isActive && <PingPongGame roomId={roomid} />}
    </div>
  );
}