import { Box } from '@fower/react'
import { motion, MotionValue } from 'framer-motion'
import { FowerHTMLProps } from '@fower/core'
import { useBot, useBotContext, useMessages } from '@ai-translator/bot'
import { Header } from './Header'
import { SendMessageBox } from './SendMessageBox'
import { CARD_HEIGHT, CARD_WIDTH } from '../common/constants'
import { Footer } from './Footer'
import { forwardRef, useEffect, useState } from 'react'
import { TranslatorContent } from './TranslatorContent'
import { useDeviceId } from '../hooks/useDeviceId'

interface Props extends FowerHTMLProps<'div'> {
  containerX?: MotionValue<number>
  containerY?: MotionValue<number>
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, containerX, containerY, ...rest },
  ref,
) {
  const { bot } = useBot()
  const { messages } = useMessages()

  const deviceId = useDeviceId()

  if (!deviceId) return null

  return (
    <motion.div style={{}}>
      <Box ref={ref} w={CARD_WIDTH} column bgWhite {...rest}>
        <Header showSettings={showSettings} containerX={containerX} containerY={containerY} />

        <Box p3>
          <SendMessageBox
            onSendMessage={async (text) => {
              await bot.sendMessage()
            }}
          />
          <Box pt4 mb2 px2 textBase leadingNormal>
            {messages[messages.length - 1] && (
              <TranslatorContent
                streaming={messages[messages.length - 1].streaming}
                content={messages[messages.length - 1].content}
                isWordMode={bot.isWord}
                text={bot.text}
              />
            )}
          </Box>
          {/* <Footer /> */}
        </Box>
      </Box>
    </motion.div>
  )
})
