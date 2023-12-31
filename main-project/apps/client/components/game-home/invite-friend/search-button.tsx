// SearchButton.js
import React from "react";

interface PropsType {
  handleChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}
}

const SearchButton = ({handleChange}: PropsType) => {
  return (
    <button
    onClick={e => {}}
      type="submit"
      className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-[#00000097] focus:ring-4 focus:outline-none focus:ring-blue-300 "
    >
      <svg
        className="w-4 h-4 me-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      Search
    </button>
  );
};

export default SearchButton;
