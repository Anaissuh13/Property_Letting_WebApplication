import pool from '../../../lib/db'
import { verifyCookie } from '../../../lib/auth'

export default async function handler(req, res) {
  const user = verifyCookie(req)
  if (!user || user.role !== 'landlord') {
    return res.status(401).json({ error: 'unauthorized' })
  }

  const { id } = req.query

  //updating a property
  if (req.method === 'PUT') {
    const { title, subtype, price_label, beds, baths, ber } = req.body
    await pool.query(
      `UPDATE properties
       SET title=?, subtype=?, price_label=?, beds=?, baths=?, ber=?
       WHERE id=? AND landlord_id=?`,
      [title, subtype, price_label, beds, baths, ber, id, user.id]
    )
    return res.json({ ok: true })
  }

  //delete property
  if (req.method === 'DELETE') {
    await pool.query(
      'DELETE FROM properties WHERE id=? AND landlord_id=?',
      [id, user.id]
    )
    return res.json({ ok: true })
  }

  res.setHeader('Allow', 'PUT,DELETE')
  res.status(405).end()
}
