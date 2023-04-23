import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { WebTranslator, BasicLayout, LOGIN_SUCCESS_REDIRECT_URL } from '@langpt/shared'

export default function PageHome() {
  return <WebTranslator />
}

PageHome.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
