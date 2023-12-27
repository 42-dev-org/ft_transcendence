"use client";
import React, { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import chatImage from "assets-workspace/images/bg-chat-Conversation-user.png";
import { MdGroups2 } from "react-icons/md";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import MenuItem from "../Menu-chat";
import ModalUI from "../Modal";
import Button from "../Button";
import SenderLayout from "./SenderLayout";
import RecieverLayout from "./RecieverLayout";
import { ListUsersChat } from "../liste/ListUsersChat";
import { IoIosCloseCircleOutline, IoMdMore } from "react-icons/io";
import { ChangeChannelName } from "./ChangeChannelName";
import OptionsListChannel from "./OptionsListChannel";
import ChangePasswordPrivetOrDesabled from "./ChangePasswordPrivetOrDesabled";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { useAppSelector } from "../../store/store";

export interface Root {
  status: string;
  data: Data;
}

export interface ChatInfos {
  name: string;
  profileImage: string;
  uid: string;
}

export interface Data {
  name: string;
  profileImage: string;
  participants: User[];
  ban: User[];
  mut: Mut[];
  admins: User[];
  owner: User;
  uid: string;
  messages: Message[];
}

export interface Mut {
  until: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  login: string;
  profileImage: string;
  uid: string;
}

export interface Message {
  uid: string;
  content: string;
  senderUid: string;
  conversationUid: string;
  createdAt: string;
  updatedAt: string;
  sender: {
    profileImage: string;
    firstName: string;
    lastName: string;
    login: string;
  };
}

const data = {
  msg: "how about your day",
  name: "ouarsass",
  numberMsg: 2,
  url: "https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/mouarsas.jpg",
};

export type RoleType = "participant" | "admin" | "mut" | "owner" | "ban";
export type UsersWithRole = { data: User; role: RoleType };

enum Role {
  user,
  admin,
  owner,
}

export type ViewerRole = "admin" | "owner" | "participant" | false;

export default function ConversationUiChannel({
  uid,
}: ChatInfos): JSX.Element {

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [admins, setAdmins] = useState<User[]>([]);
  const [banned, setBanned] = useState<User[]>([]);
  const [mutted, setMutted] = useState<Mut[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [role, setRole] = useState<ViewerRole>(false);
  const [owner, setOwner] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [all, setAll] = useState<UsersWithRole[]>([]);
  const [infos, setInfos] = useState<ChatInfos | null>(null);

  const query = useQuery({
    queryKey: ["get-group-cnv", uid],
    queryFn: ({ queryKey }) =>
      api.api().chat.getConversation(queryKey[1], "Group"),
  });
  const myUid = useAppSelector((s) => s.user.user?.uid);

  useEffect(() => {
    if (query.isFetched) {
      const data = query.data?.data as Root;
      setAdmins(data.data.admins);
      setBanned(data.data.ban)
      setParticipants(
        data.data.participants.filter((p) => {
          return !(
            data.data.admins.find((a) => a.uid === p.uid) ||
            data.data.owner.uid === p.uid ||
            data.data.mut.find((m) => m.user.uid === p.uid) ||
            data.data.ban.find((b) => b.uid === p.uid)
          );
        })
      );
      setMutted(data.data.mut);
      setRole(
        data.data.owner.uid === myUid
          ? "owner"
          : data.data.admins.find((el) => el.uid === myUid)
            ? "admin"
            : "participant"
      );
      setInfos({
        name: data.data.name,
        uid: data.data.uid,
        profileImage: data.data.profileImage,
      });
      setMessages(data.data.messages);
    }
  }, [query.isFetched]);


  const [userType, setUserType] = useState<Role>(Role.owner);

  const [showOpstions, setshowOpstions] = useState(false);
  const [msg, setMsg] = useState("");
  const msgRef = useRef<HTMLDivElement>(null);

  const onCloseAddModal = () => setIsAddOpen(false);

  return (
    <Fragment>
      <ModalUI open={isAddOpen} onClose={onCloseAddModal} title="Add Users">
        <div className="flex justify-center flex-col gap-y-5 items-center p-3">
          <div className="flex flex-row">
            <input type="text" className="h-7 p-1 px-3 rounded-md w-2/3 " />
            <Button
              onClick={() => {}}
              title="Search"
              className=" h-7 flex justify-center items-center mx-2"
            ></Button>
          </div>
          <div className=" overflow-y-auto ">
            {[...Array(4)].map((_, i) => (
              <ListUsersChat
                name={data.name}
                url={data.url}
                key={i}
                className=""
                // onClick={onclick} ///////
              />
            ))}
          </div>
        </div>
      </ModalUI>
      <div className="w-2/3 flex justify-center p-2 h-full">
        <div className="w-full flex flex-col ">
          <div className="w-full flex bg-black p-1 text-[#F5F5F5] justify-between items-center rounded-lg">
            <div className="flex gap-5 items-center h-14">
              <div className="w-11 h-11">
                <MdGroups2 className="rounded-full h-10 w-9" />
              </div>

              <div className="flex flex-col justify-between">
                <h5 className="font-semibold">{infos?.name}</h5>
              </div>
            </div>
            <MenuItem iconBtn={<IoMdMore size={24} color="gray" />}>
              {userType != Role.user && (
                <button
                  className=" hover:bg-[#B2F35F] rounded-md"
                  title="addUsers"
                  onClick={() => {
                    setIsAddOpen(true);
                  }}
                >
                  Add users
                </button>
              )}
              <button
                className=" hover:bg-[#B2F35F] rounded-md"
                title="leaveChannel"
              >
                Leave channel
              </button>
              <button
                className="hover:bg-[#B2F35F] rounded-md px-2"
                onClick={() => setshowOpstions(true)}
              >
                View Details
              </button>
            </MenuItem>
          </div>
          <div className="flex w-full h-[90%]">
            <div
              className={`flex flex-col h-full ${
                showOpstions ? "w-2/3" : "w-full"
              }`}
              style={{
                backgroundImage:
                  "url(https://cdn2.f-cdn.com/contestentries/2046262/58571795/61f00c583e000_thumb900.jpg)",
                // <Image alt="backgroundImage" height={100} src={chatImage}  width={800} />
              }}
            >
              <div
                className="h-full w-full flex  overflow-y-auto flex-col  bg-green p-4 gap-4 scrollbar-hide"
                ref={msgRef}
              >
                {messages?.map(({ content, senderUid, sender }, index) => (
                  <Fragment key={index}>
                    {senderUid === myUid ? (
                      <SenderLayout msg={msg} />
                    ) : (
                      <RecieverLayout
                        msg={content}
                        senderName={sender.firstName + " " + sender.lastName}
                        imageUrl={sender.profileImage}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
              <form className="h-16 w-full  px-6 py-2 relative">
                <input
                  className="w-full h-12 bg-[#2a2a2a] text-[#F5F5F5] rounded-xl pl-3 pr-10"
                  placeholder="Message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />

                <button type="submit">
                  <svg
                    className="absolute top-5 right-8"
                    fill="none"
                    height="24"
                    viewBox="0 0 25 24"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.315 12.197L5.78299 13.453C5.69639 13.4675 5.61513 13.5045 5.54737 13.5603C5.47961 13.6161 5.42775 13.6888 5.39699 13.771L2.79999 20.728C2.55199 21.368 3.22099 21.978 3.83499 21.671L21.835 12.671C21.9597 12.6088 22.0645 12.513 22.1378 12.3945C22.2111 12.276 22.2499 12.1394 22.2499 12C22.2499 11.8607 22.2111 11.7241 22.1378 11.6055C22.0645 11.487 21.9597 11.3913 21.835 11.329L3.83499 2.32901C3.22099 2.02201 2.55199 2.63301 2.79999 3.27201L5.39799 10.229C5.4286 10.3114 5.48041 10.3843 5.54818 10.4403C5.61594 10.4963 5.69728 10.5335 5.78399 10.548L13.316 11.803C13.3623 11.8111 13.4043 11.8353 13.4346 11.8714C13.4649 11.9074 13.4815 11.9529 13.4815 12C13.4815 12.0471 13.4649 12.0926 13.4346 12.1287C13.4043 12.1647 13.3623 12.1889 13.316 12.197H13.315Z"
                      fill="#B2F35F"
                    />
                  </svg>
                </button>
              </form>
            </div>
            {showOpstions && (
              <div className="flex w-1/3 flex-col h-full bg-[#45454566] rounded-md border-2 border-zinc-400 gap-2">
                <IoIosCloseCircleOutline
                  size={30}
                  color="white"
                  className="cursor-pointer self-end"
                  onClick={() => setshowOpstions(false)}
                />
                <div className="w-full flex flex-col gap-5 h-full">
                  <div className="">
                    <ChangePasswordPrivetOrDesabled />
                  </div>
                  <div>
                    <ChangeChannelName
                      channelName={(infos?.name.length && infos.name || 'channel')}
                      onSetName={(name: string) =>
                        setInfos((old) => (old ? { ...old, name } : null))
                      }
                    />
                  </div>
                  <div className=" h-full">
                    <OptionsListChannel
                      role={role}
                      all={all} // escape this is buggy
                      admins={admins}
                      participants={participants}
                      ban={banned}
                      mut={mutted}
                      owners={[owner!]}
                      userType={userType}
                      setshowOpstions={setshowOpstions}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

/**
 * admins:
 *    - should add people
 *    - should ban kick and mute
 *    - should change name and password if conversation locked if not he can lock channel with password
 * users:
 *    - can either view profile or invite for game
 * ! any actions user can do ofc admin also can do'it
 * 
 * 
 * for channel
  baned 
  muted
  memeber
  admins
  
  TODO
    * add the list of members in channel

owner admin  channel can :
    mute a user for limited time , demute
    ban a user   or deban
    kick user and admin
    owner channel can :
    set a user as admin . or inverse
    
admin can do all owner can do except kick owner 
  learn react query, axios, http 


mandatory:
  - update the channel sitution (private -> protected) done
  - in channels list option, the owner can make a user admine to the channel or remove it from admine role
feat:
  - the user can access to other users profile from the mini profile in the chat(navbar) done

*/
