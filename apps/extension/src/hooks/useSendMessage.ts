import { ChatGPTAPI } from '../chatgpt-api'
import { buildMessages } from '../utils/buildMessages'
import { updateMessage, updateStreaming } from '../stores/message.store'
import { getFromToState } from './useFromTo'
import { getPrompts } from '@src/utils/getPrompts'
import { sendTranslationMessage } from '@src/common/sendTranslationMessage'
import { storageService } from '@src/services/storage.service'
import { getSettingsState } from '@src/stores/settings.store'

const type = 'free'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

async function sendMessageUseFreeToken(value: string) {
  const deviceId = await storageService.getDeviceId()

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
}

async function sendMessageWithProxyServer(value: string, apiKey: string) {
  const api = new ChatGPTAPI({})
  const messages = buildMessages(value)

  try {
    await api.sendMessage({
      baseURL: 'https://own-chat-official-provider.vercel.app',
      apiKey,
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
        updateMessage(text)
      },
    })

    updateStreaming(false)
  } catch (error) {
    updateStreaming(false)
    console.log('send message error:', error)
  }
}

export function useSendMessage() {
  return async (value: string) => {
    if (!value) return
    updateStreaming(true)
    value = value.replace(/[\r\n]+$/, '') // 去掉结尾的换行符
    const settings = await storageService.getSettings()

    console.log('send settings:', settings)

    if (settings?.useFreeToken) {
      sendMessageUseFreeToken(value)
      return
    }

    await sendMessageWithProxyServer(value, settings.apiKey)
  }
}
