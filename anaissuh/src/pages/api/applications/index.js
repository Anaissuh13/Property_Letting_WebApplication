import pool        from '../../../lib/db'
import {verifyCookie} from '../../../lib/auth'

export default async function handler(req, res) {
  const user = verifyCookie(req)
  if (!user.id || user.role !== 'tenant') {
    return res.status(401).json({ error: 'unauthorized' })
  }

  //retrieving the tenant’s applications
  if (req.method === 'GET') {
    const [apps] = await pool.query(
      `SELECT
         a.id         AS app_id,
         a.property_id,
         a.status,
         a.applied_at,
         p.title,
         p.subtype
       FROM applications AS a
       JOIN properties   AS p
         ON p.id = a.property_id
       WHERE a.tenant_id = ?
       ORDER BY a.applied_at DESC`,
      [user.id]
    )
    return res.json(apps)
  }

  //create a new application
  if (req.method === 'POST') {
    const { property_id } = req.body
    await pool.query(
      `INSERT INTO applications
         (tenant_id, property_id)
       VALUES (?, ?)`,
      [user.id, property_id]
    )
    return res.status(201).json({ ok: true })
  }

  res.setHeader('Allow', 'GET,POST')
  res.status(405).end()
}
 