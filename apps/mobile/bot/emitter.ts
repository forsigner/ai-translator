import mitt from 'mitt'
import { BotType } from './constants'

type Events = {
  SELECT_BOT: BotType
  CHANGE_LANG_TO: string
}

export const emitter = mitt<Events>()
