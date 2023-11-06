import React from 'react'
import ChatAside from '../../layouts/chat/chat-aside/chat-aside'
import ChatMain from '../../layouts/chat/chat-main/chat-main'
import styles from './chat-container.module.css'

export default function ChatContainer(): JSX.Element {
  return (
    <div className={`${styles['chat-page-container']}`}>
        <ChatAside />
        <ChatMain />
    </div>
  )
}
