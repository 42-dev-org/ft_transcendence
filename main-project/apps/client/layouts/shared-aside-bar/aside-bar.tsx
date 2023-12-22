"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "../../api";
import AsideBarLinks from "../../components/shared-layouts/aside-bar-links/aside-bar-links";
import AsideBarProfile from "../../components/shared-layouts/aside-bar-profile/aside-bar-profile";
import { useAppSelector } from "../../store/store";


import styles from "./aside-bar.module.css";

function AsideBar(): JSX.Element {

  const user = useAppSelector(s => s.user.user)
  return (
    <div className={styles["page"]}>
      <div className={styles["aside-bar"]}>
        <div className={styles["bare-navigation-links-container"]}>
          <AsideBarLinks />

          <AsideBarProfile
            imageUrl={(user?.profileImage as string) || 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'}
            name={user?.lastName && user?.firstName + ' ' + user?.lastName || ''}
            profileUrl="/profile"
          />

        </div>
      </div>
    </div>
  );
}

export default AsideBar;