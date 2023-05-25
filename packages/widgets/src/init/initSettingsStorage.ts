import { SettingsStorage } from '@ai-translator/chat'

export function initSettingsStorage() {
  async function run() {
    const settings = await SettingsStorage.get()

    if (!settings) {
      await SettingsStorage.set({
        apiKey: '',
        aiMode: false,
        tokenProvider: 'Free',
        lang: 'en',
        theme: 'light',
      })
    }
  }

  run()
}
