import { getState } from 'stook'
import { Bot } from './domains/bot.domain'

export function getBot() {
  return getState('BOTER_BOT') as Bot
}
