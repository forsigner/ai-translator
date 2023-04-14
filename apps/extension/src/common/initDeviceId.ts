import { storageService } from '@src/services/storage.service'

export async function initDeviceId() {
  const deviceId = await storageService.getDeviceId()
  if (!deviceId) {
    storageService.setDeviceId()
  }
}
