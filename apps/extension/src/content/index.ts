import { storage } from '@langpt/shared/src/services/storage'
import { renderApp } from './renderApp'
import { updateText } from '@langpt/shared/src/stores/text.store'
import { hideThumbnail, showThumbnail } from '@langpt/shared/src/stores/thumbnail.store'

window.onload = async () => {
  const settings = await storage.getSettings()
  document.documentElement.classList.add(settings?.theme || 'light')

  renderApp()
}

document.addEventListener('mouseup', async (event) => {
  const currentElement = event.target
  const targetElement = document.querySelector('.langpt-content')

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
  const targetElement = document.querySelector('.langpt-content')

  if (targetElement && targetElement.contains(currentElement as any)) {
    return
  }
  hideThumbnail()
})
