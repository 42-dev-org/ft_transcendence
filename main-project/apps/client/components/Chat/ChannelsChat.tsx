import React, { Component, Fragment, useState } from 'react'
import { MdGroups2 } from "react-icons/md";
import Button from '../Button';
import ModalUI from '../Modal';

type usersChat = {
    nameChannels: string,
    msg: string,
    time: string
    onClick: (uid: string) => void;
    uid: string
}






function ChannelsChat({ nameChannels, msg, time, onClick, uid }: usersChat) {
    type componentType = "public" | "privet" | "protected"

    const [password, setPassword] = useState("");
    const [isopenJoinmodal, setOpenJoinmodal] = useState(false);
    const [component, setComponent] = useState<componentType>('public')
    const onCloseJoinmodal = () => setOpenJoinmodal(false);


    return (
        <Fragment>


            <ModalUI
                open={isopenJoinmodal}
                onClose={onCloseJoinmodal}
                title="Join channel"
                >
                <div className='flex justify-center items-center p-3 flex-col  max-h-72 gap-2'>
                    {component === 'protected' && (
                         <input
                         placeholder="set a password"
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="h-7 p-1 px-3 rounded-md w-2/3 mr-2  justify-start"
                       />

                    )}
                    <Button title='Join' onClick={() => null}></Button>
                </div>
            </ModalUI>
            
            
            <div className='flex  relative h-16 w-full bg-black hover:bg-[#1B1B1B]' onClick={onClick.bind(null, uid)}>
                <div className=' h-14 w-14 rounded-full  bg-[#1B1B1B] px-2 mx-2 flex justify-center items-center text-white'>
                    <MdGroups2 size={30} />
                </div>
                <div className='flex flex-row w-full justify-between'>

                    <div className='flex flex-col   py-2'>
                        <span className=' text-[#f8f4f4] text-md font-mono'>
                            {nameChannels}
                        </span>
                        <span className='  text-sm flex justify-star items-center  font-medium text-[#707991]'>
                            You:
                            {msg}
                        </span>
                    </div>
                    <div className='flex  items-start mt-1'>
                        <span className=' text-[#707991]  mt-2 justify-end text-xs'>
                            {time}
                        </span>
                    </div>
                    <div>
                        <Button title='modal' onClick={() => setOpenJoinmodal(true)} ></Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ChannelsChat