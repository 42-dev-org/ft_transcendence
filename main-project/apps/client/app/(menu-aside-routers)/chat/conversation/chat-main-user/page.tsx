"use client";
import React, { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import chatImage from "assets-workspace/images/bg-chat-Conversation-user.png";

interface PropsType {
  fullName: string;
  image: string | StaticImageData;
  status: "online" | "offline";
}

export default function ConversationUi({
  fullName = "mustapha ouarsas",
  image= "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg",
  status = "offline",
}: PropsType): JSX.Element {


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
    setMessages([
      ...messages,
      {
        userId: 1,
        msg,
        timeAt: "18:16",
      },
    ]);
    setMsg("");
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
    <div className="w-full flex justify-center p-4 h-full">
      <div className="w-1/2 flex flex-col ">
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
          <div>
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14ZM10 18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18C14 17.4696 13.7893 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16C11.4696 16 10.9609 16.2107 10.5858 16.5858C10.2107 16.9609 10 17.4696 10 18Z"
                fill="#707991"
              />
            </svg>
          </div>
        </div>

        <div
          className="flex flex-col h-full"
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

            <button type="submit">
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
