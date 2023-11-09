import React from "react";
import { BiSend } from "react-icons/bi";
import styles from "./chat-main-send-message.module.css";

export default function ChatMainSendMessage(): JSX.Element {
  return (
    <div className={`${styles["chat-send-message-container"]}`}>
      <form>
        <div className="relative">
          <input
            className="block w-full p-3 pl-10 text-sm text-[#636363]  rounded-full bg-[#262626] focus:ring-blue-500 focus:border-blue-500 "
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

// {/* <div class="relative mb-4 flex flex-wrap items-stretch">
//   <input
//     type="text"
//     class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//     placeholder="Recipient's username"
//     aria-label="Recipient's username"
//     aria-describedby="button-addon2" />
//   <button
//     class="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//     data-te-ripple-init
//     type="button"
//     id="button-addon2">
//     Button
//   </button>
// </div> */}
