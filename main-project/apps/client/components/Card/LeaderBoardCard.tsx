import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import First from 'assets-workspace/images/MedalFirstPlace.png'
import Second from 'assets-workspace/images/MedalSecondPlace.png'
import Third from 'assets-workspace/images/MedalThirdPlace.png'
import Point from 'assets-workspace/images/points.png'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';




type usersLeaderBoardProrps = {
  name: string;
  url: string;
  kay: number
}


function LeaderBoardCard({ name, url, kay }: usersLeaderBoardProrps) {

  const [tag, setTag] = useState<string | StaticImport | number>(First);

  const getAssets = () => {
    switch (kay) {
      case 0: {
        return First
      }
      case 1: {
        return Second
      }
      case 2: {
        return Third
      }
    }
    return Point
  }
  return (
    <div className=' lg:w-3/4  h-14 grid grid-cols-3  w-full  bg-[#ffffff1a] rounded-2xl '>
      <div className='flex ml-2 items-center'>

        <Image width={35} height={35} className='rounded-full flex items-center w-11 h-11' src={url} alt={name} />
      </div>
      <Link href='/profile' className='flex whitespace-nowrap items-center hover:underline'>
        {name}
      </Link>
      {
        kay < 3 &&
        <div className='flex justify-end items-start mr-2'>
          <Image width={40} height={30} className='flex justify-end' src={getAssets()} alt='icon' ></Image>
        </div>
      }
    </div>
  )
}

export default LeaderBoardCard