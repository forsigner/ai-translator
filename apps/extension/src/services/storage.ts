import { nanoid } from 'nanoid'

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
    await chrome.storage.sync.set({
      [Keys.DeviceId]: nanoid(),
    })
  }

  async getDeviceId(): Promise<string> {
    const storage = await chrome.storage.sync.get(Keys.DeviceId)
    return storage?.[Keys.DeviceId]
  }

  async setSettings(settings: Settings) {
    await chrome.storage.sync.set({
      [Keys.Settings]: settings,
    })
  }

  async getSettings(): Promise<Settings> {
    const storage = await chrome.storage.sync.get(Keys.Settings)
    return storage?.[Keys.Settings]
  }
}

export const storage = new Storage()
