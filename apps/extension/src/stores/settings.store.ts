import { useDebouncedCallback } from 'use-debounce'
import { getState, useStore } from 'stook'
import { useEffect } from 'react'
import { toast } from 'bone-ui'
import { Settings, storageService } from '@src/services/storage.service'

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

  const setSettings = useDebouncedCallback(async (settings: Settings) => {
    setState(settings)

    await storageService.setSettings(settings)

    toast.success('Saved')
  }, 400)

  async function loadSettings() {
    const settings = await storageService.getSettings()
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
