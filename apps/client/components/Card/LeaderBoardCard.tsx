import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import First from'assets-workspace/images/MedalFirstPlace.png'

type usersLeaderBoardProrps = {
    name: string;
    url: string;
}

function LeaderBoardCard({name, url}: usersLeaderBoardProrps) {
  return (
    <div className='w-3/4 h-14 grid grid-cols-3  bg-[#ffffff1a] rounded-2xl '>
        <div className='flex ml-2 items-center'>

        <Image width={35} height={35} className='rounded-full flex items-center w-11 h-11' src={url} alt={name} />
        </div>
        <Link href='/profile' className='flex items-center hover:underline'>
            {name}
        </Link>
        <div className='flex justify-end items-start mr-2'>
            <Image width={40} height={30} className='flex justify-end' src={First} alt='icon' ></Image>
        </div>
    </div>
  )
}

export default LeaderBoardCard