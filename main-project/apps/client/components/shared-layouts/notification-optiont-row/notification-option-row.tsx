import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styles from "./notification-option-row.module.css";

interface LinkItemType {
  name: string;
}

interface PropsType {
  links: LinkItemType[];
}

export default function NotificationOptionRow({
  links,
}: PropsType): JSX.Element {
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
          {links.map(({ name }) => (
            <li className={`${styles["chat-options-item"]}`} key={name}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
