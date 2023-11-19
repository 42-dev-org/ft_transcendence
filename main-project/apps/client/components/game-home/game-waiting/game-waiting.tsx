import React from "react";
import { ImCancelCircle } from "react-icons/im";


export default function GameWaiting(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
  <p className="text-black font-bold">anas jaid</p>

  <button
    className="w-full flex items-center justify-center px-4 gap-4 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full mt-4"
    type="submit"
  >
    <ImCancelCircle className="w-5 h-5" />
    Close
  </button>
</div>
  );
}
