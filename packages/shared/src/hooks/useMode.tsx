import { setCookie, getCookie } from 'cookies-next'
import { SettingsStorage } from '@ai-translator/chat'
import { store } from '@fower/core'
import { useState, useEffect } from 'react'
import { isExtension } from '../common'

interface Result {
  mode: string
  setMode: (mode: string) => void
}

export function useMode(): Result {
  const [state, setState] = useState<string>('')

  async function initMode() {
    if (isExtension) {
      const settings = await SettingsStorage.get()
      setMode(settings.theme || 'light')
    } else {
      const mode = getCookie('fower-mode') as string

      setMode(mode || 'light')
    }
  }

  useEffect(() => {
    initMode()
  }, [])

  function setMode(mode: string) {
    setState(mode)
    // setCookie('fower-mode', mode)
    store.setMode(mode)
    if (!isExtension) {
      setCookie('fower-mode', mode)
    }
  }

  return { mode: state, setMode } as Result
}
