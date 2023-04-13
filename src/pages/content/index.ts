import { renderApp } from './renderApp'
import { getMessageState, updateMessage } from '../../stores/message.store'
import { getTextState, updateText } from '../../stores/text.store'
import { getThumbnailState, hideThumbnail, showThumbnail } from '../../stores/thumbnail.store'
import { hideTranslator } from '../../stores/translator.store'
import { getSettingsStorage } from '@src/stores/settings.store'

console.log('content loaded')

window.onload = async () => {
  console.log('page loaded')
  const settings = await getSettingsStorage()
  document.documentElement.classList.add(settings?.theme || 'light')

  renderApp()
}

document.addEventListener('mouseup', async (event) => {
  const selectedText = window.getSelection().toString()
  if (selectedText !== '') {
    const { pageX: x, pageY: y } = event

    console.log('selectedText:', selectedText)

    setTimeout(() => {
      updateText(selectedText)
      showThumbnail(x, y)
    }, 10)
  }
})

document.addEventListener('click', () => {
  const selection = getTextState()
  const message = getMessageState()
  const thumbnail = getThumbnailState()

  setTimeout(() => {
    if (selection?.text) {
      thumbnail && hideThumbnail()
      hideTranslator()
      updateText('')
      message && updateMessage('')
    }
  }, 0)
})
