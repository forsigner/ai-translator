import { Box } from '@fower/react'
import { TranslatorEditor } from './TranslatorEditor'
import { BotProvider, useBotContext } from '../../bot'
import { useSendMessage } from '../../hooks/useSendMessage'
import { TranslatorContent } from '../../components'
import { useMessage } from '../../stores/message.store'

export function DesktopTranslator() {
  const bot = useBotContext()
  const sendMessage = useSendMessage()
  const { content, streaming, isWordMode } = useMessage()

  return (
    <BotProvider>
      <Box column p4 maxW-640 mx-auto h-100vh bgWhite rounded2XL>
        <TranslatorEditor
          shadow
          onSendMessage={async (text) => {
            await sendMessage(text)
          }}
        />

        {(streaming || content) && (
          <Box mb2 p4 textBase leadingNormal mt2>
            <TranslatorContent
              streaming={streaming}
              content={content}
              isWordMode={isWordMode}
              text={bot.text}
            />
          </Box>
        )}
      </Box>
    </BotProvider>
  )
}
