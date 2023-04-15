import { storage } from '@src/services/storage'

export function initSettingsStorage() {
  async function run() {
    const settings = await storage.getSettings()

    // console.log('settings:', settings)

    if (!settings) {
      await storage.setSettings({
        apiKey: 'foo',
        useFreeToken: true,
        lang: 'en',
        theme: 'light',
      })
    }
  }

  run()
}
