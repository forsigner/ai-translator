import { setCookie, getCookie } from 'cookies-next'
import { store } from '@fower/core'
import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import { isExtension } from '../common'
interface Result {
  mode: string
  setMode: (mode: string) => void
}

export function useMode(): Result {
  const [state, setState] = useState<string>('')

  async function initMode() {
    if (isExtension) {
      const settings = await storage.getSettings()
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
