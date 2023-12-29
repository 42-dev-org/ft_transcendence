import Image, { StaticImageData } from 'next/image';
import React from 'react'

type AchevmentProps = {
    name: string;
    url: string;

}



function AchevementCard({name, url}:AchevmentProps): JSX.Element  {
  return (
    <div className='w-full h-56 m-0.5 grid grid-rows-2  bg-[#ffffff1a] justify-items-center rounded-lg'>

      <Image className='w-full rounded-lg h-44 object-cover' alt={name} width={100} height={200} src={url} />
      <span className='text-white flex items-end'>{name}</span>
    </div>
  )
}

export default AchevementCard