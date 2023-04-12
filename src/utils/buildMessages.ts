import { ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessage } from 'openai'
import { getPrompts } from './getPrompts'
import { getFromToState } from '@src/hooks/useFromTo'

export function buildMessages(text: string): ChatCompletionRequestMessage[] {
  const formTo = getFromToState()

  const { userPrompt, systemPrompt } = getPrompts({
    text,
    from: formTo.from,
    to: formTo.to,
    selectedWord: '',
  })
  return [
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
  ]
}
