import React from "react";
import styles from "./chat-main-send-message.module.css";

export default function ChatMainSendMessage(): JSX.Element {




  return (
    <div className={`${styles["chat-send-message-container"]}`}>
    	<div  >
			<form >
			    <input className="w-[80%] rounded-2xl py-1 px-10 bg-[#837979]" type="text" />
			    <button className="text-white " type="submit">
					Started
				</button>
			</form>
    	</div>
      	ChatMainSendMessage
    </div>
  );
}
