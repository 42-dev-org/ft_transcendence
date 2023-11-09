import styles from "./example-link.module.css";

interface PROPS {
  text: string;
}

export default function ExampleLink({ text }: PROPS): JSX.Element {
  return <div className={styles['link-container']}>{text}</div>;
}
