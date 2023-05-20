import { ToastContainer } from 'bone-ui'
import { Popover } from './Popover'
import { Thumbnail } from './Thumbnail'
import { TranslatorContainer } from './TranslatorContainer'
import { BotProvider, getBot } from '@ai-translator/bot'
import { useText } from '@ai-translator/shared/src/stores/text.store'
import { useThumbnail, hideThumbnail } from '@ai-translator/shared/src/stores/thumbnail.store'

export function App() {
  const { x, y, visible } = useThumbnail()
  const { text } = useText()

  if (!visible) return null

  return (
    <BotProvider clearMessagesWhenInitialized>
      <ToastContainer></ToastContainer>
      <Popover
        placement="bottom"
        afterOpenChange={(isOpen) => {
          if (!isOpen) {
            hideThumbnail()
          } else {
            setTimeout(() => {
              const bot = getBot()
              bot.updateText(text)
              bot.sendMessage()
            }, 0)
          }
        }}
      >
        <Thumbnail x={x} y={y} />
        <TranslatorContainer />
      </Popover>
    </BotProvider>
  )
}
