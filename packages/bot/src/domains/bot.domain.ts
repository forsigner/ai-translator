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
import { MessageStorage } from '../services/MessageStorage'
import { defaultMessages } from '../defaultMessages'

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

  get params() {
    return this._params || {}
  }

  get slug() {
    return this._bot.slug
  }

  get name() {
    return this._bot.name
  }

  static async create() {
    const bot = new Bot()
    bot.init(bot._bots[0])
    // await MessageStorage.clear()
    const messages = await MessageStorage.get()

    if (messages.length) {
      bot.messages = messages
    }

    return bot
  }

  private init(bot: BotType) {
    this._bot = bot
    this._params = this._bot.defaultParams || {}
  }

  updateText = (value: string = '') => {
    this.text = value.trim().replace(/[\r\n]+$/, '')

    if (this.slug === BotSlugs.TextTranslator) {
      this.isWord = isWord(this.params.from!, value)
    }
  }

  updateParams = (params: Params, isResendMessage = false) => {
    this._params = params

    if (params.to) {
      emitter.emit('CHANGE_LANG_TO', '')
      if (this.text && isResendMessage) {
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

  clearMessages = async () => {
    this.messages = []
    this.emitter.emit('CLEAR_MESSAGES')
    await MessageStorage.clear()
  }

  addMessage = async (input: CreateMessageInput) => {
    const message = MyMessage.create(input)
    this.messages.push(message)
    this.emitter.emit('ADD_MESSAGE', message)

    await MessageStorage.set(this.messages)
  }

  updateStreamingMessage = (text: string) => {
    this.emitter.emit('STREAMING_MESSAGE', text)
  }

  sendMessage = async (text = '') => {
    if (text) this.text = text

    if (!this.text) return
    this.message.updateStreaming(true)

    console.log('send..................')

    await this.addMessage({
      userId: 1, // TODO:
      content: this.text,
      role: ChatCompletionResponseMessageRoleEnum.User,
    })

    await this.addMessage({
      userId: 2, // TODO:
      content: 'init...',
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      streaming: true,
    })

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

      await MessageStorage.set(this.messages)

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
  }
}
