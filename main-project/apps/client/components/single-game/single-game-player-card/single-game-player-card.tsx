import Image from "next/image";
import type { StaticImageData } from "next/image";
import React from "react";

interface PropsTye {
  image: string | StaticImageData;
  fullName: string;
  username: string;
  direction: string;
}

export default function SingleGamePlayerCard({
  fullName,
  image,
  username,
  direction,
}: PropsTye): JSX.Element {
  return (
    <div className="w-1/3 h-16 flex flex-col justify-center items-center">
      <Image className="rounded-full" src={image} width={35} height={35} alt="user avatar"/>
      <p className="font-semibold text-white">{username}</p>
 
    </div>
    // <div className="flex gap-3" style={{flexDirection: direction === 'rtl' ? "row-reverse" : "row"}}>
    //   <div className="max-w-16 max-h-16 rounded-full overflow-hidden my-auto">
    //     <Image alt="profile" height={64} src={image} width={64} />
    //   </div>

    //   <div className="flex flex-col">
    //     <p className="font-semibold text-xs lg:text-lg capitalize text-white tracking-wider">
    //       {fullName}
    //     </p>
    //     <p className="text-xs opacity-70 capitalize text-[#FFF] font-light">
    //       {username}
    //     </p>
    //   </div>
    // </div>
  );
}
