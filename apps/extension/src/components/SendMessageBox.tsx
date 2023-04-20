import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessage } from '@src/stores/message.store'
import { useText } from '@src/stores/text.store'
import { useBotContext } from '@src/bot'

interface Props {
  onSendMessage(value: string): Promise<any>
}

// translate from English to 简体中文: I love you

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
    <TextareaAutosize
      minRows={2}
      placeholder={`Enter to translate, Shift+Enter to new a line`}
      className={css(
        'm0  borderNone w-100p outlineNone px3 py3 placeholderGray400 bgWhite textSM gray300--dark bgGray100 bgGray800--dark rounded leadingNormal',
      )}
      disabled={disabled}
      style={{ resize: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
      value={text}
      onChange={(e) => setText(e.target.value)}
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
  )
}
