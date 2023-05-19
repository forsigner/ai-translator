import mitt from 'mitt'
import { BotType } from './constants'
import { Message } from './domains/message.domain'

export type BotEvents = {
  SELECT_BOT: BotType

  CHANGE_LANG_TO: string

  ADD_MESSAGE: Message

  CLEAR_MESSAGES: undefined

  STREAMING_MESSAGE: string

  SCROLL_ANCHOR: undefined
}

export const emitter = mitt<BotEvents>()
