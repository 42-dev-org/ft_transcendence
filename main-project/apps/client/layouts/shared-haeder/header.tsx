import React from 'react'
import Logo from '../../components/shared-layouts/header-logo/header-logo'
import Search from '../../components/shared-layouts/header-search/header-search'
import HeaderSettingNotifSearchMobale from '../../components/shared-layouts/header-setting-notif-searchMobale/header-setting-notif-searchMobale'
import styles from './header.module.css'

function Header(): JSX.Element {
  return (

    <div className={styles['header-main']}>
      <Logo />
      {/* <Search /> */}
      <HeaderSettingNotifSearchMobale />
    </div>
  )
}

export default Header