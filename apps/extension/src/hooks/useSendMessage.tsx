import { createParser } from 'eventsource-parser'
import { ChatGPTAPI } from '../chatgpt-api'
import { OfficialChatGPTAPI } from '../official-chatgpt-api'
import { buildMessages } from '../utils/buildMessages'
import { updateMessage, updateStreaming } from '../stores/message.store'
import { getPrompts } from '@src/utils/getPrompts'
import { storage } from '@src/services/storage'
import { RegionChecker } from '@src/services/RegionChecker'
import { UseFreeTokenErrorTips } from '@src/components/UseFreeTokenErrorTips'
import { baseURL } from '@src/common/constants'
import { getLangFromToState } from '@src/components/text-translator'

// translate from English to 简体中文: Share your wildest ChatGPT conversations with one click.

async function sendMessageUseFreeToken(value: string) {
  const formTo = getLangFromToState()

  const { userPrompt, systemPrompt, isWordMode } = getPrompts({
    text: value,
    from: formTo.from,
    to: formTo.to,
    selectedWord: '',
  })

  const content = isWordMode
    ? `${systemPrompt}。 \n Now ${userPrompt}: ${value}`
    : `${userPrompt}: ${value}`

  try {
    const url = `${baseURL}/api/free/completions`

    const TIME_OUT_MS = 60 * 1000
    const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS)

    const controller = new AbortController()
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
      }),
      signal: controller.signal,
    })

    clearTimeout(reqTimeoutId)

    if (!res.ok || !res.body) {
      // TODO: need to improve
      const errorRes = await res.json()
      console.log('errorRes:', errorRes)

      return
    }

    const parser = createParser((event) => {
      if (event.type !== 'event') return

      try {
        const str = JSON.parse(event.data)
        updateMessage(str, isWordMode)
      } catch (e) {
        console.log('e:', e)
      }
    })

    const reader = res.body.getReader()

    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        const str = new TextDecoder().decode(value)
        parser.feed(str)
      }
    } finally {
      reader.releaseLock()
    }
  } catch (error) {
    updateMessage(<UseFreeTokenErrorTips />, isWordMode)
  }
}

async function sendMessageWithProxyServer(value: string, apiKey: string) {
  const api = new ChatGPTAPI({})
  const { messages, isWordMode } = buildMessages(value)

  try {
    await api.sendMessage({
      baseURL: 'https://styli.js.org',
      apiKey,
      messages,
      stream: true,
      completionParams: {
        temperature: 0.8,
        top_p: 1.0,
        presence_penalty: 1.0,
        model: 'gpt-3.5-turbo',
        // max_tokens: 2000,
      },
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
}

async function sendMessageWithOfficialAPI(value: string, apiKey: string) {
  const api = new OfficialChatGPTAPI({ apiKey })
  const { messages, isWordMode } = buildMessages(value)

  try {
    await api.sendMessage({
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
        updateMessage(text, isWordMode)
      },
    })

    updateStreaming(false)
  } catch (error) {
    updateStreaming(false)
    updateMessage(error, isWordMode)
  }
}

export function useSendMessage() {
  return async (value: string) => {
    if (!value) return
    updateStreaming(true)
    value = value.replace(/[\r\n]+$/, '') // 去掉结尾的换行符
    const settings = await storage.getSettings()

    if (settings?.tokenProvider === 'Free') {
      sendMessageUseFreeToken(value)
      return
    }

    const regionChecker = await RegionChecker.fromStorage()

    if (regionChecker.isSupported) {
      await sendMessageWithOfficialAPI(value, settings.apiKey)
      return
    }

    await sendMessageWithProxyServer(value, settings.apiKey)
  }
}
