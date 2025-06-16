import { parse as parseCookie } from 'cookie'
import jwt from 'jsonwebtoken'

//this returns userId, role or {} if not valid
export function verifyCookie(req) {
  const cookies = parseCookie(req.headers?.cookie || '')
  const token = cookies.token
  if (!token) return {}
  try {
    //JWT_SECRET must match the one used on login
    const data = jwt.verify(token, process.env.JWT_SECRET)
    //data should have userId + role
    return { id: data.userId, role: data.role }
  } catch {
    return {}
  }
}
