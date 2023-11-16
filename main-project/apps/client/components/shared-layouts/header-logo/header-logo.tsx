import React from 'react'
import styles from './header-logo.module.css'
import IMAge from 'assets-workspace/svg/Vector.svg'
import Image from 'next/image';
import Link from "next/link";


function Logo(): JSX.Element {
  return (
    <Link href={"/profile"} className={styles['logo-container']}>
      
        <div className={styles['logo']}>
          <Image alt="logo image" src={IMAge} width={39} height={28} />
          <span className='ml-4'>
            Pong Game
          </span>
        </div>
      
    </Link>
  )
}

export default Logo;




