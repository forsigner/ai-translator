import { nanoid } from 'nanoid'
import { isExtension } from '../common'

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
    if (isExtension) {
      await chrome.storage.sync.set({
        [Keys.DeviceId]: id,
      })
      return
    }
    localStorage.setItem(Keys.DeviceId, JSON.stringify(id))
  }

  async getDeviceId(): Promise<string> {
    if (isExtension) {
      const storage = await chrome.storage.sync.get(Keys.DeviceId)
      return storage?.[Keys.DeviceId]
    }

    const str = localStorage.getItem(Keys.DeviceId)
    try {
      return JSON.parse(str || '')
    } catch (error) {
      return ''
    }
  }

  async setSettings(settings: Settings) {
    if (isExtension) {
      await chrome.storage.sync.set({
        [Keys.Settings]: settings,
      })
      return
    }
    localStorage.setItem(Keys.Settings, JSON.stringify(settings))
  }

  async getSettings(): Promise<Settings> {
    if (isExtension) {
      const storage = await chrome.storage.sync.get(Keys.Settings)
      return storage?.[Keys.Settings]
    }
    const str = localStorage.getItem(Keys.Settings)
    return JSON.parse(str || '{}')
  }
}

export const storage = new Storage()
