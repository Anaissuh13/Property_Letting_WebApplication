import pool from '../../../lib/db'
import bcrypt from 'bcryptjs'//use bcryptjs to hash password
export default async function handler(req, res) {
  //only POST
  if (req.method !== 'POST') return res.status(405).end()
  const { firstName, lastName, contact, email, password, role } = req.body
  try {
    //hash pw
    const hash = await bcrypt.hash(password, 10)
    await pool.query(
      'INSERT INTO users(first_name,last_name,contact,email,password_hash,role) VALUES(?,?,?,?,?,?)',
      [ firstName, lastName, contact, email, hash, role ]
    )
    return res.status(201).json({ message: 'User created' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
