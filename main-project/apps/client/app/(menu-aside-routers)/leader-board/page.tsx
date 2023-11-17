'use client';
import React from 'react'
import LeaderBoardCard from '../../../components/Card/LeaderBoardCard'

const data ={
  name: 'zakaria maziane',
  url: 'https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg'
}

function page() {
  return (
    <div className=' overflow-hidden flex  h-full w-full rounded-lg m-5 bg-[#1B1B1B]'>
      <div className=' overflow-y-auto max-h-[90%] flex flex-col items-center gap-4 p-2 m-2 rounded-lg h-full w-full  text-white justify-start '>

      <h2 className='h-11 w-44 mb-11 flex m-11 p-5 text-black rounded-lg justify-center items-center bg-[#B2F35F]'>Leader Board</h2>
      {
        [...Array(11)].map((_, idx) => (
          <LeaderBoardCard name={data.name} url={data.url} kay={idx} key={idx} />
          ))
        }
        </div>
    </div>
  )
}

export default page