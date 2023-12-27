import React, { Fragment, useState } from 'react'
import GenerateTimeMuted from './GenerateTimeMuted';

export default function OptionsOwner() {

    const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);



    const onActionClicked = (action: string) => {
        if (action ==='mute') {
                setIsAddOpenChannelModal(true);
        }
        if (action == 'ban'){
            // <FtViewProfile url={url}/> 
            alert("ban ghiyrha")
            // router.push(`/users/${uId}`)
        }
        if (action == 'invite game'){
            // <FtViewProfile url={url}/> 
            alert("invite game dfe3 lkhra il3eb")
            // router.push(`/users/${uId}`)
        }
        if (action == 'invite game'){
            // <FtViewProfile url={url}/> 
            alert("invite game dfe3 lkhra il3eb")
            // router.push(`/users/${uId}`)
        }
    }
  return (
    <Fragment>

    <div>
        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Invite Game".toLowerCase())} >Invite Game</button>
        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Set as Admin".toLowerCase())} >Set as Admin</button>
        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Mute".toLowerCase())} >Mute</button>
        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Kick".toLowerCase())} >Kick</button>
        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Ban".toLowerCase())} >Ban</button>

    </div>
        <GenerateTimeMuted isAddOpenChannelModal={isAddOpenChannelModal} setIsAddOpenChannelModal={setIsAddOpenChannelModal} />
    </Fragment>

  )
}
