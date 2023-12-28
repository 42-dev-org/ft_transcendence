"use client";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../../../components/Button";
import ChannelsChat from "../../../components/Chat/ChannelsChat";
import Userschat from "../../../components/Chat/Userschat";
import IMAgeUsers from "assets-workspace/svg/users.svg";
import IMAgeGroups from "assets-workspace/svg/groups.svg";
import ModalUI from "../../../components/Modal";
import ConversationUi from "../../../components/chat-main-user/chat-main-user";
import ConversationUiChannel from "../../../components/chat-main-channel/ConversationUiChannel";
import { ListUsersChat } from "../../../components/liste/ListUsersChat";
import withAuth from "../../../hoc/auth";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Search from "../../../components/shared-layouts/header-search/header-search";

const ConversationTypes = {
  Group: "Group",
  Single: "Single",
} as const;

const ChatVisibility = {
  Public: "Public",
  Private: "Private",
  Protected: "Protected",
} as const;

type componentType = "users" | "channels";
const data = {
  msg: " hello neo",
  name: "zakaria maziane",
  numberMsg: 2,
  url: "https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg",
  time: "17:57",
};
const dataChannels = {
  msg: " hello neo",
  nameChannels: "abatira",
  pic: "ab",
  time: "17:57",
};

// const [borderMsg, setborderMsg] = useState(false)
// function Addborder() {
//   // setborderMsg(!borderMsg);

// }
const Chat = () => {
  const [cnv, setCnv] = useState([]);
  const [cnvUid, setCnvUid] = useState<null | string>(null);
  const [search, setSearch] = useState("");
  const reactQueryClinet = useQueryClient();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [component, setComponent] = useState<componentType>("users");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);
  const [conversationType, setConversationType] = useState("");
  const [componenetChannelModal, setcomponenetChannelModal] =
    useState("public");

  const usersQuery = useQuery({
    queryKey: ["all-users"],
    enabled: false,
    queryFn: api.api().users.allExceptBanned,
  });

  const creationMutation = useMutation({
    mutationKey: ["create-chat"],
    onSuccess: () => {
      setIsAddOpenChannelModal(false);
      setName("");
      setPassword("");
      toast("done");
      reactQueryClinet.invalidateQueries({ queryKey: ["get-conversations"] });
    },
    onError: (err: AxiosError) => {
      toast(err.message);
    },
    mutationFn: (conf: {
      type: keyof typeof ConversationTypes;
      password?: string | undefined;
      visibility: keyof typeof ChatVisibility;
      name: string;
      participants: [];
    }) => api.api().chat.create(conf),
  });

  const conversationQuery = useQuery({
    queryKey: ["get-conversations", component],
    queryFn: ({ queryKey }) =>
      api
        .api()
        .chat.getConversations(queryKey[1] == "users" ? "single" : "group"),
  });

  useEffect(() => {
    if (conversationQuery.isFetched) {
      setCnv(conversationQuery.data?.data);
    }
  }, [conversationQuery]);

  const onSingleConversationClicked = (uid: string) => {
    setConversationType("users");
    setCnvUid(uid);
  };

  const onGroupConversationClicked = (uid: string) => {
    setConversationType("channels");
    setCnvUid(uid);
  };

  function render() {
    switch (component) {
      case "channels":
        return (
          <>
            {conversationQuery.isFetched &&
              (cnv as any[]).map((ch, idx) => (
                <ChannelsChat
                  uid={ch.uid}
                  onClick={onGroupConversationClicked}
                  time={dataChannels.time}
                  nameChannels={ch.name}
                  msg={""}
                  pic={dataChannels.pic}
                  key={idx}
                />
              ))}
          </>
        );

      case "users":
        return (
          <>
            {conversationQuery.isFetched &&
              cnv.map((_, idx) => (
                <Userschat
                  uid={_.uid}
                  onClick={(uid: string) => onSingleConversationClicked(uid)}
                  time={data.time}
                  name={
                    (_.participants?.length && _.participants[0].login) ||
                    "mock"
                  }
                  msg={data.msg}
                  url={data.url}
                  key={idx}
                />
              ))}
          </>
        );
    }
  }

  const addSingleChat = (uid: string) => {
    creationMutation.mutate({
      type: "Single",
      participants: [uid],
    });
  };

  useEffect(() => {
    console.log(search);

    // setCnv(
    //   conversationQuery.isFetched
    //     ? (conversationQuery.data.data as any[]).filter((cnv) =>
    //         (cnv.name as string).includes(search)
    //       )
    //     : []
    // );
  }, [search]);

  if (conversationQuery.isFetched) {
    console.log(cnv);
  }

  const onCloseAddModal = () => setIsAddOpen(false);
  const onCloseAddChannelModal = () => setIsAddOpenChannelModal(false);
  return (
    <Fragment>
      <ModalUI
        open={isAddOpen}
        onClose={onCloseAddModal}
        title="add Conversation"
      >
        <div
          className="flex justify-center items-center p-3 flex-col overflow-y-hidden max-h-72
        "
        >
          <div className="flex flex-row ">
            <input
              type="text"
              className="h-7 p-1 px-3 rounded-md w-2/3 mr-2 "
            />
            <Button
              onClick={() => {}}
              title="Search"
              className=" h-7 flex justify-center items-center mx-2"
            ></Button>
          </div>
          <div className=" overflow-y-auto">
            {usersQuery.isFetched &&
              usersQuery?.data?.data?.map((_, idx) => (
                <ListUsersChat
                  onClick={addSingleChat}
                  name={_.login}
                  url={data.url}
                  key={idx}
                  uid={_.uid}
                  className=" w-"
                />
              ))}
          </div>
        </div>
      </ModalUI>

      {/* modal channels  */}

      <ModalUI
        open={isAddOpenChannelModal}
        onClose={onCloseAddChannelModal}
        title="add Conversation"
      >
        <div className="flex justify-center items-center p-3 flex-col  max-h-72 gap-2">
          <div className="flex flex-row">
            <input
              type="text"
              className="h-7 p-1 px-3 rounded-md w-2/3 mr-2 "
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="channel name"
            />
            <select
              defaultValue={componenetChannelModal}
              name="channels"
              id=""
              className="rounded-md"
              onChange={(e) => setcomponenetChannelModal(e.target.value)}
            >
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="protected">protected</option>
            </select>
          </div>

          {componenetChannelModal === "protected" && (
            <input
              placeholder="set a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-7 p-1 px-3 rounded-md w-2/3 mr-2  justify-start"
            />
          )}
          <Button
            onClick={() => {
              creationMutation.mutate({
                visibility:
                  componenetChannelModal === "public"
                    ? ChatVisibility["Public"]
                    : componenetChannelModal === "private"
                      ? ChatVisibility["Private"]
                      : componenetChannelModal === "protected"
                        ? ChatVisibility["Protected"]
                        : ChatVisibility["Public"],
                type: "Group",
                name,
                participants: [],
                ...(componenetChannelModal === "protected" ? { password } : {}),
              });
            }}
            title="add channel"
          ></Button>
        </div>
      </ModalUI>

      <div className=" flex  w-full h-full ">
        <div className="flex flex-col w-1/3  text-white  bg-black h-full py-2 gap-y-2 px-1 overflow-y-hidden">
          <span className="flex justify-center items-center text-3xl  font-bold h-14">
            Messages
          </span>
          <div>
            <input
              type="text"
              placeholder=" Search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value.length ? e.target.value : "")
              }
              className=" bg-white h-10 w-full text-black  rounded-full pl-3"
            />
          </div>
          <div className=" px-2 h-24 flex gap-2 justify-center  items-center ">
            <Button
              onClick={() => {
                setIsAddOpen(true);
                usersQuery.refetch();
              }}
              title={""}
              className="flex items-center justify-center text-black  w-1/3 h-3/4"
            >
              <Image alt="add users" width={25} height={30} src={IMAgeUsers} />
            </Button>
            <Button
              onClick={() => setIsAddOpenChannelModal(true)}
              title={""}
              className="flex items-center justify-center text-black  w-1/3 h-3/4"
            >
              {" "}
              <Image
                alt="add groups"
                width={25}
                height={30}
                src={IMAgeGroups}
              />
            </Button>
          </div>
          <div className="flex   w-full h-12  justify-center gap-2 bg-black items-center ">
            <div
              className={`flex w-1/3  h-10 hover:bg-[#1B1B1B] rounded-md  text-white justify-center items-center  ${
                component === "users"
                  ? " bg-[#1B1B1B] border border-spacing-2 border-[#B2F35F]"
                  : ""
              } `}
              onClick={setComponent.bind(null, "users")}
            >
              Users
            </div>
            <div
              className={`flex w-1/3  h-10 hover:bg-[#1B1B1B] rounded-md focus:border focus:border-spacing-1 text-white justify-center items-center ${
                component === "channels"
                  ? " bg-[#1B1B1B] border border-spacing-2 border-[#B2F35F]"
                  : ""
              }`}
              onClick={setComponent.bind(null, "channels")}
            >
              Channels
            </div>
          </div>
          <div className=" overflow-y-auto">{render()}</div>
        </div>
        {conversationType === "users" ? (
          <ConversationUi
            uid={cnvUid!}
            fullName="mustapha ouarsas"
            image="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
            status="in a game"
          />
        ) : conversationType === "channels" ? (
          <ConversationUiChannel uid={cnvUid!} refetch={conversationQuery.refetch}/>
        ) : null}
      </div>
    </Fragment>
  );
};

export default withAuth(Chat);
