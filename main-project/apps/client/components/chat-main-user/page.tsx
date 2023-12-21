"use client";
import React, { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import chatImage from "assets-workspace/images/bg-chat-Conversation-user.png";
import { current } from "@reduxjs/toolkit";
import { TbRulerOff } from "react-icons/tb";
import MenuItem from "../Menu-chat";
import { IoMdMore } from "react-icons/io";
import Link from "next/link";



interface PropsType {
  fullName: string;
  image: string | StaticImageData;
  status: "online" | "offline"; //  should add in game
}

export default function ConversationUi({
  fullName = "mustapha ouarsas",
  image= "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg",
  status = "offline",
}: PropsType): JSX.Element {

  const [showOptions, setshowOpstions] = useState(true);
  const [msg, setMsg] = useState("");
  const msgRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      userId: 2,
      msg: "OMG 😲 do you remember what you did last night",
      timeAt: "18:16",
    },
  ]);
  const onSetMessage = (e) => {
    e.preventDefault();
    if (msg.length && msg.trim()) {
    setMessages([
      ...messages,
      {
        userId: 1,
        msg,
        timeAt: "18:16",
      },
    ]);
    setMsg("");
  }
  };

  useEffect(() => {
    if (msgRef?.current) {
      msgRef?.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target }: any = event;
        target?.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div className="w-2/3 flex justify-center p-2 h-full">
      <div className="w-full flex flex-col ">
        <div className="w-full flex bg-black p-1 text-[#F5F5F5] justify-between items-center">
          <div className="flex gap-5 items-center h-14">
              <div className="w-11 h-11 relative">
                <Image
                  alt="user"
                  className="rounded-full"
                  height={44}
                  src={image}
                  width={44}
                />
                <div className="absolute -right-1 bottom-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <h5 className="font-semibold">{fullName}</h5>
                <span className={`text-xs font-normal ${status === "online" ? " text-green-400" : "text-red-500"} `}>{status}</span>
              </div>
            </div>
          <MenuItem  iconBtn={<IoMdMore size={24} color="gray"/>}>
            <button className="hover:bg-[#B2F35F] rounded-md px-2">Block</button>
            <Link className="hover:bg-[#B2F35F] rounded-md px-2" href="users/1">View Profile</Link>
            <button className="hover:bg-[#B2F35F] rounded-md px-2">Invite Game</button>
          </MenuItem>
        </div>

        <div
          className="flex flex-col h-[90%]"
          style={{
            backgroundImage:
              "url(https://cdn2.f-cdn.com/contestentries/2046262/58571795/61f00c583e000_thumb900.jpg)",
            // <Image alt="backgroundImage" height={100} src={chatImage}  width={800} />
          }}
        >
          <div
            className="h-full w-full flex  overflow-y-auto flex-col  bg-green p-4 gap-4 scrollbar-hide"
            ref={msgRef}
          >
            {messages?.map(({ msg, userId }, index) => (
              <div
                className={`w-max max-w-[50%] p-2 flex  rounded-xl ${
                  userId === 1 ? "bg-[#b9ef72] self-end" : "bg-slate-300"
                }`}
                key={index}
              >
                <span>{msg}</span>
              </div>
            ))}
          </div>
          <form
            className="h-16 w-full  px-6 py-2 relative"
            onSubmit={onSetMessage}
          >
            <input
              className="w-full h-12 bg-[#2a2a2a] text-[#F5F5F5] rounded-xl pl-3 pr-10"
              placeholder="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <button className="" type="submit" >
              <svg
                className="absolute top-5 right-8"
                fill="none"
                height="24"
                viewBox="0 0 25 24"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.315 12.197L5.78299 13.453C5.69639 13.4675 5.61513 13.5045 5.54737 13.5603C5.47961 13.6161 5.42775 13.6888 5.39699 13.771L2.79999 20.728C2.55199 21.368 3.22099 21.978 3.83499 21.671L21.835 12.671C21.9597 12.6088 22.0645 12.513 22.1378 12.3945C22.2111 12.276 22.2499 12.1394 22.2499 12C22.2499 11.8607 22.2111 11.7241 22.1378 11.6055C22.0645 11.487 21.9597 11.3913 21.835 11.329L3.83499 2.32901C3.22099 2.02201 2.55199 2.63301 2.79999 3.27201L5.39799 10.229C5.4286 10.3114 5.48041 10.3843 5.54818 10.4403C5.61594 10.4963 5.69728 10.5335 5.78399 10.548L13.316 11.803C13.3623 11.8111 13.4043 11.8353 13.4346 11.8714C13.4649 11.9074 13.4815 11.9529 13.4815 12C13.4815 12.0471 13.4649 12.0926 13.4346 12.1287C13.4043 12.1647 13.3623 12.1889 13.316 12.197H13.315Z"
                  fill="#B2F35F"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
