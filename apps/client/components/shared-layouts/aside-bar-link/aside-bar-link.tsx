import Link from "next/link";
import styles from './aside-bar-link.module.css'


interface PropsType {
  svgPath: string;
  href: string;
  title: string;
  selected: boolean;
}

function AsideBarLink({ svgPath, href, title }: PropsType): JSX.Element {
  return (
      <Link href={href} className={styles["link-container"]}>
        <div className={styles["icon-container"]}>
          <div className="mr-6">
            <svg
              fill="white"
              height="1em"
              width="1rem"
              viewBox="0 0 590 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={svgPath} />
            </svg>
          </div>
            {title}
        </div>
      </Link>
  );
}
export default AsideBarLink