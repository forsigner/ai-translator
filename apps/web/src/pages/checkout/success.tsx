import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout } from '@langpt/shared'
import { CheckoutSuccess } from '@components/CheckoutSuccess'

export default function PageCheckoutSuccess() {
  return <CheckoutSuccess />
}

PageCheckoutSuccess.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
