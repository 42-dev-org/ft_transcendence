import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import MenuItem from '../Menu-chat'
import { IoMdMore } from 'react-icons/io'
import { FaCrown, FaPeopleArrows } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import GenerateTimeMuted from './GenerateTimeMuted';
import Link from 'next/link';
import FtViewProfile from './FtViewProfile';
import { useRouter } from 'next/navigation';
import { ViewerRole } from './ConversationUiChannel';
import OptionsRules from './OptionsOwner';
import OptionsOwner from './OptionsOwner';


type usersInChannal = {
    name: string,
    url: string,
    uId: string,
}

function ListOfUsersChannal(props: {  name, url, uId, setshowOpstions, menuList: string[], role: ViewerRole }): JSX.Element {

    const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);

    const {  name, url, uId, setshowOpstions, menuList, role } = props;
    const onActionClicked = (action: string) => {
        if (action === 'mute') {
            setIsAddOpenChannelModal(true);
        }
        if (action == 'ban') {
            alert("ban")

        }
    }
    return (
        <Fragment>

            <div className='flex flex-row relative h-16 hover:bg-[#1B1B1B] w-full'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <Link className='flex flex-row items-center' href={'/users/1'} onClick={() => setshowOpstions(false)}>
                        <div className='px-2'>
                            <Image width={40} height={40} className='rounded-full  left-1 bottom-2 ' alt='zakaria' src={props.url} />
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
                            <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" >Invite Game</button>
                                {
                                    role === "owner" &&
                                    <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Set as Admin".toLowerCase())} >Set as Admin</button>
                                }
                                {
                                    (role === "admin" || role === 'owner') &&
                                    <>
                                        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Mute".toLowerCase())} >Mute</button>
                                        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Kick".toLowerCase())} >Kick</button>
                                        <button className=" hover:bg-[#B2F35F] rounded-md flex items-center justify-center" onClick={onActionClicked.bind(null, "Ban".toLowerCase())} >Ban</button>
                                    </>
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