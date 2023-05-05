import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout } from '@ai-translator/shared'
import { CheckoutCancel } from '@components/CheckoutCancel'

export default function PageCheckoutCancel() {
  return <CheckoutCancel />
}

PageCheckoutCancel.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
