import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { WebTranslator, BasicLayout } from '@ai-translator/shared'
import { BotProvider } from '@ai-translator/bot'

export default function PageHome() {
  return (
    <BotProvider>
      <WebTranslator />
    </BotProvider>
  )
}

PageHome.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  return { props: { locale, ...(payload ? { payload } : {}) } }
}, sessionOptions)
