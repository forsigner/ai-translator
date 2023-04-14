import { ChatGPTAPI } from '../chatgpt-api'
import { buildMessages } from '../utils/buildMessages'
import { updateMessage, updateStreaming } from '../stores/message.store'
import { getFromToState } from './useFromTo'
import { getPrompts } from '@src/utils/getPrompts'
import { sendTranslationMessage } from '@src/common/sendTranslationMessage'
import { storageService } from '@src/services/storage.service'

const type = 'free'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

export function useSendMessage() {
  return async (value: string) => {
    updateStreaming(true)
    value = value.replace(/[\r\n]+$/, '') // 去掉结尾的换行符

    const deviceId = await storageService.getDeviceId()

    console.log('=====deviceId:', deviceId)

    if (type === 'free') {
      const formTo = getFromToState()
      const { userPrompt, systemPrompt } = getPrompts({
        text: value,
        from: formTo.from,
        to: formTo.to,
        selectedWord: '',
      })

      await sendTranslationMessage({
        content: `${userPrompt}: ${value}`,
        deviceId,
      })
      return
    }

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
          updateMessage(text)
        },
      })

      updateStreaming(false)
    } catch (error) {
      updateStreaming(false)
      console.log('send message error:', error)
    }
  }
}
