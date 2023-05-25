import { useEffect, useState } from 'react'
import { useChatContext } from '../context'
import { Settings } from '../services'

export function useSettings() {
  const chat = useChatContext()
  const [settings, setSettings] = useState<Settings>(chat._settings)

  useEffect(() => {
    chat.emitter.on('UPDATE_SETTINGS', (settings) => {
      setSettings({ ...settings })
    })
  }, [chat])

  async function updateSettings(settings: any) {
    setSettings(settings)
    chat.updateSettings(settings)
  }

  return { settings, updateSettings }
}
