import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/AuthModal.module.css'

export default function AuthModal({
  isOpen,
  mode: initialMode,
  role,
  onClose
}) {
  const router = useRouter()

  //Admins can only login
  // Landlords and tenants can login or signup
  const [mode, setMode] = useState(role === 'admin' ? 'login' : initialMode)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: ''
  })

  //Reset whenever mode, role or open state changes
  useEffect(() => {
    setMode(role === 'admin' ? 'login' : initialMode)
    setForm({ firstName: '', lastName: '', contact: '', email: '', password: '' })
  }, [initialMode, role, isOpen])

  if (!isOpen) return null

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',        //making the Set-Cookie header stick
      body: JSON.stringify({ ...form, role })
    })
    const data = await res.json()

    if (!res.ok) {
      alert(data.message || 'Something went wrong')
      return
    }

    if (!res.ok) {
     //login/signup failed
     alert(data.message || 'Invalid credentials')
     return
   }

   //login/signup succeeded redirect them to their dashboard
   if (role === 'landlord')    await router.push('/landlord')
   else if (role === 'tenant') await router.push('/tenant')
   else if (role === 'admin')  await router.push('/admin')

    onClose()
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>
          {mode === 'login' ? 'Login' : 'Sign Up'} as{' '}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && role !== 'admin' && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <input
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submit}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {role !== 'admin' && (
          <div className={styles.toggle}>
            {mode === 'login' ? (
              <p>
                No account?{' '}
                <span onClick={() => setMode('signup')}>Sign Up</span>
              </p>
            ) : (
              <p>
                Have an account?{' '}
                <span onClick={() => setMode('login')}>Login</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
