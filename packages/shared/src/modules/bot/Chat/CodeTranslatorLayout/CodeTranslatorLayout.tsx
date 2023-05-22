import { useState } from 'react'
import { Box } from '@fower/react'
import { CodeBlock } from './CodeBlock'
import { useChatContext, useMessages } from '@ai-translator/chat'
import { BotParams } from '../BotParams/BotParams'
import { Button } from 'bone-ui'
import { PaperAirplaneSolid } from '@bone-ui/icons'

export const CodeTranslatorLayout = () => {
  const chat = useChatContext()
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
              chat.sendMessage()
            }}
          >
            Translate
          </Button>
        </Box>
        <Box toLeft shadow="rgba(17, 12, 46, 0.16) 0px 4px 50px -12px" rounded2XL bgWhite mt4>
          <CodeBlock
            code={code}
            editable
            borderRight
            borderGray200
            onChange={(value) => {
              setCode(value)
              chat.updateText(value)
            }}
          />
          <CodeBlock code={message?.content || ''} editable={false} />
        </Box>
      </Box>
    </Box>
  )
}
