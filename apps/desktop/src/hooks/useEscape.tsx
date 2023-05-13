import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import { getCurrent } from '@tauri-apps/api/window'
import { register, isRegistered } from '@tauri-apps/api/globalShortcut'

const useEscape = () => {
  const handleEscape = async (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const window = getCurrent()
      event.preventDefault()
      await window.hide()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])
}

export default useEscape
