import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { BasicLayout, LOGIN_SUCCESS_REDIRECT_URL } from '@ai-translator/shared'
import { Box } from '@fower/react'
import { FC, PropsWithChildren } from 'react'

const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box text3XL fontBold mb2>
      {children}
    </Box>
  )
}

export default function PageHome() {
  return (
    <Box textLG fontMedium py20 leadingLoose>
      <Title>Privacy Policy</Title>
      <Box>We proudly know absolutely nothing about what you put into AI Translator.</Box>
      <Box>
        We don’t track you. We don’t gather, transfer, sell, trade, gamble, stir-fry, ferment,
        decorate, or dance salsa with your data. It’s your data — not ours.
      </Box>
      <Title>Cookies</Title>

      <Box>Real life? Delicious. Internet life? Atrocious.</Box>

      <Box>
        No cookies here. Tons of other sites force you to accept cookies which means they are
        allowed to follow you across the internet with ads. Yuck. Fathom Analytics gives us just
        enough anonymous info to deliver a great product to you or send you on your way. You’re the
        consumer. Consume what you want, not what’s forced. Consume real cookies, not creepy digital
        ones.
      </Box>

      <Title>Browser permissions</Title>

      <Box>
        If you use AI Translator on your browser, it may request permission to access all visited
        web pages and browsing history. The only permission we requested is storage permission, we
        use it to store you personal settings.
      </Box>

      <Title>Contact us</Title>

      <Box>Anything you want to know is yours, just give me a shout: </Box>
      <Box textXL fontBold>
        forsigner@gmail.com
      </Box>
    </Box>
  )
}

PageHome.Layout = BasicLayout

export const getServerSideProps = withIronSessionSsr(async function ({ req, res, locale = '' }) {
  const { payload } = req.session

  if (!payload) {
    return {
      props: {
        locale,
      },
    }
  }

  return {
    redirect: {
      destination: LOGIN_SUCCESS_REDIRECT_URL,
      permanent: false,
    },
  }
}, sessionOptions)
