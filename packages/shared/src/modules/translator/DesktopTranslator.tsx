import { Box } from '@fower/react'
import { useBotContext } from '@ai-translator/bot'
import { getCurrent } from '@tauri-apps/api/window'
import { TranslatorEditor } from './TranslatorEditor'
import { useSendMessage } from '../../hooks/useSendMessage'
import { TranslatorContent } from '../../components'
import { useMessage } from '../../stores/message.store'

export function DesktopTranslator() {
  const bot = useBotContext()
  const sendMessage = useSendMessage()
  const { content, streaming, isWordMode } = useMessage()

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

          await sendMessage(text)
        }}
      />

      <Box overflowAuto>
        {(streaming || content) && (
          <Box py2 px5 textBase leadingNormal>
            <TranslatorContent
              streaming={streaming}
              content={content}
              isWordMode={isWordMode}
              text={bot.text}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
