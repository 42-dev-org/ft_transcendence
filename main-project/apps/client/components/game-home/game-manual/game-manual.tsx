import React from "react";
import { ImCancelCircle } from "react-icons/im";

interface PropsType {
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const GameManualDialog = ({ onClose }: PropsType) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center font-bold">
      <div className="bg-white p-12 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Game Manual</h2>
        <hr className="mb-4" />
        <hr className="mb-4" />
        <div className="text-left mx-auto max-w-md">
          <div className="instructions-container">
            <h2 className="text-2xl font-bold mb-4">Ping Pong Game Manual</h2>

            <p className="text-gray-600 mb-4">Welcome to the Ping Pong game! Follow these instructions to play:</p>

            <ol className="list-decimal pl-6">
              <li className="text-gray-600 mb-4">
                <span className="font-bold">Controls:</span> Use the <span className="font-bold">right</span> and <span className="font-bold">left</span> arrow keys to control your paddle.
              </li>

              <li className="text-gray-600 mb-4">
                <span className="font-bold">Gameplay:</span> The objective is to hit the ball with your paddle and score points. The ball will bounce between paddles, and each successful hit scores a point.
              </li>

              <li className="text-gray-600 mb-4">
                <span className="font-bold">Winning:</span> The player with the highest score wins. Enjoy the game!
              </li>
            </ol>
          </div>
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
