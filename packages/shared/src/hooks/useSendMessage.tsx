import { updateMessage, updateStreaming } from '../stores/message.store'
import { ChatgptAPI, RequestMode } from '@ai-translator/chatgpt-api'
import { emitter, getBot } from '../bot'
import { RegionChecker } from '../services/RegionChecker'
import { storage } from '../services/storage'
import { useEffect } from 'react'
import { API_BASE_URL, isDailyUsageLimit } from '../common'
import { DailyUsageLimit } from '../components/chat-error-tips/DailyUsageLimit'
import { getOrGenerateDeviceId } from '../hooks/useDeviceId'

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

    const [settings, regionChecker, token, deviceId] = await Promise.all([
      storage.getSettings(),
      RegionChecker.fromStorage(),
      storage.getToken(),
      getOrGenerateDeviceId(),
    ])

    const api = new ChatgptAPI(settings.apiKey)

    const messages = bot.buildMessages()

    let requestMode = RequestMode.Official

    if (!regionChecker.isSupported) {
      requestMode = RequestMode.Proxy
    }

    if (settings.tokenProvider === 'Free') {
      requestMode = RequestMode.Unofficial
    }

    try {
      await api.sendMessage({
        baseURL: API_BASE_URL,
        deviceId,
        token,
        requestMode,
        messages,
        onMessage(text) {
          updateMessage(text, isWord)
        },
      })

      updateStreaming(false)
    } catch (error) {
      updateStreaming(false)
      if (typeof error === 'string') {
        updateMessage(error as any, isWord)
        return
      }

      if (isDailyUsageLimit(error)) {
        return updateMessage(<DailyUsageLimit />)
      }
    }
    return
  }
  return sendMessage
}
