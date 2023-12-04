import React from 'react'

type usersChat = {
    nameChannels: string,
    pic: string,
    msg: string,
    time: string
    onClick : VoidFunction
}
function ChannelsChat({nameChannels, pic, msg, time, onClick}) {


  return (
    <div className='flex  relative h-16 w-full bg-black hover:bg-[#1B1B1B]' onClick={onClick}>
    <div className=' h-14 w-14 rounded-full  bg-[#1B1B1B] px-2 mx-2 flex justify-center items-center text-white'>
        {pic}
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
    </div>
</div>
  )
}

export default ChannelsChat