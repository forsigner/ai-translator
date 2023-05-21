import { css } from '@fower/core'
import { FowerHTMLProps } from '@fower/core'
import TextareaAutosize from 'react-textarea-autosize'
import { Box } from '@fower/react'
import { ArrowRightOutline, Button } from 'bone-ui'
import { useBotContext } from '@ai-translator/bot'
import { useText } from '../../stores/text.store'
import { SettingsPopover } from './SettingsPopover'
import { TranslatorLangSelector } from '../../components/TranslatorLangSelector'
import { forwardRef } from 'react'

interface Props extends FowerHTMLProps<'div'> {
  showSettings?: boolean
  onSendMessage(value: string): Promise<any>
}

export const TranslatorEditor = forwardRef<HTMLDivElement, Props>(function TranslatorEditor(
  { onSendMessage, ...rest },
  ref,
) {
  const bot = useBotContext()
  const { text, setText } = useText()
  const disabled = false

  async function send() {
    if (!text) return
    bot.updateText(text)
    console.log('text:', text)
    await onSendMessage?.(text)
  }

  return (
    <Box
      ref={ref}
      border-2
      borderBlack
      borderGray300--dark
      relative
      toBetween
      shadow2XL
      rounded-30
      toCenterY
      bgWhite
      {...rest}
    >
      <Box pl3>
        <TranslatorLangSelector containerHeight="50vh" />
      </Box>
      <Box flex-1>
        <TextareaAutosize
          placeholder={`Enter to translate, Shift+Enter to new a line`}
          className={css(
            'm0 w-100p outlineNone pl3 pr5 py4 placeholderGray400 text-16 placeholderGray700--dark bgTransparent leadingNormal white--dark leadingNone',
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
      </Box>

      <SettingsPopover />

      <Button
        colorScheme="black"
        roundedFull
        variant="ghost"
        icon={<ArrowRightOutline size={20} />}
        mr2
        onClick={() => {
          send()
        }}
      />
    </Box>
  )
})
