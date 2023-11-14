import React, { ReactNode } from 'react'

type Props = {
    className ?: string;
    onClick : VoidFunction;
    title: string;

}

export default function Button({className, onClick, title} :Props) {
  return (
    <button  className={`bg-[#B2F35F]  rounded-md text-sm font-medium hover:opacity-90 px-3 py-2 ${className}`} onClick={onClick} >
        {title}
    </button>
  )
}
