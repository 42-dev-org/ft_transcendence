import type { StaticImageData } from 'next/image'
import React from 'react'
import ChatAsideContact from '../chat-aside-contact/chat-aside-contact'
import styles from './chat-aside-contacts.module.css'


interface SingleContact  {
    image: StaticImageData | string;
    name: string;
    lastMessage: string;
    key: string;
}

interface PropsType {
    contacts: SingleContact[];
}

export default function ChatAsideContacts({contacts}: PropsType): JSX.Element {
  return (
    <div className={`${styles['chat-aside-contacts-container']}`}>
        {contacts.map(_ => <ChatAsideContact {..._} key={_.key}/>)}
    </div>
  )
}
