import React,{useState}from'react'//import React hooks
import Header from'../components/Header'//Header
import Sidebar from'../components/Sidebar'//sidebar
import HeroSection from'../components/HeroSection'
import AuthModal from'../components/AuthModal'//login/signup modal
import Footer from'../components/Footer'//footer
import styles from'../styles/Home.module.css'//page styles

export default function Home(){//main home component
  const[sidebarOpen,setSidebarOpen]=useState(false)//track sidebar open
  const[auth,setAuth]=useState({open:false,mode:'login',role:'landlord'})//auth modal state

  //open modal in login mode for given role
  function openAuth(role){
    setAuth({open:true,mode:'login',role})
  }

  //closing the auth modal
  function closeAuth(){
    setAuth(prev=>({...prev,open:false}))
  }

  return(
    <>
      <Header onMenuClick={()=>setSidebarOpen(true)}/>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
        onAuthClick={openAuth}
      />
      {/* full-screen with pink buttons */}
      <HeroSection onAuthClick={openAuth}/>

      {/* full-screen about section */}
      <section className={styles.about}>
        <h2>About Anaissuh Lettings</h2>
        <p>
          Welcome to Anaissuh Lettings, your go-to agent in South Dublin. Located in Sandyford, Dublin 18 and established in 2007, our dedicated team of seasoned professionals possesses an unwavering passion for the world of property. We are committed to guiding you seamlessly through the entire process, ensuring your journey is as smooth as possible.
        </p>
      </section>

      <AuthModal
        isOpen={auth.open}
        mode={auth.mode}
        role={auth.role}
        onClose={closeAuth}
      />
      <Footer/>
    </>
  )
}
