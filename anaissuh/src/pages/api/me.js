import { verifyCookie } from '../../lib/auth'

export default function handler(req, res) {
  //only allowing GET here
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  //verifyCookie reads your token= HTTP-only cookie
  const user = verifyCookie(req)
  if (!user.id) {
    //no valid session
    return res.status(401).end()
  }

  //logged-in user
  res.status(200).json({ id: user.id, role: user.role })
}
