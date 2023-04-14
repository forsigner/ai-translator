import { useDebouncedCallback } from 'use-debounce'
import { getState, mutate, useStore } from 'stook'
import { useEffect } from 'react'
import { toast } from 'bone-ui'

const key = 'Settings_visible'

export function useSettingsVisible() {
  const [visible, setVisible] = useStore<boolean>(key, false)

  return {
    visible,
    setVisible,
  }
}

export interface Settings {
  apiKey: string
  lang: string
  theme: string
}

export function useSettings() {
  const [loading, setLoading] = useStore('setting_loading', true)
  const [settings, setState] = useStore('Settings', {} as Settings)

  const setSettings = useDebouncedCallback(async (settings: Settings) => {
    setState(settings)

    await chrome.storage.sync.set({
      settings,
    })
    toast.success('Saved')
  }, 400)

  async function loadSettings() {
    const settings = await getSettingsStorage()
    setLoading(false)
    if (settings) setState(settings)
  }

  useEffect(() => {
    loadSettings()
  }, [])

  return {
    loading,
    settings,
    setSettings,
  }
}

export async function getSettingsStorage(): Promise<Settings> {
  const storage = await chrome.storage.sync.get('settings')
  return storage?.settings
}
