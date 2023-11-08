import React from "react";
import profileImage from "assets-workspace/images/profile.png";
import ChatMainNav from "../../../components/chat/chat-main-nav/chat-main-nav";
import ChatMainMessagesContainer from "../../../components/chat/chat-main-messages-container/chat-main-messages-container";
import ChatMainSendMessage from "../../../components/chat/chat-main-send-message/chat-main-send-message";
import styles from "./chat-main.module.css";

const user = {
  name: "cristoph ouarsass",
  username: "ouarsass",
  image: profileImage,
  status: "online" as const,
};

export default function ChatMain(): JSX.Element {
  return (
    <div className={`${styles["chat-main-container"]}`}>
      <ChatMainNav {...user} />
      <ChatMainMessagesContainer />
      <ChatMainSendMessage />
    </div>
  );
}
