import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import React from 'react';


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
        icon: FaUserFriends,
        label: "Play vs friend",
        value: "friend",
        key: 0,
      },
      {
        icon: GiPerspectiveDiceSixFacesRandom,
        label: "Play vs Random",
        value: "random",
        key: 1,
      },
    ],
  };
