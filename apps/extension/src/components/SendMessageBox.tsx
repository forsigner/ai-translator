import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessage } from '@src/stores/message.store'
import { useText } from '@src/stores/text.store'
import { getBot, useBotContext } from '@src/bot'
import { Box } from '@fower/react'
import { IconSpeaker } from './IconSpeaker'
import { playAudio } from '@src/services/playAudio'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const { text, setText } = useText()
  const { streaming } = useMessage()
  const bot = useBotContext()

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
          'm0  borderNone w-100p outlineNone pl3 pr5 py3 placeholderGray400 bgWhite textSM gray300--dark bgGray100 bgGray800--dark rounded leadingNormal',
        )}
        disabled={disabled}
        style={{ resize: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
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
        <IconSpeaker
          absolute
          top2
          right2
          cursorPointer
          fillGray600
          fillGray700--hover
          size={18}
          onClick={() => {
            const bot = getBot()
            playAudio(bot.text, bot.params.from)
          }}
        />
      )}
    </Box>
  )
}
