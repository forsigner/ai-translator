import { useState } from 'react'
import { IconChatLoading } from '@ai-translator/widgets'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Box } from '@fower/react'
import { useChat, useMessages } from '@ai-translator/chat'
import MessageContent from '../../../../components/MessageList/MessageContent'
import { CopyContent } from './CopyContent'

export const PanelEditor = () => {
  const [text, setText] = useState('')
  const { chat } = useChat()
  const { message } = useMessages()
  const disabled = message?.streaming

  return (
    <Box toLeft maxH-70vh overflowHidden>
      <Box flex-1 borderRight-1 borderGray100 overflowAuto>
        <TextareaAutosize
          minRows={2}
          placeholder={`Typing to translate`}
          className={css(
            'm0 borderNone w-100p outlineNone pl3 pr5 py3 placeholderGray400 gray300--dark rounded leadingNormal minH-500',
          )}
          disabled={disabled}
          style={{
            resize: 'none',
            cursor: disabled ? 'not-allowed' : 'text',
            fontSize: text.length > 200 ? 14 : 24,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          }}
          value={text}
          onChange={(e) => {
            const text = e.target.value
            setText(text)
            chat.updateText(text)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              return
            }

            if (e.key === 'Enter') {
              chat.sendMessage()
              e.preventDefault()
              return
            }
          }}
        />
      </Box>
      <Box flex-1 overflowAuto>
        <Box column p4 h-100p>
          <Box flex-1>
            {message?.streaming && <IconChatLoading />}
            {!message?.streaming && <MessageContent content={text ? message?.content : ''} />}
          </Box>
          {message && !chat.isWord && (
            <Box toRight>
              <CopyContent />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
