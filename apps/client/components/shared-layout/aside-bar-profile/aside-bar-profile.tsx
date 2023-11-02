import Image from "next/image";
import styles from "./aside-bar-profile.module.css";

interface PropsType {
  name: string;
  imageUrl: string;
}

function AsideBarProfile({ imageUrl, name }: PropsType): JSX.Element {
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-image-container"]}>
        <Image alt="profile image" src={imageUrl} />
      </div>
      <div className={styles["profile-name-container"]}>{name}</div>
    </div>
  );
}

export default AsideBarProfile;
