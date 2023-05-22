import { useState } from 'react'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Box } from '@fower/react'
import { useBotContext, useMessages } from '@ai-translator/bot'
import { BotParams } from '../BotParams/BotParams'
import { Button } from 'bone-ui'
import { PaperAirplaneSolid } from '@bone-ui/icons'
import MessageContent from '../../../../components/MessageList/MessageContent'
import { IconChatLoading } from '../../../../components/IconChatLoading'

export const TranslatorPanel = () => {
  const [text, setText] = useState('')
  const bot = useBotContext()
  const { message, messages } = useMessages()
  const disabled = message.streaming

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
        <Box toLeft rounded2XL bgWhite mt4 shadow="rgba(17, 12, 46, 0.16) 0px 4px 40px -12px">
          <Box flex-1 borderRight-1 borderGray100>
            <TextareaAutosize
              minRows={2}
              placeholder={`Enter to translate, Shift+Enter to new a line`}
              className={css(
                'm0 borderNone w-100p outlineNone pl3 pr5 py3 placeholderGray400 text-14 gray300--dark rounded leadingNormal minH-500',
              )}
              disabled={disabled}
              style={{
                resize: 'none',
                cursor: disabled ? 'not-allowed' : 'text',
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              }}
              value={text}
              onChange={(e) => {
                const text = e.target.value
                setText(text)
                bot.updateText(text)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                  return
                }

                if (e.key === 'Enter') {
                  bot.sendMessage()
                  e.preventDefault()
                  return
                }
              }}
            />
          </Box>
          <Box flex-1 p4>
            {message.streaming && <IconChatLoading />}
            {!message.streaming && <MessageContent content={message.content} />}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}