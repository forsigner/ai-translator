import { Box } from '@fower/react'
import { TranslatorEditor } from './TranslatorEditor'
import { BotProvider, useBotContext } from '@ai-translator/bot'
import { useSendMessage } from '../../hooks/useSendMessage'
import { TranslatorContent } from '../../components'
import { useMessage } from '../../stores/message.store'

export function WebTranslator() {
  const bot = useBotContext()
  const sendMessage = useSendMessage()
  const { content, streaming, isWordMode } = useMessage()

  return (
    <BotProvider>
      <Box column mb-80 minH-70vh toCenterY maxW-640 mx-auto>
        <Box toCenter text4XL fontBold mb5 columnGap-8>
          <Box inlineFlex bgBrand100 py1 px2 black--dark bgYellow200--dark>
            AI Translator
          </Box>
          <Box>AI</Box>
        </Box>
        <TranslatorEditor
          onSendMessage={async (text) => {
            await sendMessage(text)
          }}
        />

        {(streaming || content) && (
          <Box pt4 mb2 px2 textBase leadingNormal>
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
