import React from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

//header component
export default function Header({onMenuClick}){
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span>Anaissuh</span>
        <span>Lettings</span>
      </Link>
      <button className={styles.menuButton} onClick={onMenuClick}>
        More »
      </button>
    </header>
  )
}
