import React from 'react'

export default function SenderLayout({msg}: {msg: string}) {
  return (
    <div
        className="w-max max-w-[50%] p-2 rounded-xl bg-[#b9ef72] self-end">
        <span>{msg}</span>
    </div>
  )
}
