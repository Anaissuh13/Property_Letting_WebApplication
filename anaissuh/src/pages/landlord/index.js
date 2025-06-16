// pages/landlord/index.js
import React, { useState } from 'react'
import { useRouter }      from 'next/router'
import Header             from '../../components/Header'
import Sidebar            from '../../components/Sidebar'
import Footer             from '../../components/Footer'
import Button             from '../../components/Button'
import pool               from '../../lib/db'
import { verifyCookie }   from '../../lib/auth'
import styles             from '../../styles/Landlord.module.css'

export default function LandlordPage({ user, properties }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [view, setView]               = useState(null) // toggle list/add
  const [form, setForm]               = useState({
    title:'', subtype:'', price_label:'', beds:0, baths:0, ber:''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: name==='beds'||name==='baths' ? +value : value
    }))
  }

  async function handleAdd(e) {
    e.preventDefault()
    await fetch('/api/properties', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ ...form, landlord_id: user.id })
    })
    router.replace(router.asPath)  // refresh
    setView('list')
  }

  return (
    <>
      <Header onMenuClick={()=>setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={()=>setSidebarOpen(false)}
        onAuthClick={()=>{}}
      />

      {/* full-bleed hero-bg with pink overlay */}
      <div
        className={styles.hero}
        style={{
          backgroundImage:'url(/images/hero-bg.jpg)',
          backgroundSize:'cover',
          backgroundPosition:'center'
        }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.welcome}>Welcome, {user.first_name}!</h2>

          {/* toggle buttons centered */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            <Button
              variant={view==='list' ? 'solid' : 'outline'}
              onClick={()=>setView('list')}
            >My Properties</Button>
            <Button
              variant={view==='add' ? 'solid' : 'outline'}
              onClick={()=>setView('add')}
            >Add Property</Button>
          </div>
          
          {/* LIST VIEW */}
          {view==='list' && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className={styles.thead}>
                  <tr>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Beds</th>
                    <th>Baths</th>
                    <th>BER</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(p => (
                    <tr key={p.id}>
                      {/* address is now a link */}
                      <td>
                        <a
                          href={`/property-listings#${p.id}`}
                          className={styles.addrLink}
                        >{p.title}</a>
                      </td>
                      <td>{p.subtype}</td>
                      <td>€{p.price_label.replace(/[^0-9\/,]/g,'')}</td>
                      <td>{p.beds}</td>
                      <td>{p.baths}</td>
                      <td>{p.ber}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={()=>router.push(`/landlord/${p.id}`)}
                        >Edit</button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={async()=>{
                            await fetch(`/api/properties/${p.id}`,{method:'DELETE'})
                            router.replace(router.asPath)
                          }}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ADD VIEW */}
          {view==='add' && (
            <form className="row g-3" onSubmit={handleAdd}>
              {[
                { label:'Address',    name:'title',       col:'col-12' },
                { label:'Type',       name:'subtype',     col:'col-md-6' },
                { label:'Price (€...)',name:'price_label',col:'col-md-6' },
                { label:'Beds',       name:'beds',        col:'col-md-3', type:'number' },
                { label:'Baths',      name:'baths',       col:'col-md-3', type:'number' },
                { label:'BER Rating', name:'ber',         col:'col-md-6' },
              ].map(({label,name,col,type})=>(
                <div className={col} key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    className="form-control"
                    type={type||'text'}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="col-12 text-center">
                <Button type="submit">Create Property</Button>
              </div>
            </form>
          )}

        </div>
      </div>

      <Footer/>
    </>
  )
}

//SSRguard + data
export async function getServerSideProps({req}) {
  //verify the auth cookie, returns {id,role} or {}
  const user = verifyCookie(req)
  //if not logged in as landlord, send them home
  if(!user.id||user.role!=='landlord') {
    return {redirect:{destination:'/',permanent:false}}
  }
  //grab their basic profile
  const [[fullUser]] = await pool.query(
    'SELECT id,first_name FROM users WHERE id=?',
    [user.id]
  )
  //grab all properties they own
  const [properties] = await pool.query(
    `SELECT id,title,subtype,price_label,beds,baths,ber
     FROM properties WHERE landlord_id=?`,
    [user.id]
  )
  //pass data into the page
  return {props:{user:fullUser,properties}}
}

