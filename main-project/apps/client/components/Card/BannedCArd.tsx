import React from "react";
import Button from "../Button";
import Image from "next/image";

function BannedCArd({
  profileImage,
  login,
  uid
}: {
  profileImage: string;
  login: string;
  uid: string
}) {
  return (
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col ">
      <Image
      // TODO: fix image
      width={480}
      height={480}
        className="w-[480px] h-[60%] object-cover"
        alt="profile"
        src={(profileImage.length && profileImage || 'image profile')}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center ">
        <span className="text-[#e4e6eb] capitalize">{(login.length && login || 'login')}</span>
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
