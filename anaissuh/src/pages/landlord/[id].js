// File: src/pages/landlord/[id].js

import { useState }        from 'react'
import { useRouter }       from 'next/router'
import Header              from '../../components/Header'
import Sidebar             from '../../components/Sidebar'
import Footer              from '../../components/Footer'
import Button              from '../../components/Button'
import pool                from '../../lib/db'
import { verifyCookie }    from '../../lib/auth'
import styles              from '../../styles/Landlord.module.css'

// 1) This runs on the server for /landlord/:id
export async function getServerSideProps({ req, params }) {
  // a) make sure they're a logged-in landlord
  const user = verifyCookie(req)
  if (!user.id || user.role !== 'landlord') {
    return { redirect: { destination:'/', permanent:false } }
  }

  // b) grab the single property, make sure it belongs to them
  const [[property]] = await pool.query(
    'SELECT id, title, subtype, price_label, beds, baths, ber '
  + 'FROM properties WHERE id = ? AND landlord_id = ?',
    [ params.id, user.id ]
  )

  if (!property) {
    // if not found (or not theirs) show 404
    return { notFound: true }
  }

  return { props: { property } }
}

export default function EditPropertyPage({ property }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm]               = useState({ ...property })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: name==='beds'||name==='baths' ? +value : value
    }))
  }

  async function handleSave(e) {
    e.preventDefault()
    // call your API route with PUT
    await fetch(`/api/properties/${property.id}`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(form)
    })
    // go back to the dashboard
    router.push('/landlord')
  }

  return (
    <>
      <Header onMenuClick={()=>setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)} onAuthClick={()=>{}}/>

      <div
        className={styles.hero}
        style={{
          backgroundImage:'url(/images/hero-bg.jpg)',
          backgroundSize:'cover',
          backgroundPosition:'center'
        }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.welcome}>Edit Property</h2>

          <form className="row g-3" onSubmit={handleSave}>
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
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </div>

      <Footer/>
    </>
  )
}
