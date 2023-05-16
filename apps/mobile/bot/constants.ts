export interface BotType {
  name: string
  slug: string
  defaultParams?: Record<string, string>
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
    defaultParams: {
      from: 'en',
      to: 'zh-Hans',
    },
  },
  {
    name: 'Code translator',
    slug: 'code-translator',
    defaultParams: {
      from: 'JavaScript',
      to: 'Python',
    },
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
