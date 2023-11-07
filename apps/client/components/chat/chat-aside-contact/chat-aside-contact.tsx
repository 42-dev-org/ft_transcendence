import React from "react";
import type { StaticImageData } from "next/image";
import styles from "./chat-aside-contact.module.css";

interface SingleContact {
  image: StaticImageData | string;
  name: string;
  lastMessage: string;
}

export default function ChatAsideContact({
  image,
  lastMessage,
  name,
}: SingleContact): JSX.Element {
  return <div className={`${styles[""]}`}>{name}</div>;
}
