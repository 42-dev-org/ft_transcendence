import React, { useEffect, useState } from "react";
import ListOfUsersChannal from "./ListOfUsersChannel";
import ListOfBannedChannal from "./ListOfBannedChannal";
import ListOfMutedChannal from "./ListOfMutedChannal";
import ListOfAdminsChannal from "./ListOfAdminsChannal";
import { Mut, User, UsersWithRole, ViewerRole } from "./ConversationUiChannel";

type SelecterType = "all" | "Members" | "Admins" | "Muted" | "Banned";

interface PropsTypes {
  userType;
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
  const [selected, setSelected] = useState<SelecterType>("all");
  const [menuList, setMenuList] = useState<string[]>(["Invite Game"]);

  useEffect(() => {
    if (props.role === "admin" || props.role === "owner") {
      setMenuList(["all", "Admins", "Muted", "Banned"]);
    } else {
      setMenuList(["all"]);
    }
  }, [props.role]);

  const render = () => {
    if (selected === "all") {
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
              menuList={menuList}
              role={props.role}
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
    if (selected === "Admins" && props.userType) {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          {props.admins.map((_, i) => (
            <ListOfAdminsChannal
            refetch={props.refetch}
              setshowOpstions={props.setshowOpstions}
              name={_.firstName + " " + _.lastName}
              url={_.profileImage}
              key={i}
              menuList={menuList}
              setMenuList={
                props.role === "owner"
                  ? ["Remove Role Admin", "invite for game"]
                  : ["invite for game"]
              }
              uid={_.uid}
              conversation={props.conversation}
            />
          ))}
        </div>
      );
    }
    if (selected === "Muted" && props.userType) {
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
              menuList={menuList}
              setMenuList={
                props.role === "admin" || props.role === "owner"
                  ? ["Unmuted", "invite for a game"]
                  : ["invite for a game"]
              }
            />
          ))}
        </div>
      );
    }
    if (selected === "Banned" && props.userType) {
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
                  : []
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
