import { AiFillRobot } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import React from 'react';


export const levelsData = {
    label: "",
    items: [
      { 
        label: "beginner", 
        value: "beginner",
        key: Math.random() 
      },
      { 
        label: "intermediate", 
        value: "intermediate",
        key: Math.random() 
      },
      { 
        label: "advanced",
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
        
      { 
        icon: AiFillRobot, 
        label: "Play vs bot",
        value: "bot",  
        key: 2
      },
    ],
  };
