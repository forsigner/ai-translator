import { ToastContainer } from 'bone-ui'
import { Popover } from './Popover'
import { Thumbnail } from './Thumbnail'
import { hideThumbnail, useThumbnail } from '@src/stores/thumbnail.store'
import { TranslatorContainer } from './TranslatorContainer'
import { useText } from '@src/stores/text.store'
import { useSendMessage } from '@src/hooks/useSendMessage'
import { BotProvider } from '@src/bot'

export function App() {
  const { x, y, visible } = useThumbnail()
  const { text } = useText()
  const sendMessage = useSendMessage()

  if (!visible) return null

  return (
    <BotProvider>
      <ToastContainer></ToastContainer>
      <Popover
        placement="bottom"
        afterOpenChange={(isOpen) => {
          if (!isOpen) {
            hideThumbnail()
          } else {
            setTimeout(() => {
              sendMessage(text)
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
