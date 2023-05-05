import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout, DashboardLayout, LOGIN_SUCCESS_REDIRECT_URL, Plan } from '@ai-translator/shared'

export default function PageBilling() {
  return <Plan />
}

PageBilling.Layout = DashboardLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
