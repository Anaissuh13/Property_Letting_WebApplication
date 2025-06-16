import pool from '../../../lib/db'
import { verifyCookie } from '../../../lib/auth'

export default async function handler(req, res) {
  //1) check auth & role
  const user = verifyCookie(req)
  if (!user || user.role !== 'landlord') {
    return res.status(401).json({ error: 'unauthorized' })
  }

  //2) listing the landlord’s properties
  if (req.method === 'GET') {
    const [rows] = await pool.query(
      'SELECT id, title, subtype, price_label, beds, baths, ber FROM properties WHERE landlord_id = ?',
      [user.id]
    )
    return res.json(rows)
  }

  //3)create new property 
  if (req.method === 'POST') {
    const { title, subtype, price_label, beds, baths, ber } = req.body
    await pool.query(
      `INSERT INTO properties 
       (title, subtype, price_label, beds, baths, ber, landlord_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, subtype, price_label, beds, baths, ber, user.id]
    )
    return res.status(201).json({ ok: true })
  }

  //4)nothing else is allowed
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end()
}
