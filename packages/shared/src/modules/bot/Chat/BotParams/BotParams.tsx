import { useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { BotSlugs, useBot, useBotContext } from '@ai-translator/bot'
import { TranslatorLangSelector } from '../../../../components/TranslatorLangSelector'
import { CodeTranslatorSelector } from './CodeTranslatorSelector/CodeTranslatorSelector'

export const BotParams = () => {
  const { bot } = useBot()

  if (bot.slug === BotSlugs.TextTranslator) {
    return <TranslatorLangSelector containerHeight="60vh" />
  }

  if (bot.slug === BotSlugs.CodeTranslator) {
    return <CodeTranslatorSelector />
  }

  return null
}
