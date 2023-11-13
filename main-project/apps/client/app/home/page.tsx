import React from "react";
import "./home.css";

function Home(): JSX.Element {
  return (
    <div className="w-full h-screen bg-[#1B1B1B] flex items-center  text-white py-4 px-10">
      <div className="flex flex-col px-10 gap-10 xl:w-1/3 w-1/2 mb-40">
        <h1 className="text-5xl flex">
          PING<span className="text-[#b9ef72]">PONG</span>
        </h1>
        <p className="text-sm">
          Are you tired of toxic players and trolls? Do you want to know people
          who play like you? Follow your growth in games, make friends, create a
          team, win championships. Meet GAMEPLAYERS and have fun playing for
          real!
        </p>
        <button className="w-52 bg-[#b9ef72] rounded-md text-black text-xs whitespace-nowrap px-3 py-3 flex justify-center items-center hover:opacity-75">
          Login with Intra
        </button>
      </div>
    </div>
  );
}

export default Home;
