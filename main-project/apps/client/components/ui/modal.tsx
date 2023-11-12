import React from "react";

interface PropsType {
  children: JSX.Element;
}

export default function Modal({ children }: PropsType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-12 rounded-md text-center">{children}</div>
    </div>
  );
}
