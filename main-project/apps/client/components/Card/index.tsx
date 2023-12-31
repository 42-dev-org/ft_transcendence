import React from "react";
import Button from "../Button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";

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
  const queryClinet = useQueryClient();
  const sendMutation = useMutation({
    mutationKey: ["send-invite"],
    mutationFn: api.api().users.addFriend,
    onSuccess: refetch,
  });

  return (
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col ">
      <img
        className="w-full h-[60%] object-cover"
        alt="profile"
        src={(profileImage.length && profileImage || 'image profile')}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center ">
        <span className="text-[#e4e6eb] capitalize">{(login.length && login || 'login')}</span>
        <Button
          title="Add Friend"
          className="py-1 w-full"
          onClick={() => sendMutation.mutate((uid.length && uid || 'uid'))}
        />
        <Link
          className="py-1 w-full text-center bg-[#ffffff1a] rounded-lg text-sm font-medium hover:opacity-70 px-3  text-white"
          href={`users/${(uid.length && uid || 'uid')}`}
        >
          View Profil
        </Link>
      </div>
    </div>
  );
}
