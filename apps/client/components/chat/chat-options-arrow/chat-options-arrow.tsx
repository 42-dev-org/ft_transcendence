import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styles from "./chat-options-arrow.module.css";

interface LinkItemType {
  name: string;
  key: string;
}

interface PropsType {
  links: LinkItemType[];
}

export default function ChatOptionsArrow({ links }: PropsType): JSX.Element {
  const [isOptionClicked, setIsOptionClicked] = useState(false);

  const onOptionClicked: () => void = () => {
    setIsOptionClicked((prev) => !prev);
  };
  return (
    <div className={`${styles["chat-arrow-container"]}`}>
      <BsChevronDown color="white" onClick={onOptionClicked} size={22} />
      <div
        className={`${isOptionClicked ? "block" : "hidden"} ${
          styles["chat-options-container"]
        } `}
      >
        <ul>
          {links.map(({ key, name }) => (
            <li className={`${styles["chat-options-item"]}`} key={key}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
