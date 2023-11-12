import Image from 'next/image'
import React from 'react'
import ProfileImage from '../../../components/profile-image/profile-image';


function Profile(): JSX.Element {
  return (
    <div className=' flex flex-col h-full m-2 rounded-md w-full bg-[#1B1B1B]'>
      <div className='flex h-1/4 mt-2 justify-start '>
        <ProfileImage
          imageUrl="https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg"
          name="zakaria maziane"
        />
      </div>
      <div className='flex flex-row h-3/4 w-full bg-red-500'>
      <div className='flex h-full w-1/2 bg-green-500'></div>
      <div></div>
      </div>

    </div>
  )
}

export default Profile