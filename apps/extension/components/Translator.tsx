import { Box } from '@fower/react'
import { MotionValue } from 'framer-motion'
import { FowerHTMLProps } from '@fower/core'
import { useChat, useChatContext, useMessages, useDeviceId } from '@ai-translator/chat'
import { Header } from './Header'
import { SendMessageBox } from './SendMessageBox'
import { CARD_HEIGHT, CARD_WIDTH } from '../constants'
import { forwardRef, useEffect, useState } from 'react'
import { TranslatorContent } from './TranslatorContent'

interface Props extends FowerHTMLProps<'div'> {
  containerX?: MotionValue<number>
  containerY?: MotionValue<number>
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, containerX, containerY, ...rest },
  ref,
) {
  const { chat } = useChat()
  const { messages } = useMessages()

  const deviceId = useDeviceId()

  if (!deviceId) return null

  return (
    <Box ref={ref} w={CARD_WIDTH} roundedXL column bgWhite {...rest}>
      <Header showSettings={showSettings} containerX={containerX} containerY={containerY} />

      <Box p3>
        <SendMessageBox
          onSendMessage={async (text) => {
            await chat.sendMessage()
          }}
        />
        <Box pt4 mb2 px2 textBase leadingNormal>
          {messages[messages.length - 1] && (
            <TranslatorContent
              streaming={messages[messages.length - 1].streaming}
              content={messages[messages.length - 1].content}
              isWordMode={chat.isWord}
              text={chat.text}
            />
          )}
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
})
