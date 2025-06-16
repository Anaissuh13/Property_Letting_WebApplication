import React from'react'
import styles from'../styles/Button.module.css'

//reusable button
export default function Button({children,onClick}){
  return(
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
