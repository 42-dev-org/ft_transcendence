import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

type userProps = {
  name :string;
  url: string
}

type Props = {
    user1: userProps;
    user2: userProps
}

function HistoryCard({user1, user2}:Props) {
  return (
    <div className='w-full h-14  bg-[#ffffff1a] grid grid-cols-3 justify-items-center rounded-xl	'>
      <div className='flex gap-4  text-white items-center'>
          <Image width={35} height={35} className='rounded-full w-11 h-11' src={user1.url} alt={user1.name}/>
          <Link href='users/1' className='hover:underline'>
              {user1.name}
          </Link>
      </div>
            <span className='text-white flex font-bold self-center'>4 : 1</span>
        <div className='flex gap-4 text-white items-center'>
        <Link href='/' className='hover:underline'>
              {user2.name}
          </Link>
          <Image width={35} height={35} className='rounded-full h-11 w-11'  src={user2.url} alt={user2.name}/>
      </div>
    </div>
  )
}

export default HistoryCard