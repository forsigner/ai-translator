import { renderApp } from './renderApp'
import { getMessageState, updateMessage } from '../../stores/message.store'
import { getSelectionState, setSelectedText } from '../../stores/selection.store'
import { getThumbnailState, hideThumbnail, showThumbnail } from '../../stores/thumbnail.store'
import { hideTranslator } from '../../stores/translator.store'

console.log('content loaded')

window.onload = () => {
  console.log('page loaded')
  renderApp()
}

document.addEventListener('mouseup', async (event) => {
  const selectedText = window.getSelection().toString()
  if (selectedText !== '') {
    const { pageX: x, pageY: y } = event

    console.log('selectedText:', selectedText)

    setTimeout(() => {
      setSelectedText(selectedText)
      showThumbnail(x, y)
    }, 10)
  }
})

document.addEventListener('click', () => {
  const selection = getSelectionState()
  const message = getMessageState()
  const thumbnail = getThumbnailState()

  setTimeout(() => {
    if (selection?.text) {
      thumbnail && hideThumbnail()
      hideTranslator()
      setSelectedText('')
      message && updateMessage('')
    }
  }, 0)
})
