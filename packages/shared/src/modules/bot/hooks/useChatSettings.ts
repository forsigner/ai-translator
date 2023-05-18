import { CHAT_SETTINGS, ChatSettings, Hooks } from '@boter/api-sdk'
import { getState } from 'stook'

export function useChatSettings() {
  const result = Hooks.useChatSettings()
  return {
    ...result,
    chatSettings: result.data,
  }
}

export function getChatSettings(): ChatSettings {
  return getState(CHAT_SETTINGS)?.data
}
