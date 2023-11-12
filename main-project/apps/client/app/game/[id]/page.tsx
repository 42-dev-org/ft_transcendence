'use client'
import { useParams } from "next/navigation";

export default function InternalGamePage(): JSX.Element {
  const { id } = useParams();
  return <div className="">{id}</div>;
}
