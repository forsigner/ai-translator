import { nanoid } from 'nanoid'
import { AsyncStorage } from './AsyncStorage'

enum Keys {
  Settings = 'SETTINGS',
}

export interface Settings {
  apiKey: string
  tokenProvider: 'Free' | 'ApiKey'
  lang: string
  theme: string
}

export class SettingsStorage {
  static async set(settings: Settings) {
    await AsyncStorage.setItem(Keys.Settings, settings)
  }

  static async get(): Promise<Settings> {
    const settings = await AsyncStorage.getItem(Keys.Settings)
    return settings
  }
}
