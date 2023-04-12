import { ChatGPTAPI } from '../../chatgpt-api'
import { setStreaming, updateTranslateResult } from './stores/translator.store'
import { buildMessages } from './buildMessages'

export function useSendMessage() {
  return async (value: string) => {
    setStreaming(true)
    if (!value) return
    const api = new ChatGPTAPI({})
    const code = '4xpji7txnp5v63owencu7gwsatkgms0k'
    const urlParams = `?authorizationCode=${code}`

    const messages = buildMessages(value)
    console.log('messages:', messages)

    try {
      const url = `/api/chat-stream${urlParams}`
      await api.sendMessage({
        url,
        baseURL: 'https://own-chat-official-provider.vercel.app',
        // baseURL: 'http://localhost:4001',
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
