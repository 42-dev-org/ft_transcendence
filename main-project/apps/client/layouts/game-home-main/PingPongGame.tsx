import React, { useEffect, useRef, useState, Fragment } from "react";
import GameModel from "./gameModel";
import socket from "./plugins/socket";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SingleGameHeader from "../single-game/single-game-header/single-game-header";

let game: GameModel;

function App({roomId}: {roomId: string}) {
  const gameBoard = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameScore, setGameScore] = useState<
    { score: number; winner: boolean }[]
  >([
    { score: 0, winner: false },
    { score: 0, winner: false },
  ]);
  
  useEffect(() => {
    game = new GameModel(gameBoard.current!);
    
    console.log('hi')
    
    window.addEventListener('resize', (e) => {
      console.log('hello', e)
    })



  }, []);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        socket.emit("move-paddle", { direction: "left", roomId: roomId });
      }
      if (e.key === "ArrowRight") {
        socket.emit("move-paddle", { direction: "right", roomId: roomId });
      }
    };

    window.addEventListener("keydown", callback);
    () => window.removeEventListener("keydown", callback);
  }, [roomId]);

  useEffect(() => {
    socket.on("ball-position", (data: any) => {
      console.log(data);
      game.moveBall(data);
    });

    // TODO: add type for game
    socket.on("start-game", (game: any) => {
      toast.success("game started")
      setGameId(roomId);
      setGameScore(game.players);
    });

    socket.on("game-status", ({ status }) => setStatus(status));
    socket.on("score", (data) => {
      setGameScore(data); // Update the score state when a new score is received
    });
    socket.on("paddle-position", (data: { y: number; x: number }[]) => {
      game.movePaddle(data[0], 1);
      game.movePaddle(data[1], 2);
    });
    return () => {
      game.destory();
      socket.off("ball-position");
      socket.off("paddle-position");
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
      {/* <div className="bg-[#1B1B1B] w-full  px-3 py-3 flex justify-between  items-center border border-[#B2F35F] rounded-lg">

      <SingleGameHeader 
       player1={{
        fullName: "anas jaidi",
        username: "ajaidi",
        image: "",
        score: gameScore[0].score,
      }}
      player2={{
        fullName: " mustapha",
        username: "mouarsas",
        score: gameScore[1].score,
        image: "",
      }}
      />
      </div> */}
      <div className="flex w-full h-full flex-col items-center">
        <div className="flex w-full h-full  justify-center border border-red-600" ref={gameBoard}></div>
        {/* // sm:w-[300px] sm:h-[500px] md:w-[400px] md:h-[600px] lg:w-[400px] lg:h-[700px] */}
      </div>
    </Fragment>
  );
  
}

export default App;