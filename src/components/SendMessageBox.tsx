import { Box } from '@fower/react'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { useMessage } from '@src/stores/message.store'
import { useState } from 'react'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const [value, setValue] = useState('')
  const { streaming } = useMessage()

  async function send() {
    if (!value) return
    await onSendMessage?.(value)
  }

  const disabled = streaming

  return (
    <Box flex-1 minH={[56, 80]} toCenterY>
      <TextareaAutosize
        placeholder="Enter to translate / Shift+Enter to new a line.
"
        className={css(
          'm0 borderNone w-100p outlineNone px3 py2 flex placeholderGray400 bgWhite textBase gray300--dark bgSlate100 bgTransparent--dark rounded',
        )}
        disabled={disabled}
        style={{ resize: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
    </Box>
  )
}
