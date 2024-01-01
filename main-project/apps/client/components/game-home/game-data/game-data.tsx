import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import React from 'react';

// TODO: rename this
interface TestType  {
  label: string;
  items: {
      label: string;
      value: string;
      key: number;
  }[];
}

export const levelsData = {
    label: "",
    items: [
      { 
        label: "Easy", 
        value: "beginner",
        key: Math.random() 
      },
      { 
        label: "Hard",
        value: "advanced", 
        key: Math.random() 
      },
    ],
  };
  
export const gamesData = {
    label: "",
    items: [
      {
        icon: FaUserFriends as any as React.ReactNode,
        label: "Play vs friend",
        value: "friend",
        key: 0,
      },
      {
        icon: GiPerspectiveDiceSixFacesRandom as any as React.ReactNode,
        label: "Play vs Random",
        value: "random",
        key: 1,
      },
    ],
  };
