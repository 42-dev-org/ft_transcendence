import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export default function useExample(): {
  example: string;
  setExample: Dispatch<SetStateAction<string>>;
} {
  const [example, setExample] = useState<string>("exmaple");

  const onMessageSend = () => {
    // data
  }
  const onInputChnage = () => {
    ;
  }

  useEffect(() => {
    setExample("example2");
  }, []);

  return {
    example,
    setExample,
    onInputChnage,
    onMessageSend,
  };
}


// header.tsx

{
  const {example, setExample, onInputChnage, onMessageSend} = useExample();

  return <>
    <input type="text" onChange={onInputChnage}/>
    {example}
    <button onClick={onMessageSend}></button>
  </>
}