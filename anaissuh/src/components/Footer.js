import React from'react'
import styles from'../styles/Footer.module.css'

//footer component
export default function Footer(){
  return(
    <footer className={styles.footer}>
      <p>© Copyright 2025 - All Rights Reserved | PSRA 002646 | <a href="/privacy">Privacy Policy</a></p>
    </footer>
  )
}
