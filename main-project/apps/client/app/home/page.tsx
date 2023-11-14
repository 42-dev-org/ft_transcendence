import React from "react";
import  styles from "./home.css";
import IMAge from 'assets-workspace/svg/Vector.svg';
import Image from 'next/image';
import Pong from "../../components/pong";

function Home(): JSX.Element {

  return (
    <div className="p-8 bg-[#1B1B1B] font-family:'Nunito', sans-serif" >

      <div className={styles['logo-container']}>

          <div className="flex flex-row  normal-case  text-xl bg-[#1B1B1B] border-none text-white">
            <Image alt="logo image" src={IMAge} height={28} width={39} />
            <span className='ml-4'>
              Pong Game
            </span>
          </div>
      </div>

         <div className="w-full h-screen bg-[#1B1B1B] flex items-center  text-white py-4 px-10">
            <div className="flex flex-col px-10 gap-10 xl:w-1/3 w-1/2 mb-40">
              <h1 className="text-5xl flex ">
                PING<span className="text-[#b9ef72]">PONG</span>
              </h1>
              <p className="text-sm">
                Are you tired of toxic players and trolls? Do you want to know people
                who play like you? Follow your growth in games, make friends, create a
                team, win championships. Meet GAMEPLAYERS and have fun playing for
                real!
              </p>
              <button className="w-52 bg-[#b9ef72] rounded-md text-black text-xs whitespace-nowrap px-3 py-3 flex justify-center items-center hover:opacity-75 ">
                Login with Intra
              </button>
            </div>
            <Pong />
         </div>
    </div>
  );
}

export default Home;
// https://sketchfab.com/3d-models/table-tennis-model-a1-30-star-wars-theme-9b663e07e8944dc2ba50eef1ccaa0474#download
