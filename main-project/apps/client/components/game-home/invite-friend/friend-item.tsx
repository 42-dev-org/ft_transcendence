import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { user } from "./interface/user";

// interface SimpleFriendItemProps {
//   name: string;
//   user: string;
// }

const FriendItem: React.FC<user> = ({ id, fullName, username, avatar }) => {
  return (
    <li className="w-full py-1 rounded-full bg-slate-100">
      <div className="pl-2 pr-4 flex flex-row justify-between items-center gap-4">
        <div className="flex justify-start items-center gap-4 max-w-[calc(100%-4rem)]">
          <div className="flex-shrink-0">
            {/* <div className="relative w-10 h-10 overflow-hidden border border-black bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div> */}
            <img className="relative w-10 h-10 overflow-hidden border border-black bg-gray-100 rounded-full dark:bg-gray-600" src={avatar}></img>
          </div>
          <div className="flex-1 min-w-0 max-w-[calc(100%-3.5rem)]">
            {" "}
            {/* Added max-w-[calc(100%-4rem)] */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-900 truncate">
              {fullName}
            </p>
            <p className="text-sm text-gray-500 truncate">{username}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            className="inline-flex md:hidden items-center py-1 pl-2 pr-2 text-sm font-medium text-white bg-black rounded-full hover:bg-[#00000097] focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            +</button>

          <button
            type="submit"
            className="hidden md:inline-flex items-center py-2 pl-2 pr-4 text-sm font-medium text-white bg-black rounded-full hover:bg-[#00000097] focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {/* <svg
              className="w-4 h-4 me-2 bg-black rounded-full inline-flex"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg> */}
            <span className="inline-flex px-2">+</span>
            Invite
          </button>
        </div>
      </div>
    </li>
  );
};

export default FriendItem;
