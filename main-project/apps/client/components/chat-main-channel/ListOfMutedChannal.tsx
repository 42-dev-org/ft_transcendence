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
import ListOfUsersChannal from './ListOfUsersChannel';


type usersInChannal = {
    name: string,
    url: string,
    uId: string,
}

function ListOfMutedChannal(props: {name, url, uId , setshowOpstions, menuList:string[], setMenuList:string[]}): JSX.Element {


    const router = useRouter();
    const {name, url, uId , setshowOpstions, menuList , setMenuList} = props;
    const onActionClicked = (action: string) => {
        console.log("my action   " + action)

        if (action == 'unmuted'){
            alert("here action unmuted")
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

                <div className='flex  items-start mt-1'>
                    <div className='text-[#707991]  mt-2 justify-end text-xs'>
                        <MenuItem iconBtn={
                            <IoMdMore size={24} color="gray" />
                        } >
                            {
                                
                                setMenuList.map(action => <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, action.toLowerCase())} >{action}</button>)
                            }
                        </MenuItem>
                    </div>
                </div>
            </div>
        </div>

    </Fragment>
    )
}

export default ListOfMutedChannal