import { renderApp } from './components/renderApp'
import { showThumbnail } from './thumbnail.store'

console.log('content loaded')

window.onload = () => {
  console.log('page loaded')
  renderApp()
}

document.addEventListener('mouseup', function (event) {
  const selectedText = window.getSelection().toString()
  console.log('选中的文本:', selectedText)
  if (selectedText !== '') {
    const { pageX: x, pageY: y } = event
    showThumbnail(x, y)
  }
})
