"use client";
import React from "react";
import LeaderBoardCard from "../../../components/Card/LeaderBoardCard";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/components/chat-main-channel/ConversationUiChannel";
import useReflection from "@/hooks/useReflection";


function Page() {
  const query = useQuery({
    throwOnError: false,
    queryFn: api.api().users.leaderBorad,
    queryKey: ["get-with-type", "Accepted"],
  });
  const {reflector} = useReflection()

  if (query.isLoading) {
    reflector({type: 'loading', isLoading: true, payload: null})
  } else {
    reflector({type: 'loading', isLoading: false, payload: null})
  }

  return (
    <div className=" overflow-hidden flex  h-full w-full rounded-lg m-5 bg-[#1B1B1B]">
      <div className=" overflow-y-auto max-h-[90%] flex flex-col items-center gap-4 p-2 m-2 rounded-lg h-full w-full  text-white justify-start ">
        <h2 className="h-11 w-44 mb-11 flex m-11 p-5 text-black rounded-lg justify-center items-center bg-[#B2F35F]">
          Leader Board
        </h2>
        {query.isSuccess &&
          (query.data?.data?.data as User[]).map((_, idx) => (
            <LeaderBoardCard
              name={_.login}
              url={_.profileImage}
              key={idx}
              uid={_.uid}
              points={idx}
            />
          ))}
      </div>
    </div>
  );
}

export default Page;
