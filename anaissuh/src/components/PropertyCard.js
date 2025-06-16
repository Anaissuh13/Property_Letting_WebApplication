import React from 'react'
import styles from '../styles/PropertyCard.module.css'
import { FaCamera } from 'react-icons/fa'  //camera icon

export default function PropertyCard({
  id,
  title,
  subtype,
  priceLabel,
  beds,
  baths,
  ber,
  images = [],    //this part of the code is connected to database, which is why empty array
  onClick
}) {
  return (
    <div className={styles.card} onClick={() => onClick(id)}>
      {/* only show this block when there is at least one image */}
      {images.length > 0 && (
        <div className={styles.imageWrapper}>
          {/* use the first URL */}
          <img
            src={images[0]}
            alt={title}
            className={styles.coverImage}
          />
          {/* if there’s more than one, show the count icon */}
          {images.length > 1 && (
            <div className={styles.countOverlay}>
              <FaCamera /> {images.length}
            </div>
          )}
        </div>
      )}

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtype}>{subtype}</p>
        <div className={styles.meta}>
          <span className={styles.price}>{priceLabel}</span>
          <span className={styles.bedsBaths}>🛏 {beds} · 🛁 {baths}</span>
          <span className={styles.ber}>BER {ber}</span>
        </div>
      </div>
    </div>
  )
}
