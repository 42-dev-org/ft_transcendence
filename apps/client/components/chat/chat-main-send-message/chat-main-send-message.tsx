import React from "react";
import { BiSend } from "react-icons/bi";
import styles from "./chat-main-send-message.module.css";

export default function ChatMainSendMessage(): JSX.Element {
  return (
    <div className={`${styles["chat-send-message-container"]}`}>
      <form>
        <div className="relative">
          <input
            className="block w-full p-3 pl-10 text-sm text-[#636363]  rounded-full bg-[#262626]"
            placeholder="Write A message ..."
            required
            type="message"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white">
            <BiSend className="w-6 h-6" />
          </div>
        </div>
      </form>
    </div>
  );
}
