import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { Header } from './Header'
import { CARD_HEIGHT, CARD_WIDTH } from '../common/constants'
import { forwardRef } from 'react'
import { Spinner } from 'bone-ui'

interface Props extends FowerHTMLProps<'div'> {}

export const TranslatorLoading = forwardRef<HTMLDivElement, Props>(function Translator(
  { ...rest },
  ref,
) {
  return (
    <Box ref={ref} w={CARD_WIDTH} h-120 toCenter {...rest}>
      <Spinner></Spinner>
    </Box>
  )
})
