import React, { FormEvent , useState} from 'react';
import ListOfUsersChannal from './ListOfUsersChannel';




type SelecterType = "Members" | "Admins" | "Muted" | "Banned";

const UserData = {
  name: "ouarsass",
  url: "https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg",
};

export function OptionsListChannel(): JSX.Element {

    const [selected, setSelected] = useState<
    SelecterType
    >("Members");

    const render = () => {
        if (selected === "Members")
        {
            return (
                <div className='flex flex-col justify-center items-center w-full'>
                  {
                    [...Array(5)].map((_, i) => (
                      <ListOfUsersChannal
                      name={UserData.name}
                      url={UserData.url}
                      key={i}
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
                      />
                    ))
                  }
                </div>
            );
        }
    };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full" >
    <select className=' rounded-md py-1 px-5 bg-slate-400' name="" id="" value={selected} onChange={(e) => {setSelected(e.target.value as SelecterType)}} >
      {
        ["Members", "Admins", "Muted", "Banned"].map((elm) => (
          <option value={elm} key={elm}>
            {elm}
          </option>
        ))
      }
    </select>
      {render()}
    </div>
  );
};

export default OptionsListChannel;
