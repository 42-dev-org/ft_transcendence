import { Title } from "ui";
import _styles from "./page.module.css";
import Image from "next/image";
import img from "assets-workspace/images/test.jpeg";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Title />
      <main className="bg-red-500">HomePage</main>
      <Image src={img} alt="testing asstets image" />
    </>
  );
}
