
interface PropsType {
    id: string;
}

export default function SingleConversationContainer({id}: PropsType): JSX.Element {

  return (
    <div>{id}</div>
  )
}
