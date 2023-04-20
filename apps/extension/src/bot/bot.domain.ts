import { BotType, bots } from './constants'
import { emitter } from './emitter'

export class Bot {
  private _bots: BotType[] = bots
  private _bot: BotType
  private _params: Record<string, any> = {}

  /**
   * current input text
   */
  text: string = ''

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

  updateText = (value: string) => {
    this.text = value
  }

  updateParams = (params: any) => {
    this._params = params
  }

  selectBot = async (bot: BotType) => {
    emitter.emit('SELECT_BOT', bot)
    this.init(bot)
  }

  createPrompt(bot: Bot) {
    //
  }
}
