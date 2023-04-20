import { updateMessage, updateStreaming } from '../stores/message.store'
import { storage } from '@src/services/storage'
import { RegionChecker } from '@src/services/RegionChecker'
import { ChatAPI, RequestMode } from '@src/chat-api/ChatAPI'
import { useBotContext } from '@src/bot'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

export function useSendMessage() {
  const bot = useBotContext()
  return async (value: string) => {
    if (!value) return
    updateStreaming(true)
    const { isWord } = bot
    value = value.replace(/[\r\n]+$/, '') // 去掉结尾的换行符
    const settings = await storage.getSettings()
    const regionChecker = await RegionChecker.fromStorage()
    const api = new ChatAPI(settings.apiKey)
    const messages = bot.buildMessages()

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
          updateMessage(text, isWord)
        },
      })

      updateStreaming(false)
    } catch (error) {
      updateStreaming(false)
      console.log('send message error:', error)
      updateMessage(error, isWord)
    }
    return
  }
}
