import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'
import { useMessage } from '@src/stores/message.store'
import { SendMessageBox } from './SendMessageBox'
import { useSendMessage } from '@src/hooks/useSendMessage'
import { CARD_HEIGHT, CARD_WIDTH } from '@src/common/constants'
import { Footer } from './Footer'
import { Markdown } from './Markdown'
import { forwardRef, useEffect, useState } from 'react'
import { TranslateResultSubscription } from './TranslateResultSubscription'
import { storage } from '@src/services/storage'

interface Props extends FowerHTMLProps<'div'> {
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, ...rest },
  ref,
) {
  const [deviceId, setDeviceId] = useState('')
  const sendMessage = useSendMessage()
  const { content, streaming } = useMessage()

  useEffect(() => {
    storage.getDeviceId().then((id) => {
      setDeviceId(id)
    })
  }, [])

  return (
    <Box ref={ref} w={CARD_WIDTH} minH={CARD_HEIGHT} column bgWhite {...rest}>
      <Header showSettings={showSettings} />
      {deviceId && <TranslateResultSubscription deviceId={deviceId} />}

      <Box p3>
        <SendMessageBox
          onSendMessage={async (text) => {
            await sendMessage(text)
          }}
        />
        <Box minH-46 pt4 mb2 px2 textBase leadingNormal>
          {streaming && (
            <Box>
              <IconChatLoading />
            </Box>
          )}

          <Box>{content && !streaming && <Markdown content={content} />}</Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
})
