import Image from "next/image";
import React, { Fragment, useState } from "react";
import MenuItem from "../Menu-chat";
import { IoMdMore } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import GenerateTimeMuted from "./GenerateTimeMuted";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ListOfUsersChannal from "./ListOfUsersChannel";
import { user } from "../game-home/invite-friend/interface/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { toast } from "react-toastify";

type usersInChannal = {
  name: string;
  url: string;
  setshowOpstions: (b: boolean) => void;
  menuList: string[];
  setMenuList: string[];
  conversation: string;
  uid: string;
  refetch: () => void;
};

function ListOfBannedChannal(props: usersInChannal): JSX.Element {
  const {
    name,
    url,
    setshowOpstions,
    menuList,
    setMenuList,
    conversation,
    uid,
    refetch,
  } = props;

  const queryClient = useQueryClient();
  const unbanMutation = useMutation({
    mutationKey: ["unban-user"],
    mutationFn: api.api().chat.unbanParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-group-cnv"] });
      toast("nadi tle9o sra7k");
      props.refetch();
    },
    onError: () => {
      toast("ghalat azabi");
    },
  });
  const onActionClicked = (action: string) => {
    if (action == "unbaned") {
      unbanMutation.mutate({
        user: uid,
        conversation,
      });
    }
  };
  return (
    <Fragment>
      <div className="flex flex-row relative h-16 hover:bg-[#1B1B1B] w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <Link
            className="flex flex-row items-center"
            href={"/users/1"}
            onClick={() => setshowOpstions(false)}
          >
            <div className="px-2">
              <Image
                width={40}
                height={40}
                className="rounded-full  left-1 bottom-2 "
                alt="zakaria"
                src={url}
              />
            </div>
            <div className="flex flex-col py-4">
              <span className=" text-[#F5F5F5] text-md font-mono justify-center items-center ">
                {name}
              </span>
            </div>
          </Link>

          <div className="flex  items-start mt-1">
            <div className="text-[#707991]  mt-2 justify-end text-xs">
              {menuList.length && (
                <MenuItem iconBtn={<IoMdMore size={24} color="gray" />}>
                  {setMenuList.map((action) => (
                    <button
                      key={action}
                      className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center"
                      onClick={onActionClicked.bind(null, action.toLowerCase())}
                    >
                      {action}
                    </button>
                  ))}
                </MenuItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ListOfBannedChannal;
