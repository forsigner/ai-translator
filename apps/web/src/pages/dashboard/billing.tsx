import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout, Plan } from '@ai-translator/shared'
import { LOGIN_SUCCESS_REDIRECT_URL } from '@ai-translator/chat'

export default function PageBilling() {
  return <Plan />
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
