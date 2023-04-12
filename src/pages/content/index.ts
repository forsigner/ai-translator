import { renderApp } from './components/renderApp'
import { getSelectionState, setSelectedText } from './stores/selection.store'
import { hideThumbnail, showThumbnail } from './stores/thumbnail.store'
import { hideTranslator } from './stores/translator.store'

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

  setTimeout(() => {
    if (selection?.text) {
      hideThumbnail()
      hideTranslator()
      setSelectedText('')
    }
  }, 0)
})
