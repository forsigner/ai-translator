export enum BotSlugs {
  TextTranslator = 'text-translator',
  CodeTranslator = 'code-translator',
  JSONTranslator = 'json-translator',
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
  layout: LayoutType
  hide?: boolean
  params?: Record<string, any>
  selected?: boolean
}

export const botList: BotType[] = [
  {
    name: 'Language translator',
    slug: BotSlugs.TextTranslator,
    intro: 'Translate text from one language to another',
    layout: LayoutType.TwoColumn,
    params: {
      from: 'auto',
      to: 'zh-cn',
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
    name: 'JSON translator',
    slug: BotSlugs.JSONTranslator,
    layout: LayoutType.Chat,
    intro: 'Translate text from one language to another, but with JSON Object',
  },

  {
    name: 'Text polisher',
    slug: BotSlugs.TextPolisher,
    layout: LayoutType.Chat,
    hide: true,
    intro: 'Translate text from one language to another, but with JSON Object',
  },

  {
    name: 'Text summarizer',
    slug: BotSlugs.TextSummarizer,
    layout: LayoutType.Chat,
    hide: true,
    intro: '',
  },
  {
    name: 'Grammar analyzer',
    slug: 'grammar-analyzer',
    layout: LayoutType.Chat,
    hide: true,
    intro: '',
  },
  {
    name: 'Code interpreter',
    slug: BotSlugs.CodeInterpreter,
    layout: LayoutType.Chat,
    hide: true,
    intro: '',
  },
]
