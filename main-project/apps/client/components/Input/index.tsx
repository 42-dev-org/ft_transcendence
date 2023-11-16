import React, { ChangeEvent } from 'react'


type Props = {
    value : string;
    className?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) =>  void;
}

function Input({value , onChange, className} :Props) {
  return (
    <input className={`w-full h-11 py-1 px-2 rounded-md ${className}`} onChange={onChange}  value={value}/>
  )
}

export default Input