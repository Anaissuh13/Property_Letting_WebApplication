import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import CarouselModal from '../components/CarouselModal'
import styles from '../styles/PropertyListings.module.css'

export default function PropertyListingsPage({ listings }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalState, setModalState] = useState({
    isOpen:  false,
    listing: null,
    index:   0,
  })

  // ock background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalState.isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalState.isOpen])

  function openModal(listing) {
    setModalState({ isOpen: true, listing, index: 0 })
  }
  function closeModal() {
    setModalState(s => ({ ...s, isOpen: false }))
  }
  function showPrev() {
    setModalState(s => ({
      ...s,
      index: (s.index + s.listing.images.length - 1) % s.listing.images.length
    }))
  }
  function showNext() {
    setModalState(s => ({
      ...s,
      index: (s.index + 1) % s.listing.images.length
    }))
  }

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAuthClick={() => {}}
      />

      <main
        className={styles.main}
        style={{
          backgroundImage: 'url(/images/hp.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className={styles.heading}>Latest Properties</h2>
        <div className={styles.grid}>
          {listings.map(item => (
            <PropertyCard
              key={item.id}
              {...item}
              onClick={() => item.images.length > 0 && openModal(item)}
            />
          ))}
        </div>
      </main>

      <Footer />

      {modalState.isOpen && (
        <CarouselModal
          images={modalState.listing.images}
          startIndex={modalState.index}
          onPrev={showPrev}
          onNext={showNext}
          onClose={closeModal}
        />
      )}
    </>
  )
}

//fetch fresh on every request
export async function getServerSideProps({ req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host     = req.headers['host']
  const baseUrl  = `${protocol}://${host}`

  const res      = await fetch(`${baseUrl}/api/listings`)
  const listings = await res.json()

  return { props: { listings } }
}
