import { renderIcon } from './components/renderIcon'

console.log('content loaded')

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString()
  console.log('选中的文本::', selectedText)
  if (selectedText !== '') {
    const span = document.createElement('span')
    span.id = 'foooooooo0000'
    span.style.display = 'inline-block'
    span.style.position = 'relative'
    span.style.backgroundColor = '#FFFF00'

    const range = window.getSelection().getRangeAt(0)
    range.surroundContents(span)

    renderIcon(span)
  }
})
