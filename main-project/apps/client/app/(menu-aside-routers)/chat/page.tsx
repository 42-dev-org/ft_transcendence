"use client";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import Button from "../../../components/Button";
import ChannelsChat from "../../../components/Chat/ChannelsChat";
import Userschat from "../../../components/Chat/Userschat";
import IMAgeUsers from "assets-workspace/svg/users.svg";
import IMAgeGroups from "assets-workspace/svg/groups.svg";
import ModalUI from "../../../components/Modal";
import ConversationUi from "../../../components/chat-main-user/page";
import ConversationUiChannel from "../../../components/chat-main-channel/ConversationUiChannel";
import { ListUsersChat } from "../../../components/liste/ListUsersChat";
import withAuth from "../../../hoc/auth";

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
  const [component, setComponent] = useState<componentType>("users");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);
  const [conversationType, setConversationType] = useState("");
  const [componenetChannelModal, setcomponenetChannelModal] =
    useState("public");

  function render() {
    switch (component) {
      case "channels":
        return (
          <>
            {[...Array(20)].map((_, idx) => (
              <ChannelsChat
                onClick={() => setConversationType("channels")}
                time={dataChannels.time}
                nameChannels={dataChannels.nameChannels}
                msg={dataChannels.msg}
                pic={dataChannels.pic}
                key={idx}
              />
            ))}
          </>
        );

      case "users":
        return (
          <>
            {[...Array(20)].map((_, idx) => (
              <Userschat
                onClick={() => setConversationType("users")}
                time={data.time}
                name={data.name}
                msg={data.msg}
                url={data.url}
                key={idx}
              />
            ))}
          </>
        );
    }
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
            {[...Array(4)].map((_, idx) => (
              <ListUsersChat
                name={data.name}
                url={data.url}
                key={idx}
                className=" w-"
              />
            ))}
          </div>
        </div>
      </ModalUI>

      
       {/* modal channels  */}

      <ModalUI open={isAddOpenChannelModal} onClose={onCloseAddChannelModal} title='add Conversation'>
        <div className='flex justify-center items-center p-3 flex-col  max-h-72 gap-2' >
          <div className='flex flex-row' >
            <input type="text" className='h-7 p-1 px-3 rounded-md w-2/3 mr-2 ' />
            <select defaultValue={componenetChannelModal} name="channels" id="" className='rounded-md' onChange={(e) => setcomponenetChannelModal(e.target.value) }>
              <option value="public">
                public
              </option>
              <option value="private">
                private
              </option>

            </select>
          </div>

          {componenetChannelModal === "private" && (
            <input
              type="password"
              className="h-7 p-1 px-3 rounded-md w-2/3 mr-2  justify-start"
            />
          )}
          <Button onClick={() => {}} title="add channel"></Button>
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
              className=" bg-white h-10 w-full text-black  rounded-full pl-3"
            />
          </div>
          <div className=" px-2 h-24 flex gap-2 justify-center  items-center ">
            <Button
              onClick={() => setIsAddOpen(true)}
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
            fullName="mustapha ouarsas"
            image="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg"
            status="offline"
          />
        ) : conversationType === "channels" ? (
          <ConversationUiChannel fullName={""} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default Chat;
// export default withAuth(Chat);
