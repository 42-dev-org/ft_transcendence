import Link from "next/link";
import styles from "./bar-mobile-link.module.css"

interface PropsType {
    svgPath: string;
    href: string;
    selected: boolean;
  }

function BarMobileLink({ svgPath, href,}: PropsType): JSX.Element {
  return (
    <Link href={href} className={styles["icon-container"]}>
        {/* <div className="mx-6"> */}

        <svg
              fill="white"
              height="1em"
              width="1rem"
              viewBox="0 0 590 512"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path d={svgPath} />
            </svg>
                {/* </div> */}
    </Link>
  )
}

export default BarMobileLink