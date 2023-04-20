import { ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessage } from 'openai'
import { getPrompts } from './getPrompts'
import { getLangFromToState } from '@src/components/text-translator/useLangFromTo'

interface Return {
  messages: ChatCompletionRequestMessage[]
  isWordMode?: boolean
}

export function buildMessages(text: string): Return {
  const langFormTo = getLangFromToState()

  const { userPrompt, systemPrompt, isWordMode } = getPrompts({
    text,
    from: langFormTo.from,
    to: langFormTo.to,
    selectedWord: '',
  })

  return {
    isWordMode,
    messages: [
      {
        role: ChatCompletionResponseMessageRoleEnum.System,
        content: systemPrompt,
      },
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: userPrompt,
      },
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: text,
      },
    ],
  }
}
