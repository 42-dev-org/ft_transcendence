interface PropsMessage {
  type: "sender" | "receiver";
  message: string;
}

export default function ChatMessage({ type, message }: PropsMessage): JSX.Element {
  return (
    <div className='w-full flex items-center gap-3 ' style={{ flexDirection: type === "sender" ? "row" : "row-reverse" }}>
      <div className='w-10 h-10 bg-white rounded-full' />
      <div className='text-white text-xs font-normal px-5 py-2 bg-[#FFFFFF0D] rounded-full'>
        {message}
      </div>
    </div>
  );
}
