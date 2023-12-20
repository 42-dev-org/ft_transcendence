import Image from 'next/image'
import React from 'react'
import MenuItem from '../Menu-chat'
import { IoMdMore } from 'react-icons/io'
import { FaCrown } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";


type usersInChannal = {
    name: string,
    url: string,
}

function ListOfUsersChannal({ name, url }): JSX.Element {

    const onActionClicked = (action: string) => {
        switch (action) {
            case 'ban':
                break;
        }
    }
    return (
        <div className='flex flex-row relative h-16 hover:bg-[#1B1B1B] w-full'>
            <div className='flex flex-row w-full justify-between items-center'>
                <div className='px-2'>
                    <Image width={40} height={40} className='rounded-full  left-1 bottom-2 ' alt='zakaria' src={url} />
                </div>
                <div className='flex flex-col py-4'>
                    <span className=' text-[#F5F5F5] text-md font-mono justify-center items-center '>
                        {name}
                    </span>
                </div>
                <div className='(isAdmin and isOwner) flex flex-row '>
                    <FaCrown color='yellow' size={10} className='m-1' />
                    <MdAdminPanelSettings color='green' size={12} className='m-1' />
                </div>

                <div className='flex  items-start mt-1'>
                    <div className='text-[#707991]  mt-2 justify-end text-xs'>
                        <MenuItem iconBtn={
                            <IoMdMore size={24} color="gray" />
                        } >
                            {
                                ['Mute', 'Ban', 'kick'].map(action => <button className=" hover:bg-[#B2F35F] rounded-md" onClick={onActionClicked.bind(null, action.toLowerCase())} >{action}</button>)
                            }
                        </MenuItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOfUsersChannal