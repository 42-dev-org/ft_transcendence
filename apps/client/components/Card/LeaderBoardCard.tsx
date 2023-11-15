import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import First from'assets-workspace/images/MedalFirstPlace.png'
import Second from 'assets-workspace/images/MedalSecondPlace.png'
import Third from 'assets-workspace/images/MedalThirdPlace.png'
import Point from 'assets-workspace/images/points.png'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';




type usersLeaderBoardProrps = {
    name: string;
    url: string;
    kay: number
}


function LeaderBoardCard({name, url, kay}: usersLeaderBoardProrps) {

    const [tag, setTag] = useState<string  | StaticImport>(First); 

    useEffect(() => {
        // Update the tag value according to the kay prop
        if (kay === 0) {
          setTag(First);
        } else if (kay === 1) {
          setTag(Second);
        } else if (kay === 2) {
          setTag(Third);
        } else {
          setTag(Point);
        }
      }, [kay]);

  return (
    <div className='w-3/4 h-14 grid grid-cols-3  bg-[#ffffff1a] rounded-2xl '>
        <div className='flex ml-2 items-center'>

        <Image width={35} height={35} className='rounded-full flex items-center w-11 h-11' src={url} alt={name} />
        </div>
        <Link href='/profile' className='flex items-center hover:underline'>
            {name}
        </Link>
        <div className='flex justify-end items-start mr-2'>
            <Image width={40} height={30} className='flex justify-end'  src={tag} alt='icon' ></Image>
        </div>
    </div>
  )
}

export default LeaderBoardCard