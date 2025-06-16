import React,{useState,useEffect}from'react'
import{useRouter}from'next/router'
import Header from'../../../components/Header'
import Sidebar from'../../../components/Sidebar'
import Footer from'../../../components/Footer'
import Button from'../../../components/Button'
import pool from'../../../lib/db'
import{verifyCookie}from'../../../lib/auth'
import styles from'../../../styles/AdminUser.module.css'

export default function EditUser({initialData}) {
  const router=useRouter()
  const {id} = router.query
  const [form,setForm]=useState(initialData)

  //loading the user data into the form 
  useEffect(()=>{setForm(initialData)},[initialData])

  //handling input changes
  function handleChange(e){
    const{name,value}=e.target
    setForm(f=>({...f,[name]:value}))
  }

  //save and go back
  async function handleSave(e){
    e.preventDefault()
    await fetch(`/api/users/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    })
    router.push('/admin')
  }

  return <>
    <Header onMenuClick={()=>{}}/>
    <Sidebar isOpen={false} onClose={()=>{}} onAuthClick={()=>{}}/>

    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>Edit User</h2>
        <form className="row g-3" onSubmit={handleSave}>

          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact</label>
            <input
              name="contact"
              value={form.contact||''}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="landlord">landlord</option>
              <option value="tenant">tenant</option>
            </select>
          </div>

          <div className="col-12 text-center">
            {/* adding space between buttons */}
            <Button type="submit" className="me-2">
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="ms-2" 
              onClick={()=>router.push('/admin')}
            >
              Cancel
            </Button>
          </div>


        </form>
      </div>
    </div>

    <Footer/>
  </>
}

// SSR guard + load one user
export async function getServerSideProps({req,params}){
  const auth=verifyCookie(req)
  if(!auth.id||auth.role!=='admin'){
    return{redirect:{destination:'/',permanent:false}}
  }
  const [[user]] = await pool.query(
    'SELECT first_name,last_name,contact,email,role FROM users WHERE id=?',
    [params.id]
  )
  return{props:{initialData:user}}
}
