import { Hooks, MY_SETTINGS, Setting } from '@boter/api-sdk'
import { getState } from 'stook'

export function useMySettings() {
  const result = Hooks.useMySettings()
  return {
    ...result,
    settings: result.data,
  }
}

export function getSettings(): Setting {
  const result = getState(MY_SETTINGS)
  return result?.data
}
