import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { getBot, useBotContext } from '@ai-translator/bot'
import { Box } from '@fower/react'
import { useText } from '../stores/text.store'
import { useMessage } from '../stores/message.store'
import { IconStop } from '../icons/IconStop'
import { IconSpeaker } from '../icons/IconSpeaker'
import { useSpeaker } from '../hooks/useSpeaker'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const { text, setText } = useText()
  const { streaming } = useMessage()
  const bot = useBotContext()
  const { playing, speaker } = useSpeaker()

  async function send() {
    if (!text) return
    bot.updateText(text)
    await onSendMessage?.(text)
  }

  const disabled = streaming

  return (
    <Box relative>
      <TextareaAutosize
        minRows={2}
        placeholder={`Enter to translate, Shift+Enter to new a line`}
        className={css(
          'm0  borderNone w-100p outlineNone pl3 pr5 py3 placeholderGray400 text-14 gray300--dark bgGray100--T30 bgGray800--dark rounded leadingNormal',
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
            send()
            e.preventDefault()
            return
          }
        }}
      />

      {text && (
        <Box absolute top2 right2 cursorPointer>
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
                const bot = getBot()
                speaker.play(bot.text, bot.params.from!)
              }}
            />
          )}
        </Box>
      )}
    </Box>
  )
}
