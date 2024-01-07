import Link from "next/link";
import React from "react";
import Button from "../Button";
import { api } from "../../api";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

function FriendCard({
  profileImage,
  login,
  uid,
  refetch,
}: {
  profileImage: string;
  login: string;
  uid: string;
  refetch: () => void;
}) {
  const sendMutation = useMutation({
    throwOnError: false,
    mutationKey: ["remove-friend"],
    mutationFn: api.api().users.removeFriend,
    onSuccess: () => {
      refetch();
    },
  });
  const banMutation = useMutation({
    throwOnError: false,
    mutationKey: ["ban-friend"],
    mutationFn: api.api().users.ban,
    onSuccess: () => {
      refetch();
    },
  });
  return (
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden  h-72 flex-col ">
      <Image
        // TODO: fix image
        width={480}
        height={480}
        className="w-full h-[60%] object-cover"
        alt="profile"
        src={(profileImage.length && profileImage) || "image profile"}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center ">
        <span className="text-[#e4e6eb] capitalize">
          {(login.length && login) || "login"}
        </span>
        <Button
          title="Remove Friend"
          className="py-0 w-full px-0"
          onClick={() => sendMutation.mutate((uid.length && uid) || "uid")}
        />
        <Button
          title="Block Friend"
          className="py-0 w-full px-0"
          onClick={() => banMutation.mutate((uid.length && uid) || "uid")}
        />
        <Link
          className="py-0 w-full text-center bg-[#ffffff1a] rounded-lg text-sm font-medium hover:opacity-70 px-3  text-white"
          href={`users/${(uid.length && uid) || "uid"}`}
        >
          View Profil
        </Link>
      </div>
    </div>
  );
}

export default FriendCard;
