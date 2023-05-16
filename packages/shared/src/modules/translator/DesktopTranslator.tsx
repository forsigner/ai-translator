import { Box } from '@fower/react'
import { useBotContext, useMessageContent, useStreaming } from '@ai-translator/bot'
import { TranslatorEditor } from './TranslatorEditor'
import { TranslatorContent } from '../../components'

export function DesktopTranslator() {
  const bot = useBotContext()
  const { content } = useMessageContent()
  const { streaming } = useStreaming()

  return (
    <Box column maxW-640 mx-auto h-100vh bgWhite rounded2XL>
      <TranslatorEditor
        shadow
        mx4
        mt4
        sticky
        top0
        onSendMessage={async (text) => {
          bot.updateText(text)

          // const window = getCurrent()
          // const physicalSize = await window.innerSize()
          // await window.setSize({
          //   ...physicalSize,
          //   height: bot.isWord ? 600 : 500,
          // })

          await bot.sendMessage()
        }}
      />

      <Box overflowAuto>
        {(streaming || content) && (
          <Box py2 px5 textBase leadingNormal>
            <TranslatorContent
              streaming={streaming}
              content={content}
              isWordMode={bot.isWord}
              text={bot.text}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
