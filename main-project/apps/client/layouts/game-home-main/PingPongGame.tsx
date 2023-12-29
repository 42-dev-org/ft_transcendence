import React, { useEffect, useRef, useState, Fragment } from "react";
import GameModel from "./gameModel";
import socket from "./plugins/socket";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let game: GameModel;

function App() {
  const gameBoard = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [gameId, setGameId] = useState("awbx");
  const [gameScore, setGameScore] = useState<
    { score: number; winner: boolean }[]
  >([
    { score: 0, winner: false },
    { score: 0, winner: false },
  ]);

  const joinGame = () => {
    console.log("join game");
    socket.emit("join-game");
  };

  const leaveGame = () => {
    socket.emit("leave-game");
  };

  useEffect(() => {
    game = new GameModel(gameBoard.current!);
  }, []);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        socket.emit("move-paddle", { direction: "left", roomId: gameId });
      }
      if (e.key === "ArrowRight") {
        socket.emit("move-paddle", { direction: "right", roomId: gameId });
      }
    };

    window.addEventListener("keydown", callback);
    () => window.removeEventListener("keydown", callback);
  }, [gameId]);

  useEffect(() => {
    socket.on("ball-position", (data: any) => {
      console.log(data);
      game.moveBall(data);
    });

    // TODO: add type for game
    socket.on("start-game", (game: any) => {
      toast.success("game started")
      setGameId(game.gameId);
      setGameScore(game.players);
    });


    socket.on("game-status", ({ status }) => setStatus(status));
    socket.on("score", (data) => {
      console.log(data);
      setGameScore(data); // Update the score state when a new score is received
    });
    socket.on("paddle-position", (data: { y: number; x: number }[]) => {
      game.movePaddle(data[0], 1);
      game.movePaddle(data[1], 2);
    });
    return () => {
      game.destory();
      socket.off("ball-position");
      // socket.off("paddle-position");
      socket.off("invite");
      socket.off("game-status");
      socket.off("score");
      socket.off("start-game");
    };
  }, [socket]);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col items-center">
        <div className="relative flex items-start">
          {/* <div className="flex flex-col mr-4">
            <span className="text-2xl mb-2">Player 1: {gameScore[0].score}</span>
            <button onClick={joinGame} className="w-44 mb-2">
              Join Queue
            </button>
            <button onClick={leaveGame} className="w-44 mb-2">
              Leave Game
            </button>
            <span className="text-2xl">Player 2: {gameScore[1].score}</span>
          </div> */}
           <button onClick={joinGame} className="">
              Join Queue
            </button>
            <button onClick={leaveGame} className="w-44 mb-2">
              Leave Game
            </button>
          <div className="w-[200px] h-[400px] sm:w-[300px] sm:h-[500px] md:w-[400px] md:h-[600px] lg:w-[400px] lg:h-[700px] " ref={gameBoard}></div>
          <div className="text-white mb-2">Status: {status}</div>
          {/* <div className="flex flex-col ml-4">
            <button
              className="w-44 mb-2"
              onClick={() => {
                // invite();
              }}
            >
              Invite
            </button>
            <button
              className="w-44 mb-2"
              onClick={() => {
                // acceptInvite();
              }}
            >
              Accept Invitation
            </button>
            <div className="text-white mb-2">Status: {status}</div>
          </div>
        </div> */}
        </div>
      </div>
    </Fragment>
  );
  
}

export default App;