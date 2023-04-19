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

export const isProd = process.env.NODE_ENV === 'production'

// export const host = 'localhost:8001'
// export const baseURL = 'http://localhost:8001'
// export const subscriptionsEndpoint = `ws://${host}/graphql`

export const host = 'ai-translator.ownchat.me'
export const baseURL = 'https://ai-translator.ownchat.me'
export const subscriptionsEndpoint = `wss://${host}/graphql`

// export const subscriptionsEndpoint = isProd ? `wss://${host}/graphql` : `ws://${host}/graphql`

export interface Bot {
  name: string
  slug: string
}

export enum BotSlugs {
  'text-translator',
  'code-translator',
  'Text polisher',
  'Text summarizer',
  'grammar-analyzer',
  'Code interpreter',
}

export const bots: Bot[] = [
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
