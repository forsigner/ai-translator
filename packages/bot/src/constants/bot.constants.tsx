import React from 'react'
import { CodeOutline, TranslateOutline } from '@bone-ui/icons'
import { Box } from '@fower/react'

export interface BotType {
  name: string
  slug: string
  intro: string
  hide?: boolean
  icon?: any
  defaultParams?: Record<string, string>
}

export enum BotSlugs {
  TextTranslator = 'text-translator',
  CodeTranslator = 'code-translator',
  TextPolisher = 'text-polisher',
  TextSummarizer = 'text-summarizer',
  GrammarAnalyzer = 'grammar-analyzer',
  CodeInterpreter = 'code-interpreter',
}

export const bots: BotType[] = [
  {
    name: 'Translator',
    slug: BotSlugs.TextTranslator,
    intro: 'Translate text from one language to another',
    icon: (
      <Box square10 bgGray300--T20 roundedFull toCenter bgOrange100>
        <TranslateOutline orange600 />
      </Box>
    ),
    defaultParams: {
      from: 'en',
      to: 'zh-Hans',
    },
  },
  {
    name: 'Code translator',
    slug: BotSlugs.CodeTranslator,
    intro: 'Code to Code, Python to JavaScript, Java to Python...',
    icon: (
      <Box square10 bgGray300--T20 roundedFull toCenter bgRed100>
        <CodeOutline red700 />
      </Box>
    ),
    defaultParams: {
      from: 'JavaScript',
      to: 'Python',
    },
  },
  {
    name: 'Text polisher',
    slug: BotSlugs.TextPolisher,
    intro: 'Translate text from one language to another, but with JSON Object',
    icon: (
      <Box square10 bgGray300--T20 roundedFull toCenter bgGreen100>
        <Box text-10 green600>
          JSON
        </Box>
      </Box>
    ),
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
