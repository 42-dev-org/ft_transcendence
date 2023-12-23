import React from "react";
import Button from "../Button";

function BannedCArd({
  profileImage,
  login,
}: {
  profileImage: string;
  login: string;
}) {
  return (
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col ">
      <img
        className="w-[480px] h-[60%] object-cover"
        alt="profile"
        src={profileImage}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center ">
        <span className="text-[#e4e6eb] capitalize">{login}</span>
        <Button
          title="Unblock User"
          className="py-1 w-full"
          onClick={() => null}
        />
      </div>
    </div>
  );
}

export default BannedCArd;
