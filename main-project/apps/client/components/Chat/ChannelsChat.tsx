import React, { useState } from "react";
import { MdGroups2 } from "react-icons/md";
import Button from "../Button";

type usersChat = {
  nameChannels: string;
  msg: string;
  time: string;
  onClick: (uid: string) => void;
  uid: string;
  visibility: "Public" | "Private" | "Protected";
  exists: boolean;
  join: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    type: "protected" | "public" | null;
    uid: string | null;
}>>
};

function ChannelsChat({
  nameChannels,
  msg,
  time,
  onClick,
  uid,
  visibility,
  exists,
  join,
}: usersChat) {
  console.log({
    visibility,
    exists,
  });

  return (
    <>
      <div
        className="flex items-center  relative h-16 w-full bg-black hover:bg-[#333131]"
        onClick={onClick.bind(null, uid)}
      >
        <div className=" h-14 w-14 rounded-full  bg-[#1B1B1B] px-2 mx-2 flex justify-center items-center text-white">
          <MdGroups2 size={30} />
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col   py-2">
            <span className=" text-[#f8f4f4] text-md font-mono">
              {nameChannels}
            </span>
            {/* <span className="  text-sm flex justify-star items-center  font-medium text-[#707991]">
              You:
              {msg}
            </span> */}
          </div>
          <div className="flex  items-start mt-1">
          {!exists ? (
        visibility === "Protected" ? (
          <Button title="Join"   className=" text-black mr-2"
            onClick={() =>
              join({
                isOpen: true,
                type: "protected",
                uid
              })
            }
          >
          </Button>
        ) : (
          <Button title="Join"  className=" text-black mr-2" onClick={() => join({ isOpen: true, type: "public", uid })}>

          </Button>
        )
      ) : null}
            {/* <span className=" text-[#707991]  mt-2 justify-end text-xs">
              {time}
            </span> */}
          </div>
        </div>
      </div>
      {/* {!exists ? (
        visibility === "Protected" ? (
          <Button title="join"   className=" text-black"
            onClick={() =>
              join({
                isOpen: true,
                type: "protected",
                uid
              })
            }
          >
          </Button>
        ) : (
          <Button title="join"  className=" text-black" onClick={() => join({ isOpen: true, type: "public", uid })}>

          </Button>
        )
      ) : null} */}
    </>
  );
}

export default ChannelsChat;
