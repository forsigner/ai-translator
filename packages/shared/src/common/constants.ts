export const ONE_SECOND = 1000 // 一秒
export const ONE_MINUTE = ONE_SECOND * 60 // 一分钟
export const ONE_HOUR = ONE_MINUTE * 60 // 一小时
export const ONE_DAY = ONE_HOUR * 24 // 一天
export const ONE_YEAR = ONE_DAY * 365 // 一年

export const isProd = process.env.NODE_ENV === 'production'

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string
export const subscriptionsEndpoint = `wss://${API_HOST}/graphql`
export const isDesktop = process.env.NEXT_PUBLIC_PLATFORM === 'DESKTOP'

const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export const isServer = typeof window === 'undefined'

export const isExtension = process.env.NEXT_PUBLIC_PLATFORM === 'EXTENSION'

export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://ai-translator.langpt.ai'

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

export const supportLanguages: [string, string][] = [
  ['en', 'English'],
  ['zh-Hans', '简体中文'],
  ['zh-Hant', '繁體中文'],
  ['yue', '粤语'],
  ['wyw', '古文'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['es', 'Español'],
  ['it', 'Italiano'],
  ['ru', 'Русский'],
  ['pt', 'Português'],
  ['nl', 'Nederlands'],
  ['pl', 'Polski'],
  ['ar', 'العربية'],
  ['af', 'Afrikaans'],
  ['am', 'አማርኛ'],
  ['az', 'Azərbaycan'],
  ['be', 'Беларуская'],
  ['bg', 'Български'],
  ['bn', 'বাংলা'],
  ['bs', 'Bosanski'],
  ['ca', 'Català'],
  ['ceb', 'Cebuano'],
  ['co', 'Corsu'],
  ['cs', 'Čeština'],
  ['cy', 'Cymraeg'],
  ['da', 'Dansk'],
  ['el', 'Ελληνικά'],
  ['eo', 'Esperanto'],
  ['et', 'Eesti'],
  ['eu', 'Euskara'],
  ['fa', 'فارسی'],
  ['fi', 'Suomi'],
  ['fj', 'Fijian'],
  ['fy', 'Frysk'],
  ['ga', 'Gaeilge'],
  ['gd', 'Gàidhlig'],
  ['gl', 'Galego'],
  ['gu', 'ગુજરાતી'],
  ['ha', 'Hausa'],
  ['haw', 'Hawaiʻi'],
  ['he', 'עברית'],
  ['hi', 'हिन्दी'],
  ['hmn', 'Hmong'],
  ['hr', 'Hrvatski'],
  ['ht', 'Kreyòl Ayisyen'],
  ['hu', 'Magyar'],
  ['hy', 'Հայերեն'],
  ['id', 'Bahasa Indonesia'],
  ['ig', 'Igbo'],
  ['is', 'Íslenska'],
  ['jw', 'Jawa'],
  ['ka', 'ქართული'],
  ['kk', 'Қазақ'],
  ['mn', 'Монгол хэл'],
  ['tr', 'Türkçe'],
  ['ug', 'ئۇيغۇر تىلى'],
  ['uk', 'Українська'],
  ['ur', 'اردو'],
  ['vi', 'Tiếng Việt'],
]

export const langMap: Map<string, string> = new Map(supportLanguages)

export const langMapReverse = new Map(
  supportLanguages.map(([standardLang, lang]) => [lang, standardLang]),
)

export interface BotType {
  name: string
  slug: string
}

export enum BotSlugs {
  'TextTranslator' = 'text-translator',
  'CodeTranslator' = 'code-translator',
  'TextPolisher' = 'text-polisher',
  'TextSummarizer' = 'text-summarizer',
  'GrammarAnalyzer' = 'grammar-analyzer',
  'CodeInterpreter' = 'code-interpreter',
}

export const bots: BotType[] = [
  {
    name: 'Text translator',
    slug: 'text-translator',
  },
  {
    name: 'Code translator',
    slug: 'code-translator',
  },
  {
    name: 'Text polisher',
    slug: 'text-polisher',
  },

  {
    name: 'Text summarizer',
    slug: 'text-summarize',
  },
  {
    name: 'Grammar analyzer',
    slug: 'grammar-analyzer',
  },
  {
    name: 'Code interpreter',
    slug: 'code-interpreter',
  },
]
