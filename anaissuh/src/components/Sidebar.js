import React,{useEffect,useState}from'react'
import{useRouter}from'next/router'
import Link from'next/link'
import styles from'../styles/Sidebar.module.css'

export default function Sidebar({isOpen,onClose,onAuthClick}) {
  const router=useRouter()
  const[isAuth,setIsAuth]=useState(false)   //track if user is logged in
  const[loaded,setLoaded]=useState(false)   //track when auth check is done

  //check login status one time when component mounts
  useEffect(()=>{
    async function checkAuth(){
      try{
        const res=await fetch('/api/me',{credentials:'include'})
        setIsAuth(res.ok)                  
      }catch(e){
        setIsAuth(false)                   //on fetch error treat as logged out
      }finally{
        setLoaded(true)                    
      }
    }
    checkAuth()
  },[])

  //lock body scroll whenever sidebar is open
  useEffect(()=>{
    document.body.style.overflow=isOpen?'hidden':'auto'
    return()=>{document.body.style.overflow='auto'}
  },[isOpen])

  //call logout API, update state, then redirect home
  async function handleLogout(){
    await fetch('/api/logout',{method:'POST',credentials:'include'})
    setIsAuth(false) //hide logout link right away
    onClose() //close the sidebar
    router.push('/') //sending user to homepage
  }

  return (
    <>
      {isOpen&&<div className={styles.backdrop} onClick={onClose}/>}

      <aside className={`${styles.sidebar} ${isOpen?styles.open:''}`}>
        <div className={styles.logoText}>
          <Link href="/" onClick={onClose}>
            <span>Anaissuh</span>
            <span>Lettings</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#" onClick={()=>{onAuthClick('landlord');onClose()}}>
                Landlords
              </a>
            </li>
            <li>
              <a href="#" onClick={()=>{onAuthClick('tenant');onClose()}}>
                Tenants
              </a>
            </li>
            <li>
              <a href="#" onClick={()=>{onAuthClick('admin');onClose()}}>
                Admin
              </a>
            </li>
            <li>
              <Link href="/property-listings" onClick={onClose}>
                Property Listings
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={onClose}>
                About Us
              </Link>
            </li>

            {loaded&&isAuth&&(
              <li>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}

            {/*if not loaded yet or not auth, Logoutis not rendered*/}
          </ul>
        </nav>

        <div className={styles.contact}>
          <h4>Get in Contact:</h4>
          <p>Call: +353 (0)1 298 9384</p>
          <p>Email: info@anaissuhlettings.ie</p>
        </div>

        <div className={styles.hours}>
          <h4>Business Hours:</h4>
          <p>Mon—Fri: 9:00 a.m. to 5:30 p.m.</p>
        </div>
      </aside>
    </>
  )
}
