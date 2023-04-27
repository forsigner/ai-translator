import { useMemo, FC, useCallback } from 'react'
import { forwardRef } from '@bone-ui/utils'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { mergeRefs } from '@bone-ui/utils'
import { usePopoverContext } from './context'
import { IconLogo } from '@langpt/shared'

interface ThumbnailProps extends Omit<FowerHTMLProps<'div'>, 'children'> {
  x: number
  y: number
}

export const Thumbnail: FC<ThumbnailProps> = forwardRef(function PopoverTrigger(
  { x, y, ...rest }: ThumbnailProps,
  propRef,
) {
  const state = usePopoverContext()

  const elementRef = useCallback(
    (element: HTMLElement) => {
      if (element && state.isOpen) {
        element.style.opacity = '0'
      }
    },
    [state.isOpen],
  )

  const ref = useMemo(
    () => mergeRefs([state.reference, propRef, elementRef]),
    [state.reference, propRef, elementRef],
  )

  const referenceProps: any = state.getReferenceProps(rest as any)

  return (
    <Box
      ref={ref}
      cursorPointer
      inlineFlex
      shadowXL
      border
      borderGray200
      roundedXL
      toCenter
      bgWhite
      bgWhite--dark
      absolute
      left={x + 20}
      top={y}
      style={{
        padding: 2,
        width: 24,
        height: 24,
        background: 'white',
      }}
      data-state={state.isOpen ? 'opened' : 'closed'}
      {...referenceProps}
      {...rest}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        referenceProps.onClick(e)
      }}
    >
      <IconLogo size={20} />
    </Box>
  )
})
