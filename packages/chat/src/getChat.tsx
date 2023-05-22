import { getState } from 'stook'
import { Chat } from './domains/chat.domain'

export function getChat() {
  return getState('AI_TRANSLATOR_CHAT') as Chat
}
