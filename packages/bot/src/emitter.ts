import mitt from 'mitt'
import { BotType } from './constants'
import { Message } from './domains/message.domain'

export type BotEvents = {
  SELECT_BOT: BotType

  CHANGE_LANG_TO: string

  ADD_MESSAGE: Message

  STREAMING_MESSAGE: string
}

export const emitter = mitt<BotEvents>()
