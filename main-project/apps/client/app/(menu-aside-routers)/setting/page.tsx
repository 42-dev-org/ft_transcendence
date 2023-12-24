'use client'
import Image from 'next/image';
import React, {useRef, useState} from 'react'
import Input from '../../../components/Input';
import withAuth from '../../../hoc/auth';


function setting(): JSX.Element {
  const inputRef = useRef<any>(null)
  const [picProfile, setPicProfile] = useState('https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg')
  
  const onHandlePicture = (e:any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        // setPicProfile(fileReader.result);
        if (fileReader.result) {
          setPicProfile(fileReader.result as string);
        }
    };
    fileReader.onerror = (error) => {
        alert(error);
    };
  }
  return (
    <div className=' flex flex-col w-full gap-y-3 h-full justify-center items-center'>
        <div className='w-44 h-44 relative'>
              <Image src={picProfile} width={200} height={200} className='w-full h-full rounded-full' alt='xx'/>
              <div className='absolute cursor-pointer w-9 h-9 flex justify-center items-center bg-[#1B1B1B] -right-2 bottom-6  rounded-full ' onClick={() => inputRef?.current?.click()}>
              <svg width={25} height={25} viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="13" r="3" stroke="#d9d9d9" strokeWidth="1.5"></circle> <path opacity="0.5" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z" stroke="#d9d9d9" strokeWidth="1.5"></path> <path d="M19 10H18" stroke="#d9d9d9" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
              </div>
              <input type='file' className='hidden' ref={inputRef} accept="image/png, image/jpeg" onChange={onHandlePicture}/>
        </div>
        <div className='flex flex-col gap-3'>
            <Input  onChange={(e) => console.log('login')} value="zmaziane" className='' />
        </div>
        <div className='flex flex-col gap-3'>
            <Input  onChange={(e) => console.log('lastName')} value="maziane" className='' />
        </div>
        <div className='flex flex-col gap-3'>
            <Input  onChange={(e) => console.log('firstName')} value="zakaria" className='' />
        </div>
    </div>
  )
}


export default withAuth(setting)