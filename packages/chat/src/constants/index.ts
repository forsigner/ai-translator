export * from './bot.constants'
export const ONE_SECOND = 1000 // 一秒
export const ONE_MINUTE = ONE_SECOND * 60 // 一分钟
export const ONE_HOUR = ONE_MINUTE * 60 // 一小时
export const ONE_DAY = ONE_HOUR * 24 // 一天
export const ONE_YEAR = ONE_DAY * 365 // 一年

export const isProd = process.env.NODE_ENV === 'production'

export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST || process.env.NEXT_PUBLIC_API_HOST || 'translator.langpt.ai'

export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
  (process.env.PLASMO_PUBLIC_API_BASE_URL as string) ||
  'https://translator.langpt.ai'

export const subscriptionsEndpoint = `wss://${API_HOST}/graphql`
export const isDesktop = process.env.NEXT_PUBLIC_PLATFORM === 'DESKTOP'

const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export const isServer = typeof window === 'undefined'

export const PLATFORM = process.env.NEXT_PUBLIC_PLATFORM || process.env.PLASMO_PUBLIC_PLATFORM

export const isExtension = PLATFORM === 'EXTENSION'
export const isWeb = PLATFORM === 'WEB'

export const HOST =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://translator.langpt.ai'

const githubRedirectUri = `${HOST}/api/auth/callback/github`
const googleRedirectUri = `${HOST}/api/auth/callback/google`

export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubRedirectUri}`
export const googleAuthUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${googleRedirectUri}` +
  `&scope=profile email&client_id=${googleClientId}`

export const LOGIN_SUCCESS_REDIRECT_URL = '/'

export enum Paths {
  BILLING = '/dashboard/billing',
  PROFILE = '/dashboard/profile',
  TRANSLATION = '/dashboard/translation',
}

export const NAV_HEIGHT = 56
export const SIDEBAR_WIDTH = 260
export const CHAT_WIDTH = 720

export const THIRD_PARTY_LOGIN_TAG = 't'

export const THEME_KEY = 'fower-mode'
export const LANGUAGE_KEY = 'own-chat-language'

export const CARD_WIDTH = 480
export const CARD_HEIGHT = 200
export const HEADER_HEIGHT = 48
export const LANG_SELECT_WIDTH = 90
