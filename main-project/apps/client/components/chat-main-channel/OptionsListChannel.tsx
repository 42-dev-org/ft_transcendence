import React, { useEffect, useState } from "react";
import ListOfUsersChannal from "./ListOfUsersChannel";
import ListOfBannedChannal from "./ListOfBannedChannal";
import ListOfMutedChannal from "./ListOfMutedChannal";
import ListOfAdminsChannal from "./ListOfAdminsChannal";
import { Mut, User, UsersWithRole, ViewerRole } from "./ConversationUiChannel";
import ListOfOwnersChannal from "./ListOfOwnersChannel";

type SelecterType = "participants"  | "admins" | "muted" | "banned" | 'owner';

interface PropsTypes {

  setshowOpstions: any;
  all: UsersWithRole[];
  mut: Mut[];
  ban: User[];
  admins: User[];
  role: ViewerRole;
  participants: User[];
  owners: User[];
  conversation: string;
  refetch: () => void;
}

export function OptionsListChannel(props: PropsTypes): JSX.Element {
  const [selected, setSelected] = useState<SelecterType>("participants");
  const [menuList, setMenuList] = useState<string[]>(["participants", "admins", "muted", "banned", "owner"]);


  const render = () => {
    if (selected === "participants") {
      return (
        <div className="flex flex-col justify-center items-center w-full ">
          {props.participants.map((_, i) => (
            <ListOfUsersChannal
              refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.firstName + " " + _.lastName}
              url={_.profileImage}
              key={i}
              uid={_.uid}
              role={props.role}
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
    if (selected === "owner") {
      return (
        <div className="flex flex-col justify-center items-center w-full ">
          {props.owners.map((_, i) => (
            <ListOfOwnersChannal
              refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.firstName + " " + _.lastName}
              url={_.profileImage}
              key={i}
              uid={_.uid}
              role={props.role}
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
    if (selected === "admins") {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          {props.admins.map((_, i) => (
            <ListOfAdminsChannal
            refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.firstName + " " + _.lastName}
              url={_.profileImage}
              key={i}
              setMenuList={
                props.role === "owner"
                  ? ["Remove Role Admin", "Invite Game"]
                  : ["Invite Game"]
              }
              uid={_.uid}
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
    if (selected === "muted") {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          {props.mut.map((_, i) => (
            <ListOfMutedChannal
            refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.user.firstName + " " + _.user.lastName}
              url={_.user.profileImage}
              key={i}
              uid={_.user.uid}
              conversation={props.conversation}
              setMenuList={
                props.role === "admin" || props.role === "owner"
                  ? ["Unmuted", "Invite Game"]
                  : ["Invite Game"]
              }
            />
          ))}
        </div>
      );
    }
    if (selected === "banned") {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          {props.ban.map((_, i) => (
            <ListOfBannedChannal
            refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.firstName + " " + _.lastName}
              url={_.profileImage}
              key={_.uid}
              menuList={menuList}
              uid={_.uid}
              setMenuList={
                props.role === "admin" || props.role === "owner"
                  ? ["Unbaned"]
                  : ["Invite Game"]
              }
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 overflow-hidden w-full ">
      <select
        className=" rounded-md py-1 px-5 bg-slate-400"
        name=""
        id=""
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value as SelecterType);
        }}
      >
        {menuList.map((elm) => (
          <option value={elm} key={elm}>
            {elm}
          </option>
        ))}
      </select>
      <div className="overflow-y-scroll w-full h-96">{render()}</div>
    </div>
  );
}

export default OptionsListChannel;
