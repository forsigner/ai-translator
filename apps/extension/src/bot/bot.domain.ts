import { BotSlugs, BotType, bots } from './constants'
import { emitter } from './emitter'
import { Speaker } from './speaker'
import { isWord } from './utils/isWord'
import { MessageBuilder } from './utils/MessageBuilder'

export interface Params {
  from?: string
  to?: string
  [key: string]: any
}

export class Bot {
  private _bots: BotType[] = bots
  private _bot: BotType
  private _params: Params = {}

  speaker = new Speaker()

  /**
   * current input text
   */
  text = ''

  isWord = false

  selectedWord = ''

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
    this._params = this._bot.defaultParams
  }

  updateText = (value = '') => {
    this.text = value.trim()
    if (this.slug === BotSlugs.TextTranslator) {
      this.isWord = isWord(this.params.from, value)
    }
  }

  updateParams = (params: Params) => {
    this._params = params
  }

  selectBot = async (bot: BotType) => {
    emitter.emit('SELECT_BOT', bot)
    this.init(bot)
  }

  buildMessages = () => {
    const messageBuilder = new MessageBuilder(this)
    return messageBuilder.buildMessages()
  }
}
