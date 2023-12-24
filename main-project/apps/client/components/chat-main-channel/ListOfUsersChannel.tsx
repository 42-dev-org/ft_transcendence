import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import MenuItem from '../Menu-chat'
import { IoMdMore } from 'react-icons/io'
import { FaCrown } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import GenerateTimeMuted from './GenerateTimeMuted';
import Link from 'next/link';
import FtViewProfile from './FtViewProfile';
import { useRouter } from 'next/navigation';


type usersInChannal = {
    name: string,
    url: string,
    uId: string,
}

function ListOfUsersChannal(props: {isAdmin, isOwner, name, url, uId , setshowOpstions, menuList:string[]}): JSX.Element {

    // const isAdmin = true;
    // const isOwner = true;
    const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);

    const router = useRouter();
    const {isAdmin, isOwner, name, url, uId , setshowOpstions, menuList} = props;
    const onActionClicked = (action: string) => {
        console.log("my action   " + action)
        if (action ==='mute') {
                setIsAddOpenChannelModal(true);
        }
        if (action == 'ban'){
            // <FtViewProfile url={url}/> 
            alert("ban")
            // router.push(`/users/${uId}`)

        }
    }
    return (
        <Fragment>

        <div className='flex flex-row relative h-16 hover:bg-[#1B1B1B] w-full'>
            <div className='flex flex-row w-full justify-between items-center'>
                <Link className='flex flex-row items-center' href={'/users/1'} onClick={() => setshowOpstions(false)}>
                <div className='px-2'>
                    <Image width={40} height={40} className='rounded-full  left-1 bottom-2 ' alt='zakaria' src={url} />
                </div>
                <div className='flex flex-col py-4'>
                    <span className=' text-[#F5F5F5] text-md font-mono justify-center items-center '>
                        {name}
                    </span>
                </div>
                </Link>
                <div className='(isAdmin and isOwner) flex flex-row '>
                    {isOwner && <FaCrown color='yellow' size={10} className='m-1' />}
                    {isAdmin && <MdAdminPanelSettings color='green' size={12} className='m-1' />}
                </div>

                <div className='flex  items-start mt-1'>
                    <div className='text-[#707991]  mt-2 justify-end text-xs'>
                        <MenuItem iconBtn={
                            <IoMdMore size={24} color="gray" />
                        } >
                            {
                                
                                menuList.map(action => <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, action.toLowerCase())} >{action}</button>)
                            }
                        </MenuItem>
                    </div>
                </div>
            </div>
        </div>

        <GenerateTimeMuted isAddOpenChannelModal={isAddOpenChannelModal} setIsAddOpenChannelModal={setIsAddOpenChannelModal} />
    </Fragment>
    )
}

export default ListOfUsersChannal