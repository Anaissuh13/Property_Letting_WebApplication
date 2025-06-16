import React from'react'
import {useRouter}from'next/router'
import styles from'../styles/HeroSection.module.css'
import Button from'./Button'

//homepage display
export default function HeroSection({onAuthClick}){
  const router=useRouter() //get router

  return(
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <p className={styles.subtitle}>Dublin’s #1 Letting & Management Agency</p>
        <h1 className={styles.title}>Life Made Easier for Landlords</h1>
        <div className={styles.buttons}>
          <Button onClick={()=>onAuthClick('landlord')}>Landlords</Button>
          <Button onClick={()=>onAuthClick('tenant')}>Tenants</Button>
          <Button onClick={()=>router.push('property-listings')}>Property Listings</Button>{/* navigate */}
        </div>
      </div>
    </section>
  )
}
