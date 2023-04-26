import { nanoid } from 'nanoid'
import { AsyncStorage } from './AsyncStorage'

enum Keys {
  Settings = 'SETTINGS',
  Token = 'TOKEN',
}

export interface Settings {
  apiKey: string
  tokenProvider: 'Free' | 'ApiKey'
  lang: string
  theme: string
}

class Storage {
  async setToken(token: string) {
    await AsyncStorage.setItem(Keys.Token, token)
  }

  async getToken(): Promise<string> {
    const token = await AsyncStorage.getItem(Keys.Token)
    return token
  }

  async setSettings(settings: Settings) {
    await AsyncStorage.setItem(Keys.Settings, settings)
  }

  async getSettings(): Promise<Settings> {
    const settings = await AsyncStorage.getItem(Keys.Settings)
    return settings
  }
}

export const storage = new Storage()
