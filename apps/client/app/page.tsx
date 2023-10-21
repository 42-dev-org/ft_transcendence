import { Title } from "ui";
import _styles from "./page.module.css";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Title />
      <main className="bg-red-500">HomePage</main>
    </>
  );
}
