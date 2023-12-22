import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

type Props = {
    imageUrl: string
    senderName: string;
    msg: string
}

export default function RecieverLayout({imageUrl, senderName, msg}:Props) {
  return (
    <div className="w-max max-w-[50%] flex gap-2">
      <Link href={'users/1'}>
    <Image
      alt="user"
      className="rounded-full max-w-[36px] max-h-[36px]"
      height={36}
      src={imageUrl}
      width={36}
      />
      </Link>
    <div className="flex flex-col gap-2 ">
      <span className="text-sm text-white">{senderName}</span>
      <span className="rounded-xl bg-slate-300 p-2">
        {msg}
      </span>
    </div>
  </div>
  )
}
