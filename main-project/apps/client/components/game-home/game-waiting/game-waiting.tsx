import React from "react";
import { ImCancelCircle } from "react-icons/im";

export default function GameWaiting(): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-12 rounded-md text-center">
        <p className="text-black font-bold">anas jaid</p>

        <div className="flex justify-center pt-6 text-4xl">close</div>
        <button
          className="w-full flex items-center justify-center pl-6 gap-4 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full mt-4"
          type="submit"
        >
          <ImCancelCircle className="w-5 h-5" />
          Close
        </button>
      </div>
    </div>
  );
}
