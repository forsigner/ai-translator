import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@common/session'

export default withIronSessionApiRoute(async (req, res) => {
  res.json(req?.session?.payload || {})
}, sessionOptions)
