import { Box } from '@fower/react'
import { TranslatorEditor } from './TranslatorEditor'
import { useBotContext, useStreaming, useMessageContent } from '@ai-translator/bot'
import { TranslatorContent } from '../../components'

export function WebTranslator() {
  const bot = useBotContext()
  const { streaming } = useStreaming()
  const { content } = useMessageContent()

  return (
    <Box column mb-80 minH-70vh toCenterY maxW-640 mx-auto>
      <Box toCenter text4XL fontBold mb5 columnGap-8>
        <Box inlineFlex bgBrand100 py1 px2 black--dark bgYellow200--dark>
          AI Translator
        </Box>
        <Box>AI</Box>
      </Box>
      <TranslatorEditor
        onSendMessage={async () => {
          await bot.sendMessage()
        }}
      />

      {(streaming || content) && (
        <Box pt4 mb2 px2 textBase leadingNormal>
          <TranslatorContent
            streaming={streaming}
            content={content}
            isWordMode={bot.isWord}
            text={bot.text}
          />
        </Box>
      )}
    </Box>
  )
}
