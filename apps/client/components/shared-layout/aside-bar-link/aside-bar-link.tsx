import Link from "next/link";
import styles from './aside-bar-link.module.css'


interface PropsType {
    svgPath: string;
    href: string;
    title: string;
    selected: boolean;
}

function AsideBarLink({svgPath, href, title}: PropsType): JSX.Element {
  return (
    <div className={styles["link-container"]}>
      <Link href={href}>
        <div className={styles["icon-container"]}>
          <svg
            fill="white"
            height="1em"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={svgPath} />
          </svg>
        </div>
        {title}
      </Link>
    </div>
  );
}
export default AsideBarLink