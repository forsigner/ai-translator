import { Box } from '@fower/react'
import { css } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Button, PaperAirplaneSolid } from 'bone-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBotContext } from '@ai-translator/bot'
// import { useChatStatus } from '../modules/bot/hooks/useChatStatus'

interface Props {
  onSendMessage(value: string): Promise<any>
}

export const SendMessageBox = ({ onSendMessage }: Props) => {
  const bot = useBotContext()
  const [value, setValue] = useState('')
  const { t } = useTranslation('common')
  // const { isStreaming, isNormal, isFinished, isFetching } = useChatStatus()

  async function send() {
    if (!value) return
    setValue('')
    await onSendMessage?.(value)
  }

  const disabled = false

  return (
    <Box
      toCenterY
      flex-1
      shadowXL
      border
      borderGray100
      rounded2XL
      borderTransparent--dark
      bgGray800--dark
    >
      <Box flex-1 minH={[56, 80]} toCenterY>
        <TextareaAutosize
          placeholder={t('input-placeholder')}
          className={css(
            'm0 borderNone w-100p outlineNone px3 py3 flex placeholderGray400 bgWhite textBase gray300--dark bgTransparent bgTransparent--dark',
          )}
          disabled={disabled}
          style={{ resize: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
          value={value}
          onChange={(e) => {
            const text = e.target.value
            bot.updateText(text)
            setValue(text)
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
      </Box>
      <Button
        colorScheme="gray400"
        variant="ghost"
        disabled={!value}
        icon={<PaperAirplaneSolid rotate-90 />}
        mr2
        onClick={() => send()}
      />
    </Box>
  )
}
