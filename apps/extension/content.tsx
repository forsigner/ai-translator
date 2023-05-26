import { Portal, ToastContainer } from 'bone-ui'
import { useMessage } from '@plasmohq/messaging/hook'
import { ChatProvider, getChat } from '@ai-translator/chat'
import { SettingsStorage } from '@ai-translator/chat'
import { Popover } from './components/Popover'
import { init, initFomir } from '@ai-translator/widgets'
import { Thumbnail } from './components/Thumbnail'
import {
  useThumbnail,
  hideThumbnail,
  showThumbnail,
  getThumbnailState,
} from './stores/thumbnail.store'
import { TranslatorContainer } from './components/TranslatorContainer'
import { updateText, useText } from './stores/text.store'

import './style.scss'

init()
initFomir()

window.onload = async () => {
  const settings = await SettingsStorage.get()
  document.documentElement.classList.add(settings?.theme || 'light')
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

  if (targetElement && targetElement.contains(currentElement as any)) {
    return
  }
  const store = getThumbnailState()
  if (store?.visible) {
    hideThumbnail()
  }
})

function IndexContent() {
  const { x, y, visible } = useThumbnail()
  const { text } = useText()
  useMessage((req) => {
    console.log('req....:', req)
  })

  if (!visible) return null
  return (
    <ChatProvider clearMessagesWhenInitialized>
      <ToastContainer />
      <Popover
        placement="bottom"
        afterOpenChange={(isOpen) => {
          if (!isOpen) {
            hideThumbnail()
          } else {
            setTimeout(() => {
              const bot = getChat()
              bot.updateText(text)
              bot.sendMessage()
            }, 0)
          }
        }}
      >
        <Portal>
          <Thumbnail x={x} y={y} />
        </Portal>
        <TranslatorContainer />
      </Popover>
    </ChatProvider>
  )
}

export default IndexContent
