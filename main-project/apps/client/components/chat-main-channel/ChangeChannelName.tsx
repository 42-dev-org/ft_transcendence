import React, { useState } from 'react';



type Props = {
    channelName: string;
    onSetName: (text: string) => void
}

export function ChangeChannelName({channelName, onSetName}) {
  const [modifie, setModifie] = useState(false)
  const [name, setName] = useState(channelName)

  return (
    <div className='text-white flex justify-center flex-col items-center gap-3 border-4 border-[#4d4d4d] py-2'>
        <div className=' font-bold text-white'>Rename channel</div>
        <div className='flex gap-1 justify-center'>
         <input className='text-black rounded-md px-3 disabled:bg-transparent disabled:text-white w-2/3' value={name} onChange={e => setName(e.target.value)} disabled={!modifie}/>
      <button className=' text-black px-4 bg-[#B2F35F] rounded-md' onClick={() => {setModifie(!modifie); modifie && onSetName(name)}}>{modifie ? 'Save' : 'Edit'}</button>
      </div>
    </div>
  );
}
