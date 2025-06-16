import pool from'../../../lib/db'
import {verifyCookie} from'../../../lib/auth'

export default async function handler(req,res) {
  const user = verifyCookie(req)
  if(!user.id||user.role!=='admin') {
    return res.status(401).json({error:'unauthorized'})
  }

  const {id} = req.query

  //approve or reject option
  if(req.method==='PUT') {
    const {status} = req.body
    if(!['pending','approved','rejected'].includes(status)) {
      return res.status(400).json({error:'bad status'})
    }
    await pool.query(
      'UPDATE applications SET status=? WHERE id=?',
      [status,id]
    )
    return res.json({ok:true})
  }

  res.setHeader('Allow','PUT')
  res.status(405).end()
}
