import React from "react";
import profileImage from "assets-workspace/images/profile.png";
import ChatAsideSearch from "../../../components/chat/chat-aside-search/chat-aside-search";
import ChatAsideContacts from "../../../components/chat/chat-aside-contacts/chat-aside-contacts";
import styles from "./chat-aside.module.css";

const contacts = [
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
  { name: "anas", lastMessage: "hi", image: profileImage, key: Math.random().toString() },
];

export default function ChatAside(): JSX.Element {
  return (
    <div className={`${styles["chat-aside-container"]}`}>
      <ChatAsideSearch />
      <ChatAsideContacts contacts={contacts} />
    </div>
  );
}
