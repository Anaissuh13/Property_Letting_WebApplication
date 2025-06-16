// src/pages/tenant/index.js
import React,{useState} from 'react'
import {useRouter}      from 'next/router'
import Header           from '../../components/Header'
import Sidebar          from '../../components/Sidebar'
import Footer           from '../../components/Footer'
import Button           from '../../components/Button'
import pool             from '../../lib/db'
import {verifyCookie}   from '../../lib/auth'
import styles           from '../../styles/Tenant.module.css'

export default function TenantPage({user,properties,initialApps}) {
  const router        = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [view, setView]               = useState(null)       // which tab is active?
  const [appsList, setAppsList]       = useState(initialApps)
  const [applyFor, setApplyFor]       = useState(null)       // id of property to apply

  // reload My Applications list
  async function reloadApps(){
    const res  = await fetch('/api/applications',{credentials:'include'})
    const data = await res.json()
    setAppsList(data)
  }

  // run when user confirms apply
  async function handleApply(e){
    e.preventDefault()                    // stop full reload
    await fetch('/api/applications',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body:JSON.stringify({property_id:applyFor})
    })
    setApplyFor(null)                     // hide form
    await reloadApps()                    // update table
    setView('myapps')                     // switch tab
  }

  return (
    <>
      <Header onMenuClick={()=>setSidebarOpen(true)}/>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
        onAuthClick={()=>{}}
      />

      {/* keep hero background */}
      <main className={styles.main}>
        <div className="container py-5">
          <h2 className={styles.welcome}>Welcome, {user.first_name}!</h2>

          {/* buttons to pick view */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            <Button
              variant={view==='apply'?'solid':'outline'}
              onClick={()=>setView('apply')}
            >Apply!</Button>
            <Button
              variant={view==='myapps'?'solid':'outline'}
              onClick={()=>setView('myapps')}
            >My Applications</Button>
          </div>

          {/* APPLY VIEW */}
          {view==='apply'&&(
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Beds</th>
                    <th>Baths</th>
                    <th>BER</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p=>(
                    <tr key={p.id}>
                      <td>
                        <a
                          href={`/property-listings#${p.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.link}
                        >{p.title}</a>
                      </td>
                      <td>{p.subtype}</td>
                      {/* strip stray '?' then show euro */}
                      <td>€{p.price_label.replace('?','')}</td>
                      <td>{p.beds}</td>
                      <td>{p.baths}</td>
                      <td>{p.ber}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="solid"
                          onClick={()=>setApplyFor(p.id)}
                        >Apply</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* apply confirmation overlay */}
          {applyFor&&(
            <div className={styles.overlay}>
              <div className={styles.formCard}>
                <h5>Apply for property #{applyFor}?</h5>
                <form onSubmit={handleApply}>
                  <div className={styles.formButtons}>
                    <Button type="submit">Yes, apply</Button>
                    <Button
                      variant="outline"
                      onClick={()=>setApplyFor(null)}
                    >Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MY APPLICATIONS VIEW */}
          {view==='myapps'&&(
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appsList.map(a=>(
                    <tr key={a.app_id}>
                      <td>
                        <a
                          href={`/property-listings#${a.property_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.link}
                        >{a.title}</a>
                      </td>
                      <td>{a.subtype}</td>
                      <td>{new Date(a.applied_at).toLocaleDateString()}</td>
                      <td>{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer/>
    </>
  )
}

// SSR guard + data fetch
export async function getServerSideProps({req}){
  const user=verifyCookie(req)
  if(!user.id||user.role!=='tenant'){
    return{redirect:{destination:'/',permanent:false}}
  }

  // get user name
  const[[fullUser]] = await pool.query(
    'SELECT id,first_name FROM users WHERE id=?',
    [user.id]
  )
  // fetch properties
  const[properties] = await pool.query(`
    SELECT id,title,subtype,price_label,beds,baths,ber
    FROM properties
  `)
  // fetch applications
  const[appsRaw] = await pool.query(`
    SELECT
      a.id         AS app_id,
      a.property_id,
      a.status,
      a.applied_at,
      p.title,
      p.subtype
    FROM applications AS a
    JOIN properties   AS p ON p.id=a.property_id
    WHERE a.tenant_id=?
    ORDER BY a.applied_at DESC
  `,[user.id])
  // serialize dates
  const initialApps=appsRaw.map(a=>({
    ...a,
    applied_at:a.applied_at.toISOString()
  }))

  return{props:{user:fullUser,properties,initialApps}}
}
