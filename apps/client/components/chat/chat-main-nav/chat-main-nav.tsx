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
        <div className={`${styles["chat-nav-image"]}`}>
          <Image alt="profile" src={image} />
        </div>
        <div className={`${styles["chat-nav-main-container"]}`}>
          <p className={`${styles["chat-nav-name"]}`}>
            {name}
          </p>
          <p className={`${styles["chat-nav-username"]}`}>
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
