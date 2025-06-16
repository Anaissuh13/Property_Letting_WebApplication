import pool from'../../../lib/db'
import bcrypt from'bcryptjs'
import jwt from'jsonwebtoken'
import{serialize}from'cookie'

export default async function handler(req,res){
  //only allow POST requests
  if(req.method!=='POST'){
    return res.status(405).json({message:'Method not allowed'})
  }

  //get login data from request body
  const{email,password,role}=req.body
  //check for missing fields
  if(!email||!password||!role){
    return res.status(400).json({message:'Missing email,password or role'})
  }

  try{
    //1)find user by email and role
    const[rows]=await pool.query(
      'SELECT id,password_hash FROM users WHERE email=? AND role=?',
      [email,role]
    )
    //if no user is found send error
    if(rows.length===0){
      return res.status(401).json({message:'Invalid credentials'})
    }

    //2)checking if the password matches
    const user=rows[0]
    const valid=await bcrypt.compare(password,user.password_hash.trim())
    if(!valid){
      return res.status(401).json({message:'Invalid credentials'})
    }

    //3)create a token with user id and role
    const token=jwt.sign(
      {userId:user.id,role},
      process.env.JWT_SECRET,
      {expiresIn:'8h'}
    )

    //4)set token in a secure http-only cookie
    res.setHeader('Set-Cookie',serialize('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:'lax',
      path:'/',
      maxAge:8*60*60
    }))

    //send success message
    return res.status(200).json({message:'Logged in'})
  }catch(error){
    //on error log and send server error
    console.error('Login error:',error)
    return res.status(500).json({message:'Server error'})
  }
}
