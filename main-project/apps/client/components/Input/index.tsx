import React, { ChangeEvent } from 'react'


type Props = {
    value : string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>  void;
}

function Input({value , onChange, className} :Props) {
  return (
    <input className={`w-full h-11 py-1 px-2 rounded-md ${className}`} onChange={onChange} maxLength={12}   value={value}/>
  )
}

export default Input