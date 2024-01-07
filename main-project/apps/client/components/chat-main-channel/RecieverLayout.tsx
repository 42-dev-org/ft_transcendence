import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { User } from "./ConversationUiChannel";


interface Props  {
    imageUrl: string
    senderName: string;
    msg: string
    participant: User
}

export default function RecieverLayout(props: Props) {
  return (
    <div className="w-max max-w-[50%] flex gap-2">
      <Link href={'users/'+props?.participant?.uid}>
    <Image
      alt="user"
      className="rounded-full max-w-[36px] max-h-[36px]"
      height={36}
      src={props.imageUrl}
      width={36}
      />
      </Link>
    <div className="flex flex-col gap-2 break-all">
      <span className="text-sm text-white">{props.senderName}</span>
      <span className="rounded-xl bg-slate-300 p-2">
        {props.msg}
      </span>
    </div>
  </div>
  )
}
