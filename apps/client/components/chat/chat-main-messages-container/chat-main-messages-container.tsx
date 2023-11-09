import styles from './chat-main-messages-container.module.css'
import  ChatMessage from './chat-main-messages-contianer-message'

export default function ChatMainMessagesContainer(): JSX.Element {
  return (
    <div className={`${styles['chat-messages-container']}`}>
      <div className='w-full flex flex-col gap-4 pl-3'>
        <ChatMessage message="test" type="sender" />
        <ChatMessage message="tessdfst" type="receiver" />
        <ChatMessage message="tesdsft" type="sender" />
        <ChatMessage message="test" type="sender" />
        <ChatMessage message="tesdfsdst" type="receiver" />
        <ChatMessage message="tsdfsest" type="sender" />
        <ChatMessage message="test" type="receiver" />
        <ChatMessage message="tesdsfst" type="sender" /> 
      </div>
    </div>
  )
}
