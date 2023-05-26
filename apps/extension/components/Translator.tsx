import { Box } from '@fower/react'
import { MotionValue } from 'framer-motion'
import { FowerHTMLProps } from '@fower/core'
import { useChat, useMessages, useDeviceId } from '@ai-translator/chat'
import { Header } from './Header'
import { SendMessageBox } from './SendMessageBox'
import { CARD_WIDTH } from '../constants'
import { forwardRef } from 'react'
import { TranslatorContent } from './TranslatorContent'
import { CopyContent } from './CopyContent'

interface Props extends FowerHTMLProps<'div'> {
  containerX?: MotionValue<number>
  containerY?: MotionValue<number>
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { containerX, containerY, ...rest },
  ref,
) {
  const { chat } = useChat()
  const { messages } = useMessages()

  console.log('messages:', messages)

  const deviceId = useDeviceId()

  if (!deviceId) return null

  return (
    <Box ref={ref} w={CARD_WIDTH} roundedXL column bgWhite {...rest}>
      <Header containerX={containerX} containerY={containerY} />

      <Box p3>
        <SendMessageBox
          onSendMessage={async (text) => {
            await chat.sendMessage()
          }}
        />
        <Box pt4 px2 textBase leadingNormal mb2={chat.isWord}>
          {messages[messages.length - 1] && (
            <Box>
              <TranslatorContent
                streaming={messages[messages.length - 1].streaming}
                content={messages[messages.length - 1].content}
                isWordMode={chat.isWord}
                text={chat.text}
              />
              {!chat.isWord && (
                <Box toRight>
                  <CopyContent />
                </Box>
              )}
            </Box>
          )}
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
})
