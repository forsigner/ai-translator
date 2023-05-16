import { useDebouncedCallback } from 'use-debounce'
import { getState, useStore } from 'stook'
import { useEffect } from 'react'
import { toast } from 'bone-ui'
import { Settings, SettingsStorage } from '../services/SettingsStorage'

const key = 'Settings_visible'

export function useSettingsVisible() {
  const [visible, setVisible] = useStore<boolean>(key, false)

  return {
    visible,
    setVisible,
  }
}

export function useSettings() {
  const [loading, setLoading] = useStore('setting_loading', true)
  const [settings, setState] = useStore('Settings', {} as Settings)

  const saveSettings = useDebouncedCallback(async (settings: Settings, tips = 'Saved') => {
    await SettingsStorage.set(settings)

    toast.success(tips)
  }, 400)

  const setSettings = async (settings: Settings, tips = 'Saved') => {
    setState(settings)
    await saveSettings(settings, tips)
  }

  async function loadSettings() {
    const settings = await SettingsStorage.get()

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

export function getSettingsState(): Settings {
  return getState('Settings')
}
