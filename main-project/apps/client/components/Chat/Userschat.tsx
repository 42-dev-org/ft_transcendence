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
      className="flex  relative items-center  h-16 w-full bg-black hover:bg-[#1B1B1B]"
      onClick={onClick.bind(null, uid)}
    >
      <div className="w-1/2">
        <Image
          width={40}
          height={40}
          className="rounded-full max-w-[40px] max-h-[40px] absolute  left-3 bottom-2 "
          alt="zakaria"
          src={url}
        />
      </div>
      <div className="flex  w-full justify-items-center">
          <span className=" text-[#F5F5F5] text-md font-mono">{name}</span>
      </div>
    </div>
  );
}

export default Userschat;
