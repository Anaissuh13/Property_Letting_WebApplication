import pool from'../../../lib/db'
import{verifyCookie}from'../../../lib/auth'

//this handler only lets an admin fetch the user list
export default async function handler(req,res){
  //check user token from cookie and see who they are
  const user=verifyCookie(req)
  //if no valid user or not an admin, block access
  if(!user.id||user.role!=='admin'){
    return res.status(401).json({error:'unauthorized'})
  }

  //only allow GET requests here
  if(req.method==='GET'){
    const [rows]=await pool.query(
      'SELECT id,first_name,last_name,email,role,created_at FROM users'
    )
    //sending the list of users back as json
    return res.json(rows)
  }

  //for any other HTTP method, tell client only GET is allowed
  res.setHeader('Allow','GET')
  res.status(405).end()
}
