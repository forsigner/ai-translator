import { nanoid } from 'nanoid'
import { AsyncStorage } from './AsyncStorage'

enum Keys {
  DeviceId = 'DEVICE_ID',
  Settings = 'SETTINGS',
}

export interface Settings {
  apiKey: string
  tokenProvider: 'Free' | 'ApiKey'
  lang: string
  theme: string
}

class Storage {
  async setDeviceId() {
    const id = nanoid()
    await AsyncStorage.setItem(Keys.DeviceId, id)
  }

  async getDeviceId(): Promise<string> {
    const id = await AsyncStorage.getItem(Keys.DeviceId)
    return id
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
