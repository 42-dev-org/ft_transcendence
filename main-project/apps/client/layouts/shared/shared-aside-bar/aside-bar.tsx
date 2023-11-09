import React from "react";
import AsideBarProfile from "../../../components/shared-layout/aside-bar-profile/aside-bar-profile";
import AsideBarLinks from "../../../components/shared-layout/aside-bar-links/aside-bar-links";
import styles from "./aside-bar.module.css";

function AsideBar(): JSX.Element {
  return (
    // <div className={styles["page"]}>
      <div className={styles["main"]}>
        <div className={styles["barel"]}>
          <AsideBarLinks />
          <AsideBarProfile
            imageUrl="https://avatars.githubusercontent.com/u/78473554?v=4"
            name="anas jaidi"
          />
        </div>
      </div>
    //   <div className={styles["body"]}>body</div>
    // </div>
  );
}

export default AsideBar;
