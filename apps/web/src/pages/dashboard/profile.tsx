import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout, DashboardLayout, LOGIN_SUCCESS_REDIRECT_URL, Plan } from '@langpt/shared'

export default function PageProfile() {
  return <Plan />
}

PageProfile.Layout = DashboardLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
