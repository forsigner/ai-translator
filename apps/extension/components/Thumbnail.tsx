import { useMemo, FC, useCallback } from 'react'
import { forwardRef } from '@bone-ui/utils'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { mergeRefs } from '@bone-ui/utils'
import { usePopoverContext } from './context'
import { IconLogo } from '@ai-translator/widgets'

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
    () => mergeRefs([state.refs.setReference, propRef, elementRef]),
    [state.refs.setReference, propRef, elementRef],
  )

  const referenceProps: any = state.getReferenceProps(rest as any)

  return (
    <Box
      ref={ref}
      style={{
        position: 'absolute',
        left: x + 20,
        top: y,
        borderRadius: 8,
        border: '1px solid #e8e8e8',
        cursor: 'pointer',
        display: 'inline-block',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
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
