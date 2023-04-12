import { ChatCompletionResponseMessageRoleEnum } from 'openai'

import { ChatGPTAPI } from './chatgpt-api'
import { setStreaming, updateTranslateResult } from './stores/translator.store'
export function useSendMessage() {
  return async (value: string) => {
    setStreaming(true)
    if (!value) return
    const api = new ChatGPTAPI({})
    const messages: any = [
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content:
          '下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面这句话：“how are you ?”',
      },
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: value,
      },
    ]
    const code = '4xpji7txnp5v63owencu7gwsatkgms0k'
    const urlParams = `?authorizationCode=${code}`

    try {
      const url = `/api/chat-stream${urlParams}`
      await api.sendMessage({
        url,
        // baseURL: 'https://own-chat-official-provider.vercel.app',
        baseURL: 'http://localhost:4001',
        messages,
        stream: true,
        completionParams: {
          temperature: 0.8,
          top_p: 1.0,
          presence_penalty: 1.0,
          model: 'gpt-3.5-turbo',
          max_tokens: 2000,
        },
        onMessage(text) {
          console.log('text:', text)
          updateTranslateResult(text)
        },
      })

      setStreaming(false)
    } catch (error) {
      setStreaming(false)
      console.log('send message error:', error)
    }
  }
}
