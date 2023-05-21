import { useState } from 'react'
import { Box } from '@fower/react'
import { CodeBlock } from './CodeBlock'
import { useBotContext, useMessages } from '@ai-translator/bot'
import { BotParams } from '../BotParams/BotParams'
import { Button } from 'bone-ui'
import { PaperAirplaneSolid } from '@bone-ui/icons'

export const CodeTranslatorLayout = () => {
  const bot = useBotContext()
  const { message, messages } = useMessages()
  const [code, setCode] = useState(`\n\n\n`)

  return (
    <Box flex-1 column pt5 pb0 w-100p>
      <Box column mx-auto w="100%">
        <Box toCenterY toBetween>
          <BotParams />
          <Button
            leftIcon={<PaperAirplaneSolid rotate-90 />}
            onClick={() => {
              bot.sendMessage()
            }}
          >
            Translate
          </Button>
        </Box>
        <Box toLeft shadow2XL rounded2XL border bgWhite mt4>
          <CodeBlock
            code={code}
            editable
            borderRight
            borderGray200
            onChange={(value) => {
              setCode(value)
              bot.updateText(value)
            }}
          />
          <CodeBlock code={message?.content || ''} editable={false} />
        </Box>
      </Box>
    </Box>
  )
}
