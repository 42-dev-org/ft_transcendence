import Image from "next/image";
import { type } from "os";
import React from "react";

type usersChat = {
  name: string;
  msg: string;
  url: string;
  time: string;
  onClick: (uid: string) => void;
  uid: string;
};

function Userschat({ msg, name, time, url, onClick, uid }: usersChat) {
  return (
    <div
      className="flex  relative h-16 w-full bg-black hover:bg-[#1B1B1B]"
      onClick={onClick.bind(null, uid)}
    >
      <div className="">
        <Image
          width={40}
          height={40}
          className="rounded-full absolute  left-3 bottom-2 "
          alt="zakaria"
          src={url}
        />
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col ml-16  py-2">
          <span className=" text-[#F5F5F5] text-md font-mono">{name}</span>
          <span className="  text-sm flex justify-star items-center  font-medium text-[#707991]">
            You:
            {msg}
          </span>
        </div>
        <div className="flex  items-start mt-1">
          <span className=" text-[#707991]  mt-2 justify-end text-xs">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Userschat;
