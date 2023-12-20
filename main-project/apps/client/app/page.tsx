import React from "react";
import "./home.css";
import IMAge from "assets-workspace/svg/Vector.svg";
import Image from "next/image";
import Pong from "../components/pong";
import Link from "next/link";

function Home(): JSX.Element {
  return (
    <div className="p-8 bg-[#1B1B1B] min-h-screen  flex flex-col gap-20 lg:overflow-hidden">
      <div className="flex flex-row  normal-case  text-xl bg-[#1B1B1B] border-none text-white">
        <Image alt="logo image" src={IMAge} height={28} width={39} />
        <span className="ml-4 title text-3xl">Pong Game</span>
      </div>
      <div className="w-full mt-20  xl:flex-row flex-col flex items-center  text-white py-4 px-2">
        <div className="flex flex-col  gap-10 xl:w-1/3 w-full ">
          <h1 className="md:text-5xl text-3xl flex ">
            PING<span className="text-[#b9ef72]">PONG</span>
          </h1>
          <p className="text-sm">
            Are you tired of toxic players and trolls? Do you want to know
            people who play like you? Follow your growth in games, make friends,
            create a team, win championships. Meet GAMEPLAYERS and have fun
            playing for real!
          </p>
          <Link
            href={
              "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e9ef34cb474eec70b251774667b8102881013a0927960d2bcefe143797da568e&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fauth%2F42&response_type=code"
            }
            className="w-52 bg-[#b9ef72] rounded-md text-black text-xs whitespace-nowrap px-3 py-3 flex justify-center items-center hover:opacity-75 "
          >
            Login with Intra
          </Link>
        </div>

        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow md:rotate-90">
          <svg
            className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
            role="img"
            viewBox="0 0 366 729"
          >
            <path
              d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
              fill="#4B5563"
            />
            <path
              d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
              fill="#343E4E"
            />
            <foreignObject
              clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
              height={700}
              width={366}
            >
              <Pong />
            </foreignObject>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Home;
// https://sketchfab.com/3d-models/table-tennis-model-a1-30-star-wars-theme-9b663e07e8944dc2ba50eef1ccaa0474#download
