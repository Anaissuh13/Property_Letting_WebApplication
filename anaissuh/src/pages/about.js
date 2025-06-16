import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import AuthModal from '../components/AuthModal'
import Footer from '../components/Footer'
import styles from '../styles/About.module.css'

export default function About() {
  //Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  //Auth modal state
  const [auth, setAuth] = useState({ open: false, mode: 'login', role: 'landlord' })

  //Open login modal for given role
  const openAuth = (role) => setAuth({ open: true, mode: 'login', role })
  //Close modal
  const closeAuth = () => setAuth(prev => ({ ...prev, open: false }))

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAuthClick={openAuth}
      />
      <AuthModal
        isOpen={auth.open}
        mode={auth.mode}
        role={auth.role}
        onClose={closeAuth}
      />

      <main className={styles.main}>
        <section className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <img src="/images/hus.jpg" alt="Hussaina Hussain" />
          </div>
          <div className={styles.profileText}>
            <h2 id="Hussaina">Hussaina Hussain (3136381)</h2>
            <h3>About Hussaina</h3>
            <p>
              Hussaina is from India and she's 18 years old. She is a massive book worm
              and reads books like she breathes. Her favourite way to enjoy a day would
              be a cozy spot with good lighting, a nice snack and her book. She can
              speak four languages fluently and can read and write a fifth one. She
              has been into coding since she was 13 years old and enjoys the thrill
              of making something from scratch.
            </p>
            <p>
              She works well under pressure but would prefer working at her own pace 
              and usually that is the reason she starts her assignments long before they are due.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
