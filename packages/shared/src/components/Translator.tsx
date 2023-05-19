import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { useBotContext, useMessages } from '@ai-translator/bot'
import { Header } from './Header'
import { SendMessageBox } from './SendMessageBox'
import { CARD_HEIGHT, CARD_WIDTH } from '../common/constants'
import { Footer } from './Footer'
import { forwardRef, useEffect, useState } from 'react'
import { TranslatorContent } from './TranslatorContent'
import { useDeviceId } from '../hooks/useDeviceId'

interface Props extends FowerHTMLProps<'div'> {
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, ...rest },
  ref,
) {
  const bot = useBotContext()
  const { message } = useMessages()

  const deviceId = useDeviceId()

  if (!deviceId) return null

  return (
    <Box ref={ref} w={CARD_WIDTH} column bgWhite {...rest}>
      <Header showSettings={showSettings} />

      <Box p3>
        <SendMessageBox
          onSendMessage={async (text) => {
            await bot.sendMessage()
          }}
        />
        <Box pt4 mb2 px2 textBase leadingNormal>
          <TranslatorContent
            streaming={message.streaming}
            content={message.content}
            isWordMode={bot.isWord}
            text={bot.text}
          />
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
})
