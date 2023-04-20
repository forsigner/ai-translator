import { buildMessages } from '../utils/buildMessages'
import { updateMessage, updateStreaming } from '../stores/message.store'
import { storage } from '@src/services/storage'
import { RegionChecker } from '@src/services/RegionChecker'
import { UseFreeTokenErrorTips } from '@src/components/UseFreeTokenErrorTips'
import { baseURL } from '@src/common/constants'
import { getLangFromToState } from '@src/components/text-translator'
import { ChatAPI, RequestMode } from '@src/chat-api/ChatAPI'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

export function useSendMessage() {
  return async (value: string) => {
    if (!value) return
    updateStreaming(true)
    value = value.replace(/[\r\n]+$/, '') // 去掉结尾的换行符
    const settings = await storage.getSettings()
    const regionChecker = await RegionChecker.fromStorage()

    const api = new ChatAPI(settings.apiKey)

    const { messages, isWordMode } = buildMessages(value)

    let requestMode = RequestMode.Official

    if (!regionChecker.isSupported) {
      requestMode = RequestMode.Proxy
    }

    if (settings.tokenProvider === 'Free') {
      requestMode = RequestMode.Boter
    }

    try {
      await api.sendMessage({
        requestMode,
        messages,
        onMessage(text) {
          updateMessage(text, isWordMode)
        },
      })

      updateStreaming(false)
    } catch (error) {
      updateStreaming(false)
      console.log('send message error:', error)
      updateMessage(error, isWordMode)
    }
    return
  }
}
