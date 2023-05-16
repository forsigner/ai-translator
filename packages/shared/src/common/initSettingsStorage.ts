import { SettingsStorage } from '../services/SettingsStorage'

export function initSettingsStorage() {
  async function run() {
    const settings = await SettingsStorage.get()

    // console.log('settings:', settings)

    if (!settings) {
      await SettingsStorage.set({
        apiKey: '',
        tokenProvider: 'Free',
        lang: 'en',
        theme: 'light',
      })
    }
  }

  run()
}
