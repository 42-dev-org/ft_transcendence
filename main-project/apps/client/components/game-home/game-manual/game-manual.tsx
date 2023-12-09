import React from "react";
import { ImCancelCircle } from "react-icons/im";

const GameManualDialog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center font-bold">
      <div className="bg-white p-12 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Game Manual</h2>
        <hr className="mb-4" />
        <div className="text-left mx-auto max-w-md">
          <p className="text-gray-600 mb-6">1. Choose a map</p>
          <p className="text-gray-600 mb-6">2. Click on Play</p>
          <p className="text-gray-600 mb-6">3. Play by Mouse</p>
        </div>
        <button
          className="w-full flex items-center justify-center px-4 gap-4 bg-[#5c5757] hover:bg-[#b9ef72] text-white hover:text-black font-bold py-4 rounded-full"
          type="submit"
          onClick={onClose}
        >
            <ImCancelCircle className="w-5 h-5" />
          Close
        </button>
      </div>
    </div>
  );
};

export default GameManualDialog;
