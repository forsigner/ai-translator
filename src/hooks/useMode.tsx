import { store } from '@fower/core'
import { getSettingsStorage } from '@src/stores/settings.store'
import { useState, useEffect } from 'react'
interface Result {
  mode: string
  setMode: (mode: string) => void
}

export function useMode(): Result {
  const [state, setState] = useState<string>('')

  async function initMode() {
    const settings = await getSettingsStorage()
    setMode(settings.theme || 'light')
  }

  useEffect(() => {
    initMode()
  }, [])

  function setMode(mode: string) {
    setState(mode)
    // setCookie('fower-mode', mode)
    store.setMode(mode)
  }

  return { mode: state, setMode } as Result
}
