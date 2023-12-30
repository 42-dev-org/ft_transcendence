import Image from "next/image";
import React from "react";
import Button from "../Button";

type ListUsersChatProps = {
  name: string;
  url: string;
  uid: string;
  className?: string;
  onClick: (uid: string) => void;
};

export function ListUsersChat({
  name,
  url,
  className,
  uid,
  onClick,
}: ListUsersChatProps) {
  return (
    <div
      className={`flex flex-row justify-between w-72 rounded-lg bg-black  my-1 h-9 items-center ${className} `}
    >
      <Image
        width={35}
        height={35}
        className="rounded-full flex items-center ml-1 w-8 h-8"
        src={url}
        alt={name}
      />
      <span className="flex whitespace-nowrap items-center text-white">
        {name}
      </span>
      <Button
        title="add"
        onClick={onClick.bind(null, uid)}
        className="w-11 h-8 mr-1 flex justify-center items-center"
      />
    </div>
  );
}
