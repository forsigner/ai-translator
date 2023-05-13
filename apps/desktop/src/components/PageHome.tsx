import { DesktopTranslator } from '@ai-translator/shared'
import { getCurrent } from '@tauri-apps/api/window'
import { register, isRegistered } from '@tauri-apps/api/globalShortcut'
import useEscape from '@hooks/useEscape'

async function run() {
  const key = 'Command+Shift+K'
  const registered = await isRegistered(key)
  if (!registered) {
    await register(key, async () => {
      const window = getCurrent()
      const isVisible = await window.isVisible()
      console.log('isVisible:', isVisible)

      if (isVisible) {
        console.log('hide...')

        await window.hide()
        await window.show()
        await window.setFocus()
      }
      console.log('Shortcut triggered', await window.isVisible())
    })
  }
}

run()

export default function PageHome() {
  useEscape()
  return <DesktopTranslator />
}
