import { storageService } from '@src/services/storage.service'

export function initSettingsStorage() {
  async function run() {
    const settings = await storageService.getSettings()

    console.log('settings:', settings)

    if (!settings) {
      await storageService.setSettings({
        apiKey: 'foo',
        useFreeToken: true,
        lang: 'en',
        theme: 'light',
      })
    }
  }

  run()
}
