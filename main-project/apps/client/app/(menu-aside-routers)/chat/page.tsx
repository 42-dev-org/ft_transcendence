'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Userschat from '../../../components/Chat/Userschat'

type componentType = 'users' | 'channels'
const data = {
  msg: ' hello neo',
  name: 'zakaria maziane',
  numberMsg: 2,
  url: 'https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg',
  time: '17:57'
}

// const [borderMsg, setborderMsg] = useState(false)
// function Addborder() {
//   // setborderMsg(!borderMsg);

// } 
const Chat = () => {
  const [component, setComponent] = useState<componentType>('users')

  function render() {
    switch (component) {
      case 'channels':

        return <div>Channels</div>;

      case 'users':

        return <>
        {
          
          [...Array(8)].map((_, idx) => (
            <Userschat time={data.time} name={data.name} msg={data.msg} url={data.url} numberMsg={data.numberMsg} key={idx} />
            ))
          }
          </>
        
    }
  }
  return (
    <div className=' flex  w-full h-full bg-slate-400 '>
      <div className='flex flex-col w-1/3  text-white  bg-black h-full py-2 gap-y-2 px-1'>
        <div>

          <input type="text" placeholder=' Search' className=' h-12 w-full text-black  rounded-full pl-3' />
        </div>
        <div className='flex   w-full h-12  justify-center bg-black items-center '>
          <div className='flex w-1/3  h-10 hover:bg-[#1B1B1B] rounded-md focus:border focus:border-spacing-1 text-white justify-center items-center ' onClick={setComponent.bind(null, 'users')} >Users</div>
          <div className='flex w-1/3  h-10 hover:bg-[#1B1B1B] rounded-md text-white justify-center items-center' onClick={setComponent.bind(null, 'channels')}>Channels</div>
        </div>
        {render()}
      </div>
      <div></div>
    </div>
  )
}

export default Chat