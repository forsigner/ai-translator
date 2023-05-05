import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout, LOGIN_SUCCESS_REDIRECT_URL, Plan } from '@ai-translator/shared'

export default function PagePricing() {
  return <Plan />
}

PagePricing.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
