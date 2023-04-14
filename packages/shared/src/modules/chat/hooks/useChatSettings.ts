import { Hooks } from '@ai-translator/api-sdk'

export function useChatSettings() {
  const result = Hooks.useChatSettings()
  return {
    ...result,
    chatSettings: result.data,
  }
}
