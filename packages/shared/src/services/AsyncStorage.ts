import { isExtension, isServer } from '../common'

export class AsyncStorage {
  static async setItem<T = any>(key: string, value: T) {
    if (isServer) return

    if (isExtension) {
      await chrome.storage.sync.set({
        [key]: value,
      })
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }

  static async getItem<T = any>(key: string): Promise<T | undefined> {
    if (isServer) return
    if (isExtension) {
      const storage = await chrome.storage.sync.get(key)
      return storage?.[key]
    }
    const str = localStorage.getItem(key)
    if (!str) return
    try {
      return JSON.parse(str)
    } catch {
      return
    }
  }
}
