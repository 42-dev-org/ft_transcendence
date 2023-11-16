'use client';
import React from 'react'
import LeaderBoardCard from '../../../components/Card/LeaderBoardCard'

const data ={
  name: 'zakaria maziane',
  url: 'https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg'
}

function page() {
  return (
    <div className='flex flex-col gap-4 p-2 m-2 rounded-lg h-full w-full bg-[#1B1B1B] text-white justify-center items-center'>
      <h2 className='h-11 w-44 mb-11 flex text-black rounded-lg justify-center items-center bg-[#B2F35F]'>Leader Board</h2>
      {
        [...Array(6)].map((_, idx) => (
          <LeaderBoardCard name={data.name} url={data.url} kay={idx} key={idx} />
        ))
      }
    </div>
  )
}

export default page