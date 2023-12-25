import React, { useEffect, useState } from 'react';
import ListOfUsersChannal from './ListOfUsersChannel';
import ListOfBannedChannal from './ListOfBannedChannal';
import ListOfMutedChannal from './ListOfMutedChannal';




type SelecterType = "Members" | "Admins" | "Muted" | "Banned";

const UserData = {
  name: "ouarsass",
  url: "https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg",
  uId: "hereUId"
};

enum Role{
  user,
  admin,
  owner
}

export function OptionsListChannel(props: {menuList: string[], userType, setshowOpstions: any}): JSX.Element {

    const [selected, setSelected] = useState<
    SelecterType
    >("Members");
    const [menuList, setMenuList] = useState<string[]>(['Invite Game'])

    const [userTypeRole, setUserTypeRole] = useState<Role>(Role.owner) // for select

    useEffect(() => {
        if(userTypeRole === Role.owner || userTypeRole === Role.admin)
        {
          setMenuList(["Members", "Admins", "Muted", "Banned"])
        }
        if(userTypeRole === Role.user){
          setMenuList(["Members"])
        }

    }, [userTypeRole])

    const render = () => {
        if (selected === "Members")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full '>
                  {
                    [...Array(10)].map((_, i) => (
                      <ListOfUsersChannal
                      setshowOpstions={props.setshowOpstions}
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      uId={UserData.uId}
                      isAdmin={true}
                      isOwner={false}
                      menuList={props.menuList}
                      />
                    ))
                  }
                </div>
            );
        }
        if (selected === "Admins")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(3)].map((_, i) => (
                      <ListOfUsersChannal
                      setshowOpstions={props.setshowOpstions}
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      uId={UserData.uId}
                      isAdmin={true}
                      isOwner={true}
                      menuList={props.menuList}

                      />
                    ))
                  }
                </div>
            );
        }
        if (selected === "Muted" && props.userType)
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(4)].map((_, i) => (
                      <ListOfMutedChannal
                      setshowOpstions={props.setshowOpstions}
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      uId={UserData.uId}
                      menuList={props.menuList}
                      setMenuList={["Unmuted"]}
                      />
                    ))
                  }
                </div>
            );
        }
        if (selected === "Banned" && props.userType)
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(1)].map((_, i) => (
                      <ListOfBannedChannal
                      setshowOpstions={props.setshowOpstions}
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      uId={UserData.uId}
                      menuList={props.menuList}
                      setMenuList={["Unbaned"]}
                      />
                    ))
                  }
                </div>
            );
        }
    };

  return (
    <div className="flex flex-col justify-center items-center gap-4 overflow-hidden w-full " >
    <select className=' rounded-md py-1 px-5 bg-slate-400' name="" id="" value={selected} onChange={(e) => {setSelected(e.target.value as SelecterType)}} >

      {
          menuList.map((elm) => (
          <option value={elm} key={elm}>
            {elm}
          </option>
        ))
      }
    </select>
      <div className='overflow-y-scroll w-full h-96'>
        {render()}
      </div>
    </div>
  );
};

export default OptionsListChannel;