import { storage } from '../services/storage'

export async function initDeviceId() {
  const deviceId = await storage.getDeviceId()
  if (!deviceId) {
    storage.setDeviceId()
  }
}