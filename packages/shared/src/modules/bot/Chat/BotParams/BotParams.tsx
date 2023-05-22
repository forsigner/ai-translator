import { useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { BotSlugs, useChat, useChatContext } from '@ai-translator/chat'
import { TranslatorLangSelector } from '../../../../components/TranslatorLangSelector'
import { CodeTranslatorSelector } from './CodeTranslatorSelector/CodeTranslatorSelector'

export const BotParams = () => {
  const { chat } = useChat()

  if (chat.slug === BotSlugs.TextTranslator) {
    return <TranslatorLangSelector containerHeight="60vh" />
  }

  if (chat.slug === BotSlugs.CodeTranslator) {
    return <CodeTranslatorSelector />
  }

  return null
}
