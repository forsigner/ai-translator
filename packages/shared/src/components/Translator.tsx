import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { Header } from './Header'
import { SendMessageBox } from './SendMessageBox'
// import { useSendMessage } from '@src/hooks/useSendMessage'
import { CARD_HEIGHT, CARD_WIDTH } from '../common/constants'
import { Footer } from './Footer'
import { forwardRef, useEffect, useState } from 'react'
import { TranslatorContent } from './TranslatorContent'
import { useMessage } from '../stores/message.store'
import { useSendMessage } from '../hooks/useSendMessage'
import { useBotContext } from '../bot'
import { useDeviceId } from '../hooks/useDeviceId'
import { detectLanguageCode } from '../utils/detectLanguage'

interface Props extends FowerHTMLProps<'div'> {
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, ...rest },
  ref,
) {
  const sendMessage = useSendMessage()
  const bot = useBotContext()
  const { content, streaming, isWordMode } = useMessage()

  const deviceId = useDeviceId()

  useEffect(() => {
    detectLanguageCode('love').then((code) => console.log('code:', code))
  }, [])

  if (!deviceId) return null

  return (
    <Box ref={ref} w={CARD_WIDTH} column bgWhite {...rest}>
      <Header showSettings={showSettings} />

      <Box p3>
        <SendMessageBox
          onSendMessage={async (text) => {
            await sendMessage(text)
          }}
        />
        <Box pt4 mb2 px2 textBase leadingNormal>
          <TranslatorContent
            streaming={streaming}
            content={content}
            isWordMode={isWordMode}
            text={bot.text}
          />
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
})
