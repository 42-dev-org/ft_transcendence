import Image from 'next/image'
import React from 'react'
import styles from './profile-image.module.css'

interface PropsType {
    name: string;
    imageUrl: string;
}


function ProfileImage({ imageUrl, name }: PropsType): JSX.Element {
    return (
        <div className='flex items-start rounded-full  w-full h-14'>
            <div className='flex justify-center items-center'>

            <div className={styles['profile-image-container']}>

                <Image alt="profile image" src={imageUrl} width={340} height={340} />
            </div>
            <div className='text-white ml-4 flex flex-col'>{name}</div>
            </div>
        </div>
    )
}

export default ProfileImage