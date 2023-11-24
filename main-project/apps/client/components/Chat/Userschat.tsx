import Image from 'next/image'
import { type } from 'os'
import React from 'react'

type usersChat = {
    name: string,
    msg: string,
    numberMsg: number,
    url: string,
    time: string
}
function Userschat({ msg, name, time, numberMsg, url }) {

    return (
        <div className='flex  relative h-16 w-full bg-black hover:bg-slate-500'>
            <div className=''>
                <Image width={40} height={40} className='rounded-full absolute  left-3 bottom-2 ' alt='zakaria' src={url} />
            </div>
            <div className='flex flex-row w-full justify-between'>

                <div className='flex flex-col ml-16  py-2'>
                    <span className=' text-[#F5F5F5] text-md font-mono'>
                        {name}
                    </span>
                    <span className='  text-sm flex justify-star items-center font-serif text-[#707991]'>
                        You:
                        {msg}
                    </span>
                </div>
                <div className='flex flex-col  justify-between items-center'>
                    <span className=' text-[#707991]  mt-2 justify-end text-sm'>
                        {time}
                    </span>
                    <span className=' flex justify-center items-center mb-2 text-black w-5 h-5 bg-[#B2F35F] rounded-full'>
                        {numberMsg}
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Userschat