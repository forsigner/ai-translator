import { withIronSessionApiRoute } from 'iron-session/next'
import { setCookie } from 'cookies-next'
import { sessionOptions } from '@common/session'
import { graphqlClient } from '@common/query'
import { LoginSuccessPayload, LOGIN_BY_GOOGLE } from '@ai-translator/api-sdk'
import { LOGIN_SUCCESS_REDIRECT_URL, THIRD_PARTY_LOGIN_TAG } from '@ai-translator/chat'

export default withIronSessionApiRoute(async (req, res) => {
  const { code } = req.query
  try {
    const data: any = await graphqlClient.query(LOGIN_BY_GOOGLE, {
      code,
    })

    const payload: LoginSuccessPayload = data.loginByGoogle

    req.session.payload = payload
    await req.session.save()

    res.redirect(`${LOGIN_SUCCESS_REDIRECT_URL}`)
  } catch (e) {
    const error: any = e
    res.status(500).json(error.errors[0])
  }
}, sessionOptions)
