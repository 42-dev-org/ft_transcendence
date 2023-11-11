import React from 'react'
import BarMobileLinks from '../../components/shared-layouts/bar-mobile-links/bar-mobile-links'
import styles from "./bar-mobile.module.css"
function BarMobile(): JSX.Element {
  return (
    <div className={styles['link-container']}>
        <BarMobileLinks />
    </div>
  )
}

export default BarMobile