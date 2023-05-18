import { createParser } from 'eventsource-parser'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { Message, Mutator, TokenProvider } from '@boter/api-sdk'
import { getBot } from '@boter/bot'
import { getBotPlugin } from '@boter/bot-ui'
import { getChatSettings } from './useChatSettings'
import { getSettings } from './useMySettings'
import { RegionChecker } from '../../../services/RegionChecker'
import { emitter } from '../../../common/emitter'
import { useChatStatus } from './useChatStatus'
import { addMessage } from './addMessage'
import { getOpenaiProxy } from '../utils'
import { ChatGPTAPI, OfficialChatGPTAPI } from '../../../chatgpt-api'
import { useAbortController } from './useAbortController'
import { useGetChatParams } from './useGetChatParams'
import { useUpdateMessage } from './useUpdateMessage'

export function useSendChatRequest() {
  const { getAbortController } = useAbortController()
  const { getChatParams } = useGetChatParams()
  const { setStatus } = useChatStatus()
  const { updateMessage } = useUpdateMessage()

  return async (value: string, messages: Message[], regenerateMessage?: Message) => {
    const bot = getBot()
    const plugin = getBotPlugin(bot.slug)
    const chatSettings = getChatSettings()
    const settings = getSettings()
    const inputMessages = plugin.buildMessages?.(value, messages, chatSettings) || []

    if (settings.tokenProvider === TokenProvider.Free) {
      await sendMessageUseFreeToken(value)
      return
    }

    if (settings.tokenProvider === TokenProvider.OpenAiApiKey) {
      const checker = RegionChecker.fromStorage()

      if (checker.isSupported) {
        await sendMessageWithOfficialAPI(value, settings.openaiApiKey!)
      } else {
        await sendMessageWithProxyServer(value, settings.openaiApiKey!)
      }
    }

    function updateMessageState(text: string) {
      Mutator.mutateMessages((messages) => {
        let index = messages.length - 1

        if (bot.regeneratingMessage) {
          index = messages.findIndex((i) => i.id === bot.regeneratingMessage?.id)
        }

        messages[index].content = text
        messages[index].streaming = false
        messages[index].extra = bot.currentExtra
      })
    }

    async function sendMessageUseFreeToken(value: string) {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/boter/completions`

        const TIME_OUT_MS = 60 * 1000
        const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS)

        const controller = new AbortController()

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: value,
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

        let text = ''

        const parser = createParser((event) => {
          if (event.type !== 'event') return

          try {
            text = JSON.parse(event.data)
            updateMessageState(text)
            emitter.emit('SCROLL_ANCHOR', '')
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
              setStatus('finished')
              if (regenerateMessage) {
                await updateMessage(regenerateMessage.id, text)
              } else {
                await addMessage(text, ChatCompletionResponseMessageRoleEnum.Assistant)
              }
              break
            }
            const str = new TextDecoder().decode(value)
            parser.feed(str)
          }
        } finally {
          reader.releaseLock()
        }
      } catch (error) {
        setStatus('finished')
      }
    }

    async function sendMessageWithProxyServer(value: string, apiKey: string) {
      const host: string = getOpenaiProxy()
      const settings = getSettings()
      const api = new ChatGPTAPI({})

      try {
        const url = `${host}/api/chat-stream?apiKey=${apiKey}`
        const text = await api.sendMessage({
          url,
          abortController: getAbortController(),
          messages: inputMessages,
          stream: true,
          completionParams: getChatParams(inputMessages),
          onMessage(text) {
            setStatus('streaming')
            updateMessageState(text)
            emitter.emit('SCROLL_ANCHOR', '')
          },
        })

        if (regenerateMessage) {
          await updateMessage(regenerateMessage.id, text)
        } else {
          await addMessage(text, ChatCompletionResponseMessageRoleEnum.Assistant)
        }

        setStatus('finished')
      } catch (error) {
        console.log('send message error:', error)
        if (typeof error === 'string') {
          if (regenerateMessage) {
            await updateMessage(regenerateMessage.id, error)
          } else {
            await addMessage(error, ChatCompletionResponseMessageRoleEnum.Assistant)
          }
        }
        setStatus('finished')
      }
    }

    async function sendMessageWithOfficialAPI(value: string, apiKey: string) {
      const settings = getSettings()
      const api = new OfficialChatGPTAPI({})
      try {
        const text = await api.sendMessage({
          apiKey: settings.openaiApiKey!,
          messages: inputMessages,
          stream: true,
          completionParams: {
            temperature: 0.8,
            top_p: 1.0,
            presence_penalty: 1.0,
            model: 'gpt-3.5-turbo',
            // max_tokens: 4000,
          },
          onMessage(text) {
            setStatus('streaming')
            updateMessageState(text)
            emitter.emit('SCROLL_ANCHOR', '')
          },
        })

        if (regenerateMessage) {
          await updateMessage(regenerateMessage.id, text)
        } else {
          await addMessage(text, ChatCompletionResponseMessageRoleEnum.Assistant)
        }

        setStatus('finished')
      } catch (error) {
        console.log('send message error:', error)
        if (typeof error === 'string') {
          if (regenerateMessage) {
            await updateMessage(regenerateMessage.id, error)
          } else {
            await addMessage(error, ChatCompletionResponseMessageRoleEnum.Assistant)
          }
        }
        setStatus('finished')
      }
      return
    }
  }
}
