import React from 'react'
import styles from './header-logo.module.css'
import IMAge from 'assets-workspace/svg/Vector.svg'
import Image from 'next/image';


function Logo(): JSX.Element {
  return (
    <div className={styles['logo-container']}>
      <a className={styles['logo']}>
        <Image alt="logo image" src={IMAge} width={39} height={28} />
        <span className='ml-4'>
          Pong Game
        </span>
      </a>
    </div>
  )
}

export default Logo;




