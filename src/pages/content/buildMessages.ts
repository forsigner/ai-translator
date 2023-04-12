import { ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessage } from 'openai'
import { getPrompts } from './getPrompts'

export function buildMessages(text: string): ChatCompletionRequestMessage[] {
  const { userPrompt, systemPrompt } = getPrompts({
    text,
    from: 'en',
    to: 'zh-Hans',
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
