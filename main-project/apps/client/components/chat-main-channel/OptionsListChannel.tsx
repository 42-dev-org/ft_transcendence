import React, { useEffect, useState } from 'react';
import ListOfUsersChannal from './ListOfUsersChannel';




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

export function OptionsListChannel(): JSX.Element {

    const [selected, setSelected] = useState<
    SelecterType
    >("Members");
    const [menuList, setMenuList] = useState<string[]>(['View Profile', 'Invite Game'])

    // change type of logged user
    const [userType, setUserType] = useState<Role>(Role.admin)

    useEffect(() => {
        if(userType === Role.owner)
          setMenuList(['Mute', 'Ban', 'kick', 'View Profile', 'Invite Game', 'Set as Admin'])
        if(userType === Role.admin)
          setMenuList(['Mute', 'Ban', 'kick', 'View Profile', 'Invite Game'])

    }, [userType, menuList])

    const render = () => {
        if (selected === "Members")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full '>
                  {
                    [...Array(10)].map((_, i) => (
                      <ListOfUsersChannal
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      menuList={menuList}
                      uId={UserData.uId}
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
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      menuList={menuList}
                      uId={UserData.uId}

                      />
                    ))
                  }
                </div>
            );
        }
        if (selected === "Muted")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(4)].map((_, i) => (
                      <ListOfUsersChannal
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      menuList={menuList}
                      uId={UserData.uId}
                      />
                    ))
                  }
                </div>
            );
        }
        if (selected === "Banned")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(1)].map((_, i) => (
                      <ListOfUsersChannal
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
                      menuList={menuList}
                      uId={UserData.uId}
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
        ["Members", "Admins", "Muted", "Banned"].map((elm) => (
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