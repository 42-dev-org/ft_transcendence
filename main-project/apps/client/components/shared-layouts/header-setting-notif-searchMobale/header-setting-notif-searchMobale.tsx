"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import NotificationOptionRow from "../notification-optiont-row/notification-option-row";
import styles from "./header-setting-notif-searchMobale.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api";
import { useRouter } from "next/navigation";

const links = [{ name: "options", key: Math.random().toString() }];

function HeaderSettingNotifSearchMobale(): JSX.Element {
  const logout = useQuery({
    queryFn: api.api().auth.logout,
    queryKey: ["logout"],
    enabled: false,
  });
  const router = useRouter();
  if (logout.isFetched) {
    router.push("/");
  }
  const [isOpenNot, setIsOpenNot] = useState(false);

  const onOpenMenu = () => setIsOpenNot(!isOpenNot);
  const closeMenu = () => setIsOpenNot(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [IsOpenSett, setIsOpenSett] = useState(false);

  const onOpenMenus = () => {
    setIsOpenSett(!IsOpenSett);
  };
  const closeMenus = () => {
    setIsOpenSett(false);
  };
  const settRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenNot &&
        notifRef?.current &&
        !notifRef?.current?.contains(e.target)
      ) {
        setIsOpenNot(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);

    const checkIfClickedOutsides = (e) => {
      if (
        IsOpenSett &&
        settRef?.current &&
        !settRef?.current?.contains(e.target)
      ) {
        setIsOpenSett(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutsides);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);

      document.removeEventListener("click", checkIfClickedOutsides);
    };
  }, [isOpenNot, IsOpenSett]);
  return (
    <div className={styles["links-groupe"]}>
      <div className={styles["button-container"]}>
        <div className={styles["button-notif-setting"]}>
          {/* setting */}
          <div className="flex justify-center relative w-full">
            <svg
              onClick={onOpenMenus}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              fill="white"
              viewBox="0 0 512 512"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
            {IsOpenSett && (
              <div
                className=" dropdown-content md:w-64 w-64 z-20 flex rounded-md  h-24 overflow-hidden absolute lg:right-2 right-0  bg-[#1B1B1B] top-7"
                ref={settRef}
              >
                <ul className="flex flex-col  items-center w-full overflow-y-auto">
                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="text-white h-11 flex justify-center items-center w-full hover:bg-[#302d2d] rounded-md mb-1 hover:underline"
                  >
                    {" "}
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout.refetch();
                      closeMenus();
                    }}
                    className="w-[80%] flex justify-center items-center h-9 bg-[#B2F35F] rounded-full"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles["button-container"]}>
        <div className={styles["button-notif-setting"]}>
          {/* notification */}
          <div className="flex justify-center relative w-full ">
            <svg
              onClick={onOpenMenu}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              fill="white"
              viewBox="0 0 448 512"
              className="flex items-center justify-center"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
            {isOpenNot && (
              <div
                className=" dropdown-content md:w-96 w-72 z-20 flex rounded-md  h-44 overflow-hidden absolute lg:right-2 right-0  bg-[#1B1B1B] top-7"
                ref={notifRef}
              >
                <ul className="flex flex-col w-full overflow-y-auto">
                  {[...Array(8)].map((_, idx) => (
                    <li
                      className="flex flex-row w-full h-11 justify-between items-center rounded-lg hover:bg-[#302d2d]"
                      key={idx}
                    >
                      <span className=" text-white">option</span>
                      <Link
                        onClick={closeMenu}
                        href="/profile"
                        className=" bg-[#040404] h-6 w-10 rounded-md text-white text-xs flex items-center justify-center m-1"
                      >
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* <NotificationOptionRow links={links}/> */}
        </div>
      </div>
    </div>
  );
}

export default HeaderSettingNotifSearchMobale;
