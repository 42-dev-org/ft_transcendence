import Link from 'next/link'
import React from 'react'
import Button from '../Button'

function InvitationsCard({url, username}: {url:string , username:string}) {
    return (
        <div  className='w-full flex rounded-lg border  border-[#B2F35F] overflow-hidden h-72 flex-col '>
            <img className='w-full h-[60%] object-cover'    alt='profile' src={url} />
            <div className='bg-[#1c1e21] w-full h-full space-y-2 flex py-2 px-5 flex-col items-center '>
                <span className='text-[#e4e6eb] capitalize'>{username}</span>
                <Button title='Accept invitation' className='py-1 w-full' onClick={() => null}/>
                <Link  className='py-1 w-full text-center bg-[#ffffff1a] rounded-lg text-sm font-medium hover:opacity-70 px-3  text-white' href='users/1'>
                    View Profil
                </Link>
            </div>
        </div>
      )
}

export default InvitationsCard