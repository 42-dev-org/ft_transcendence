import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export default function useExample(): {
  example: string;
  setExample: Dispatch<SetStateAction<string>>;
} {
  const [example, setExample] = useState<string>("exmaple");

  useEffect(() => {
    setExample("example2");
  }, []);

  return {
    example,
    setExample,
  };
}
