import { ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessage } from 'openai'
import { getCodeFromToState } from './useCodeFromTo'
import { createPrompt } from './createPrompt'

interface Return {
  messages: ChatCompletionRequestMessage[]
  isWordMode?: boolean
}

export function buildMessages(text: string): Return {
  const fromTo = getCodeFromToState()
  const prompt = createPrompt(fromTo.from, fromTo.to, text)

  return {
    messages: [
      {
        role: ChatCompletionResponseMessageRoleEnum.System,
        content: prompt,
      },
    ],
  }
}
