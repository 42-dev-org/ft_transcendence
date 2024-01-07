import React from "react";
import Button from "../Button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import Image from "next/image";

export default function Card({
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
    mutationKey: ["send-invite"],
    mutationFn: api.api().users.addFriend,
    onSuccess: refetch,
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
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col ">
      <Image
        // TODO: fix image
        width={480}
        height={480}
        className="w-full h-[60%] object-cover"
        alt="profile"
        src={(profileImage.length && profileImage) || "image profile"}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-1 flex py-2 px-5 flex-col justify-center items-center  ">
        <span className="text-[#e4e6eb] capitalize">
          {(login.length && login) || "login"}
        </span>
        <button
          className="bg-[#B2F35F]  rounded-md text-sm font-medium hover:opacity-90 px-3 py-0 h-6 w-full"
          onClick={() => sendMutation.mutate((uid.length && uid) || "uid")}
        >Add Friend</button>
        <button
          className="bg-[#B2F35F]  rounded-md text-sm font-medium hover:opacity-90 px-3 py-0 h-6 w-full"
          onClick={() => banMutation.mutate((uid.length && uid) || "uid")}
        >
        Block User
        </button>
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
