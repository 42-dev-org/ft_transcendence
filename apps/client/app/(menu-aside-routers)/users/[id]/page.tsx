'use client';
import Image from 'next/image';
import React from 'react'
import Button from '../../../../components/Button';
import HistoryCard from '../../../../components/Card/historyCard';


const data = {
  name:"zakaria", url:'https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg'}

  const data2 = {
    name: 'amounach',
    url : "https://cdn.intra.42.fr/users/e02b4524213b7315479b9ed9f3551093/amounach.jpg"
  }

function UserProfile() {
  return (
    <div className='flex flex-col p-4 w-full h-full gap-y-5' >
        <div className='w-full min-h-[300px] bg-[#ffffff1a] relative rounded-lg' />
        <div className='w-full flex  p-4 '>
          <div className='lg:min-w-[140px]  relative'>
          <Image width={140} height={140} className='rounded-full absolute -top-20 left-0'  alt='zakaria' src='https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg'/>
          </div>
            <div className='w-full ml-5 flex justify-between'>
            <span className='text-white text-xl font-medium whitespace-nowrap'>Zakaria Maziane</span>
              <div className='flex gap-2'>
                <Button  onClick={() => null} title='Add Freind'/>
                <Button  onClick={() => null} title='Send Message' className='bg-[#ffffff1a] text-white'/>
              </div>
            </div>
        </div>
        <div className='grid md:grid-cols-2 mt-4  gap-5 '>
           <div className='flex  gap-4 flex-col'>
            <h2>History</h2>

            {
                [...Array(20)].map((_, idx) => (
                    <HistoryCard  user1={data} user2={data2} key={idx}/>
                ))
            }
           </div>
           <div className='bg-green-600'>....</div>
        </div>
    </div>
  )
}

export default UserProfile