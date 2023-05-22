export enum BotSlugs {
  TextTranslator = 'text-translator',
  CodeTranslator = 'code-translator',
  TextPolisher = 'text-polisher',
  TextSummarizer = 'text-summarizer',
  GrammarAnalyzer = 'grammar-analyzer',
  CodeInterpreter = 'code-interpreter',
}

export enum LayoutType {
  Chat = 'Chat',
  TwoColumn = 'TwoColumn',
}

export interface BotType {
  name: string
  slug: string
  intro: string
  layout?: LayoutType
  hide?: boolean
  params?: Record<string, string>
  selected?: boolean
}

export const botList: BotType[] = [
  {
    name: 'Translator',
    slug: BotSlugs.TextTranslator,
    intro: 'Translate text from one language to another',
    layout: LayoutType.Chat,
    params: {
      from: 'en',
      to: 'zh-Hans',
    },
  },
  {
    name: 'Code translator',
    slug: BotSlugs.CodeTranslator,
    layout: LayoutType.TwoColumn,
    intro: 'Code to Code, Python to JavaScript, Java to Python...',
    params: {
      from: 'JavaScript',
      to: 'Python',
    },
  },
  {
    name: 'Text polisher',
    slug: BotSlugs.TextPolisher,
    intro: 'Translate text from one language to another, but with JSON Object',
  },

  {
    name: 'Text summarizer',
    slug: BotSlugs.TextSummarizer,
    hide: true,
    intro: '',
  },
  {
    name: 'Grammar analyzer',
    slug: 'grammar-analyzer',
    hide: true,
    intro: '',
  },
  {
    name: 'Code interpreter',
    slug: BotSlugs.CodeInterpreter,
    hide: true,
    intro: '',
  },
]
