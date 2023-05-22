import { ChatgptAPI, RequestMode } from '@ai-translator/chatgpt-api'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { API_BASE_URL, BotSlugs, BotType, LayoutType, botList } from '../constants'
import { emitter } from '../emitter'
import { getOrGenerateDeviceId } from '../hooks/useDeviceId'
import { CreateMessageInput, Message } from './message.domain'
import { RegionChecker } from '../services/RegionChecker'
import { SettingsStorage } from '../services/SettingsStorage'
import { TokenStorage } from '../services/TokenStorage'
import { isWord } from '../utils/isWord'
import { MessageBuilder } from '../utils/MessageBuilder'
import { isDailyUsageLimit } from '../type-guard'
import { isReactNative } from '../utils'
import { MessageStorage } from '../services/MessageStorage'
import { BotStorage } from '../services/BotStorage'

export interface Params {
  from?: string
  to?: string
  [key: string]: any
}

export class Bot {
  bots: BotType[] = []

  private _bot: BotType

  private _params: Params = {}

  emitter = emitter

  /**
   * current input text
   */
  text = ''

  isWord = false

  messages: Message[] = []

  get params() {
    return this._params || {}
  }

  get slug() {
    return this._bot.slug
  }

  get name() {
    return this._bot.name
  }

  get layout() {
    return this._bot.layout
  }

  get isChatLayout() {
    return this.layout === LayoutType.Chat
  }

  static async create(clearMessagesWhenInitialized: boolean) {
    const bot = new Bot()
    const bots = await BotStorage.get()

    if (!bots?.length) {
      await BotStorage.set(botList)
      bot.bots = botList
    } else {
      bot.bots = bots
    }

    const activeBot = bots.find((bot) => bot.selected)

    await bot.init(activeBot || bot.bots[0])

    if (clearMessagesWhenInitialized) {
      await MessageStorage.clear(bot.slug)
    }

    return bot
  }

  private async init(bot: BotType) {
    this._bot = bot
    this._params = this._bot.params || {}

    console.log('this.isChatLayout:', this.isChatLayout)

    if (this.isChatLayout) {
      const messages = await MessageStorage.queryBotMessages(bot.slug)
      this.messages = messages
    } else {
      this.messages = []
    }
  }

  updateText = (value: string) => {
    this.text = value.trim().replace(/[\r\n]+$/, '')

    if (this.slug === BotSlugs.TextTranslator) {
      this.isWord = isWord(this.params.from!, value)
    }
  }

  updateParams = (params: Params, isResendMessage = false) => {
    this._params = params

    if (params?.to) {
      emitter.emit('CHANGE_LANG_TO', '')
      if (this.text && isResendMessage) {
        this.sendMessage()
      }
    }
  }

  async setLayout(layout: LayoutType) {
    this._bot.layout = layout
    const index = this.bots.findIndex((bot) => bot.slug === this.slug)
    this.bots[index].layout = layout

    await Promise.all([BotStorage.set(this.bots), this.init(this._bot)])
    emitter.emit('SET_LAYOUT')
  }

  selectBot = async (bot: BotType) => {
    for (const item of this.bots) {
      if (item.slug === bot.slug) {
        item.selected = true
      } else {
        item.selected = false
      }
    }

    const currentBot = this.bots.find((item) => item.selected)!

    await Promise.all([BotStorage.set(this.bots), this.init(currentBot)])
    emitter.emit('SELECT_BOT', currentBot)
  }

  buildMessages = () => {
    const messageBuilder = new MessageBuilder(this)
    return messageBuilder.buildMessages()
  }

  clearMessages = async () => {
    this.messages = []
    this.emitter.emit('CLEAR_MESSAGES')
    await MessageStorage.clear(this.slug)
  }

  removeMessagePair = async (id: string | number) => {
    const index = this.messages.findIndex((message) => message.id === id)
    this.messages.splice(index - 1, 2)
    this.emitter.emit('REMOVE_MESSAGE_PAIR')
    await MessageStorage.deleteMessagePair(id)
  }

  addMessage = async (input: CreateMessageInput) => {
    const message = Message.create(input)
    this.messages.push(message)
    this.emitter.emit('ADD_MESSAGE', message)

    if (this.isChatLayout) {
      await MessageStorage.add(message)
    }
  }

  updateStreamingMessage = (text: string) => {
    const len = this.messages.length
    this.messages[len - 1].content = text
    this.messages[len - 1].streaming = false
    this.emitter.emit('STREAMING_MESSAGE', text)
  }

  async queryDict() {
    const url = `${API_BASE_URL}/api/dict`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'zh-CHS',
        word: this.text,
      }),
    })
    const json = await res.json()

    if (!json?.data?.isWord) {
      throw new Error()
    }

    this.updateStreamingMessage(json)

    setTimeout(() => {
      this.emitter.emit('SCROLL_ANCHOR')
    }, 10)

    if (this.isChatLayout) {
      await MessageStorage.update(this.messages[this.messages.length - 1])
    }
  }

  sendMessage = async (text = '') => {
    if (text) this.text = text

    if (!this.text) return

    await this.addMessage({
      userId: 1, // TODO:
      botSlug: this.slug,
      content: this.text,
      role: ChatCompletionResponseMessageRoleEnum.User,
    })

    await this.addMessage({
      userId: 2, // TODO:
      botSlug: this.slug,
      content: '',
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      streaming: true,
    })

    this.emitter.emit('SCROLL_ANCHOR')

    if (this.isWord && this.params.to === 'zh-Hans') {
      try {
        await this.queryDict()
        return
      } catch (error) {}
    }

    const [settings, regionChecker, token, deviceId] = await Promise.all([
      SettingsStorage.get(),
      RegionChecker.fromStorage(),
      TokenStorage.get(),
      getOrGenerateDeviceId(),
    ])

    const api = new ChatgptAPI({
      isNative: isReactNative(),
      apiKey: settings?.apiKey,
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
          this.updateStreamingMessage(text)
          this.emitter.emit('SCROLL_ANCHOR')
        },
      })

      if (this.isChatLayout) {
        await MessageStorage.update(this.messages[this.messages.length - 1])
      }
    } catch (error) {
      if (typeof error === 'string') {
        this.updateStreamingMessage(error)
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
