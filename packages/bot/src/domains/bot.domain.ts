import { ChatgptAPI, RequestMode } from '@ai-translator/chatgpt-api'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { API_BASE_URL, BotSlugs, BotType, bots } from '../constants'
import { emitter } from '../emitter'
import { getOrGenerateDeviceId } from '../hooks/useDeviceId'
import { Message } from '../message.domain'
import { CreateMessageInput, Message as MyMessage } from '../domains/message.domain'
import { RegionChecker } from '../services/RegionChecker'
import { SettingsStorage } from '../services/SettingsStorage'
import { TokenStorage } from '../services/TokenStorage'
import { isWord } from '../utils/isWord'
import { MessageBuilder } from '../utils/MessageBuilder'
import { isDailyUsageLimit } from '../type-guard'
import { isReactNative } from '../utils'

export interface Params {
  from?: string
  to?: string
  [key: string]: any
}

export class Bot {
  private _bots: BotType[] = bots

  private _bot: BotType

  private _params: Params = {}

  emitter = emitter

  /**
   * current input text
   */
  text = ''

  isWord = false

  message = new Message()

  messages: MyMessage[] = []

  constructor() {
    this.init(this._bots[0])
  }

  get params() {
    return this._params || {}
  }

  get slug() {
    return this._bot.slug
  }

  get name() {
    return this._bot.name
  }

  init(bot: BotType) {
    this._bot = bot
    this._params = this._bot.defaultParams || {}
  }

  updateText = (value: string = '') => {
    this.text = value.trim().replace(/[\r\n]+$/, '')

    if (this.slug === BotSlugs.TextTranslator) {
      this.isWord = isWord(this.params.from!, value)
    }
  }

  updateParams = (params: Params) => {
    this._params = params

    if (params.to) {
      emitter.emit('CHANGE_LANG_TO', '')
      if (this.text) {
        this.sendMessage()
      }
    }
  }

  selectBot = async (bot: BotType) => {
    emitter.emit('SELECT_BOT', bot)
    this.init(bot)
  }

  buildMessages = () => {
    const messageBuilder = new MessageBuilder(this)
    return messageBuilder.buildMessages()
  }

  addMessage = (input: CreateMessageInput) => {
    const message = new MyMessage(input)
    this.messages.push(message)
    this.emitter.emit('ADD_MESSAGE', message)
  }

  updateStreamingMessage = (text: string) => {
    this.emitter.emit('STREAMING_MESSAGE', text)
  }

  sendMessage = async (text = '') => {
    if (text) this.text = text

    if (!this.text) return
    this.message.updateStreaming(true)

    this.addMessage({
      userId: 1, // TODO:
      content: this.text,
      role: ChatCompletionResponseMessageRoleEnum.User,
    })

    this.addMessage({
      userId: 2, // TODO:
      content: '',
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      streaming: true,
    })

    try {
      const [settings, regionChecker, token, deviceId] = await Promise.all([
        SettingsStorage.get(),
        RegionChecker.fromStorage(),
        TokenStorage.get(),
        getOrGenerateDeviceId(),
      ])

      const api = new ChatgptAPI({
        isNative: isReactNative(),
        apiKey: settings?.apiKey || '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',
      })

      const messages = this.buildMessages()

      let requestMode = RequestMode.Official

      if (!regionChecker.isSupported) {
        requestMode = RequestMode.Proxy
      }

      if (settings.tokenProvider === 'Free') {
        requestMode = RequestMode.Unofficial
      }

      try {
        await api.sendMessage({
          baseURL: API_BASE_URL || 'https://ai-translator.langpt.ai',
          deviceId,
          token,
          requestMode,
          messages,
          onMessage: (text) => {
            this.message.updateContent(text)
            this.updateStreamingMessage(text)
          },
        })

        this.message.updateStreaming(false)
      } catch (error) {
        this.message.updateStreaming(false)
        if (typeof error === 'string') {
          this.message.updateContent(error)
          return
        }

        if (isDailyUsageLimit(error)) {
          // updateMessage(<DailyUsageLimit />)
          // TODO:
          return
        }
      }
    } catch (error) {
      console.log('0200202:', error)
    }
  }
}
