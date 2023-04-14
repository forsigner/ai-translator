import { nanoid } from 'nanoid'

enum Keys {
  DeviceId = 'DEVICE_ID',
}

class StorageService {
  async setDeviceId() {
    await chrome.storage.sync.set({
      [Keys.DeviceId]: nanoid(),
    })
  }

  async getDeviceId(): Promise<string> {
    const storage = await chrome.storage.sync.get(Keys.DeviceId)
    return storage?.[Keys.DeviceId]
  }
}

export const storageService = new StorageService()
