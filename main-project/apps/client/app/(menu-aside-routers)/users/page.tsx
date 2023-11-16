'use client';
import React from 'react'
import Button from '../../../components/Button'
import Card from '../../../components/Card';

export default function Users() {
  return (
    <div className='flex flex-col  p-4 h-full w-full gap-10'>
        <div className='flex w-full items-center justify-center gap-5 mt-10'>
            <input className='h-10 p-1 px-3 w-1/2 rounded-md '/>
           <Button onClick={() => console.log('xxx')} title='Search' className='w-40' />
        </div>
        <div className='grid lg:grid-cols-5  sm:grid-cols-3 grid-cols-2 gap-5  w-full'>
            {
                [...Array(20)].map((_, idx) => (
                    <Card url='https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg' username='zakaria' key={idx}/>
                ))
            }
        </div>
    </div>
  )
}
