// import { getBot, useBotContext } from '@src/bot'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Box } from '@fower/react'
import { Button } from 'bone-ui'

export function TranslatorEditor() {
  // const bot = useBotContext()
  const disabled = false
  return (
    <Box relative column>
      <TextareaAutosize
        minRows={3}
        placeholder={`Enter to translate, Shift+Enter to new a line`}
        className={css(
          'm0 border-2 borderBlack w-100p outlineNone pl3 pr5 py3 placeholderGray400 text-14 gray300--dark bgGray100--T30 bgGray800--dark rounded2XL leadingNormal w-600',
        )}
        disabled={disabled}
        style={{ resize: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
        // value={text}
        onChange={(e) => {
          const text = e.target.value
          // setText(text)
          // bot.updateText(text)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            return
          }

          if (e.key === 'Enter') {
            // send()
            e.preventDefault()
            return
          }
        }}
      />
      <Box py4 toBetween>
        <Box>英文</Box>
        <Button colorScheme="black">Translate</Button>
      </Box>
    </Box>
  )
}
