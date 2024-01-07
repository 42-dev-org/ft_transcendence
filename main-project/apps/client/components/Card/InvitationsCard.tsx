import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { api } from "../../api";
import Button from "../Button";
import Image from "next/image";

function InvitationsCard({
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
    mutationFn: api.api().users.acceptFriend,
    onSuccess: refetch,
  });
  return (
    <div className="w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col ">
      <Image
      // TODO: fix image
      width={480}
      height={480}
        className="w-full h-[60%] object-cover"
        alt="profile"
        src={(profileImage.length && profileImage || 'image profile')}
      />
      <div className="bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center ">
        <span className="text-[#e4e6eb] capitalize">{(login.length && login || 'login')}</span>
        <Button
          title="Accept invite"
          className="py-1 w-full"
          onClick={() => {
            sendMutation.mutate((uid.length && uid || 'id'));
          }}
        />
        <Link
          className="py-1 w-full text-center bg-[#ffffff1a] rounded-lg text-sm font-medium hover:opacity-70 px-3  text-white"
          href={`users/${(uid.length && uid || 'id')}`}
        >
          View Profil
        </Link>
      </div>
    </div>
  );
}

export default InvitationsCard;
