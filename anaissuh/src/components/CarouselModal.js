import React, { useEffect, useState, useCallback } from 'react'
import styles from '../styles/CarouselModal.module.css'

export default function CarouselModal({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  if (!images || images.length === 0) {
    //no images, immediately close 
    useEffect(() => { onClose() }, [onClose]);
    return null;
  }

  //lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  //Navigation using keybaord using arrow keys and escape
  const handleKey = useCallback(e => {
    if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length)
    if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length)
    if (e.key === 'Escape') onClose()
  }, [images.length, onClose])
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e=>e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <img
          src={images[idx]}
          alt={`Image ${idx+1}`}
          className={styles.image}
        />
        <button className={styles.prev} onClick={prev}>‹</button>
        <button className={styles.next} onClick={next}>›</button>
      </div>
    </div>
  )
}
