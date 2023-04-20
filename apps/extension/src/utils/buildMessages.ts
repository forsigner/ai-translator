import { ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessage } from 'openai'
import { getPrompts } from './getPrompts'
import { getLangFromToState } from '@src/components/text-translator'

interface Return {
  messages: ChatCompletionRequestMessage[]
  isWordMode: boolean
}

export function buildMessages(text: string): Return {
  const formTo = getLangFromToState()
  const { userPrompt, systemPrompt, isWordMode } = getPrompts({
    text,
    from: formTo.from,
    to: formTo.to,
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
        content: `${userPrompt}`,
      },
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: `${text}`,
      },
    ],
  }
}
