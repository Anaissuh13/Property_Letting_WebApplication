import React,{useState}from'react'
import{useRouter}from'next/router'
import Header from'../../components/Header'
import Sidebar from'../../components/Sidebar'
import Footer from'../../components/Footer'
import Button from'../../components/Button'
import pool from'../../lib/db'
import{verifyCookie}from'../../lib/auth'
import styles from'../../styles/Admin.module.css'

export default function AdminPage({user,apps,users}) {
  const router=useRouter()
  const [sidebarOpen,setSidebarOpen]=useState(false)
  const [view,setView]=useState(null) //'apps' or 'users'

  //update application status
  async function updateApp(id,status){
    await fetch(`/api/applications/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status})
    })
    router.replace(router.asPath) //refresh table
  }

  //deleting a user after confirmation
  async function deleteUser(id){
    if(!confirm('Really delete this user?'))return
    await fetch(`/api/users/${id}`,{method:'DELETE'})
    router.replace(router.asPath)
  }

  return <>
    <Header onMenuClick={()=>setSidebarOpen(true)}/>
    <Sidebar
      isOpen={sidebarOpen}
      onClose={()=>setSidebarOpen(false)}
      onAuthClick={()=>{}}
    />

    {/* hero with combined tint+image background */}
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h2 className={styles.welcome}>Welcome, {user.first_name}!</h2>

        {/* toggle between applications / users */}
        <div className="d-flex justify-content-center gap-2 mb-4">
          <Button
            size="sm"
            variant={view==='apps'?'solid':'outline'}
            onClick={()=>setView('apps')}
          >Manage Applications</Button>
          <Button
            size="sm"
            variant={view==='users'?'solid':'outline'}
            onClick={()=>setView('users')}
          >Manage Users</Button>
        </div>

        {/* APPLICATIONS TABLE */}
        {view==='apps' && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className={styles.thead}>
                <tr>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(a=>(
                  <tr key={a.app_id}>
                    <td>{a.tenant_name}</td>
                    <td>
                      <a
                        href={`/property-listings#${a.property_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                      >{a.prop_title}</a>
                    </td>
                    <td>{a.status}</td>
                    <td>{new Date(a.applied_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        disabled={a.status!=='pending'}
                        onClick={()=>updateApp(a.app_id,'approved')}
                      >Approve</button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        disabled={a.status!=='pending'}
                        onClick={()=>updateApp(a.app_id,'rejected')}
                      >Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS TABLE */}
        {view==='users' && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className={styles.thead}>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u.id}>
                    <td>{u.first_name} {u.last_name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={()=>router.push(`/admin/users/${u.id}`)}
                      >Edit</button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={()=>deleteUser(u.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>

    <Footer/>
  </>
}

//SSR guard + data fetching
export async function getServerSideProps({req}){
  const auth=verifyCookie(req)
  if(!auth.id||auth.role!=='admin'){
    return{redirect:{destination:'/',permanent:false}}
  }
  //fetch admin’s name
  const [[fullUser]] = await pool.query(
    'SELECT first_name FROM users WHERE id=?',[auth.id]
  )
  //fetch applications
  const [rawApps] = await pool.query(`
    SELECT
      a.id AS app_id,
      a.tenant_id,
      a.property_id,
      a.status,
      a.date_submitted AS applied_at,
      u.first_name AS tenant_name,
      p.title AS prop_title
    FROM applications a
    JOIN users u ON u.id=a.tenant_id
    JOIN properties p ON p.id=a.property_id
    ORDER BY a.date_submitted DESC
  `)
  const apps = rawApps.map(a=>({
    ...a,
    applied_at: a.applied_at.toISOString()
  }))
  //fetch users
  const [users] = await pool.query(`
    SELECT id, first_name, last_name, email, role
    FROM users
    ORDER BY role ASC, first_name ASC
  `)
  return{props:{user:fullUser,apps,users}}
}
