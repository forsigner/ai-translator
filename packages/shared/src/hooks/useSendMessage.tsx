import { updateMessage, updateStreaming } from '../stores/message.store'
import { ChatAPI, RequestMode } from '../chat-api/ChatAPI'
import { emitter, getBot, useBotContext } from '../bot'
import { RegionChecker } from '../services/RegionChecker'
import { storage } from '../services/storage'
import { useEffect } from 'react'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

export function useSendMessage() {
  useEffect(() => {
    emitter.on('CHANGE_LANG_TO', () => {
      const bot = getBot()
      if (bot.text) {
        sendMessage(bot.text)
      }
    })
  }, [])

  async function sendMessage(value: string) {
    const bot = getBot()
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
      updateMessage(error as any, isWord)
    }
    return
  }
  return sendMessage
}
