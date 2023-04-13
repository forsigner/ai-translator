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
    <TextareaAutosize
      minRows={2}
      placeholder={`Please input you text to translate \nEnter to translate, Shift+Enter to new a line`}
      className={css(
        'm0  borderNone w-100p outlineNone px3 py3 placeholderGray400 bgWhite textSM gray300--dark bgGray100 bgGray800--dark rounded leadingNormal',
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
  )
}
