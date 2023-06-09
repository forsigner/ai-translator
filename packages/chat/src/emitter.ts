import mitt from 'mitt'
import { BotType } from './constants'
import { Message } from './domains/message.domain'
import { Settings } from './services'

export type BotEvents = {
  SELECT_BOT: BotType

  CHANGE_LANG_TO: string

  ADD_MESSAGE: Message

  CLEAR_MESSAGES: undefined

  REMOVE_MESSAGE_PAIR: undefined

  UPDATE_SETTINGS: Settings

  STREAMING_MESSAGE: string

  SCROLL_ANCHOR: undefined

  SET_LAYOUT: undefined
}

export const emitter = mitt<BotEvents>()
