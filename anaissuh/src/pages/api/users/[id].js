import pool from '../../../lib/db'
import { verifyCookie } from '../../../lib/auth'

//handler for admin to get, update or delete one user by id
export default async function handler(req,res){
  //verify cookie and get user info
  const admin=verifyCookie(req)
  //if not logged in or not admin, block access
  if(!admin.id||admin.role!=='admin')
    return res.status(401).json({message:'unauthorized'})

  //retrieving user id from URL query
  const{id}=req.query

  //if method is GET, fetch and return the user data
  if(req.method==='GET'){
    const[[u]]=await pool.query(
      'SELECT id, first_name, last_name, contact, email, role FROM users WHERE id=?',
      [id]
    )
    //sending back the user or an empty object if not found
    return res.json(u||{})
  }

  //if method is PUT, update the user record
  if(req.method==='PUT'){
    //pull updated fields from request body
    const{first_name,last_name,contact,email,role}=req.body
    //running the update query
    await pool.query(
      'UPDATE users SET first_name=?, last_name=?, contact=?, email=?, role=? WHERE id=?',
      [first_name,last_name,contact,email,role,id]
    )
    //confirm success
    return res.json({ok:true})
  }

  //delete user if method is DELETE
  if(req.method==='DELETE'){
    //delete the user by id
    await pool.query('DELETE FROM users WHERE id=?',[id])
    //confirm success
    return res.json({ok:true})
  }

  res.setHeader('Allow','GET,PUT,DELETE')
  return res.status(405).end()
}
