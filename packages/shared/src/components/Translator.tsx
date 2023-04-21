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

interface Props extends FowerHTMLProps<'div'> {
  showSettings?: boolean
}

export const Translator = forwardRef<HTMLDivElement, Props>(function Translator(
  { showSettings = false, ...rest },
  ref,
) {
  const sendMessage = useSendMessage()
  const { content, streaming, isWordMode } = useMessage()

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
          <TranslatorContent streaming={streaming} content={content} isWordMode={isWordMode} />
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
})
