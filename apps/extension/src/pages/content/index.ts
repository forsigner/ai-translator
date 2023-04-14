import { renderApp } from './renderApp'
import { updateText } from '../../stores/text.store'
import { hideThumbnail, showThumbnail } from '../../stores/thumbnail.store'
import { storageService } from '@src/services/storage.service'

window.onload = async () => {
  const settings = await storageService.getSettings()
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

document.addEventListener('click', (event) => {
  const currentElement = event.target
  const targetElement = document.querySelector('.ai-translator-content')

  if (!targetElement) return

  if (!targetElement.contains(currentElement as any)) {
    hideThumbnail()
  }
})
