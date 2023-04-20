import mitt from 'mitt'
import { BotType } from './constants'

type Events = {
  SELECT_BOT: BotType
}

export const emitter = mitt<Events>()
