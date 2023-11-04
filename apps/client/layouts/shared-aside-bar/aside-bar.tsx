import React from "react";
import AsideBarLinks from "../../components/shared-layouts/aside-bar-links/aside-bar-links";
import AsideBarProfile from "../../components/shared-layouts/aside-bar-profile/aside-bar-profile";


import styles from "./aside-bar.module.css";

function AsideBar(): JSX.Element {
  return (
    <div className={styles["page"]}>
      <div className={styles["aside-bar"]}>
        <div className={styles["bare-navigation-links-container"]}>
          <AsideBarLinks />
          <AsideBarProfile
            imageUrl="https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg"
            name="zakaria maziane"
          />
        </div>
      </div>
     </div>
  );
}

export default AsideBar;