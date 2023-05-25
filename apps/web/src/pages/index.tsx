import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { Chat } from '@ai-translator/shared'

export default function PageHome() {
  return <Chat />
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
