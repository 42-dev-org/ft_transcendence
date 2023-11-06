"use client";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import ChatOptionsArrow from "../chat-options-arrow/chat-options-arrow";
import styles from "./chat-main-nav.module.css";

interface PropsType {
  name: string;
  username: string;
  image: string | StaticImageData;
  status: "online" | "offline";
}

const links = [
  {name: 'delete', key: Math.random().toString()},
  {name: 'fuck', key: Math.random().toString()},
  {name: 'awdy', key: Math.random().toString()},
]


export default function ChatMainNav({
  username,
  name,
  image,
  status,
}: PropsType): JSX.Element {
  

  return (
    <div className={`${styles["chat-nav-container"]}`}>
      <div className="flex gap-3">
        <div className="max-w-16 max-h-16 rounded-full overflow-hidden my-auto">
          <Image alt="profile" src={image} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-xl capitalize text-white tracking-wider">
            {name}
          </p>
          <p className="text-xs opacity-70 capitalize text-[#FFF] font-light">
            {username}
          </p>
          <p
            className={`${
              status === "online" ? "text-green-400" : "text-red"
            } text-xs font-medium`}
          >
            {status}
          </p>
        </div>
      </div>
      <ChatOptionsArrow links={links}/>
    </div>
  );
}
