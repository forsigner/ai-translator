import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { getChat, useChatContext, useMessages } from '@ai-translator/chat'
import { Box } from '@fower/react'
import { useText } from '../stores/text.store'
import { IconStop, IconSpeaker } from '@ai-translator/widgets'
import { useSpeaker } from '../hooks/useSpeaker'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const { text, setText } = useText()
  const { message } = useMessages()
  const chat = useChatContext()
  const { playing, speaker } = useSpeaker()

  async function send() {
    if (!text) return
    chat.updateText(text)
    await onSendMessage?.(text)
  }

  const disabled = message?.streaming

  return (
    <Box relative border borderGray100 rounded2XL borderTransparent--dark bgGray800--dark>
      <TextareaAutosize
        minRows={1}
        placeholder={`Enter to translate, Shift+Enter to new a line`}
        className={css(
          'm0 borderNone borderNone--focus--i w-100p outlineNone px3 py3 flex placeholderGray400 bgWhite textBase gray300--dark bgTransparent bgTransparent--dark shadowNone--focus',
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
          chat.updateText(text)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            return
          }

          if (e.key === 'Enter') {
            send()
            e.preventDefault()
            return
          }
        }}
      />

      {text && (
        <Box absolute top-14 right2 cursorPointer>
          {playing && (
            <IconStop
              size={18}
              gray600
              fillGray600
              fillGray700--hover
              onClick={() => {
                speaker.stop()
              }}
            />
          )}
          {!playing && (
            <IconSpeaker
              fillGray600
              fillGray700--hover
              size={18}
              onClick={() => {
                const bot = getChat()
                speaker.play(bot.text, bot.params.from!)
              }}
            />
          )}
        </Box>
      )}
    </Box>
  )
}
