import { renderApp } from './renderApp'
import { updateText } from '../../stores/text.store'
import { showThumbnail } from '../../stores/thumbnail.store'
import { storage } from '@src/services/storage'

window.onload = async () => {
  const settings = await storage.getSettings()
  document.documentElement.classList.add(settings?.theme || 'light')

  renderApp()
}

document.addEventListener('mouseup', async (event) => {
  const currentElement = event.target
  const targetElement = document.querySelector('.ai-translator-content')

  if (targetElement && targetElement.contains(currentElement as any)) {
    return
  }

  const selectedText = window.getSelection().toString()

  if (selectedText !== '') {
    const { pageX: x, pageY: y } = event

    setTimeout(() => {
      updateText(selectedText)
      showThumbnail(x, y)
    }, 10)
  }
})

document.addEventListener('click', (event) => {})
