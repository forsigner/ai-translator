import { FC, useMemo } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { styled } from '@fower/styled'
import { forwardRef } from '@bone-ui/utils'
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import { mergeRefs } from '@bone-ui/utils'
import { FowerHTMLProps } from '@fower/core'
import { Box } from '@fower/react'
import { usePopoverContext } from './context'
import { Translator } from '@ai-translator/shared'

export interface PopoverContentProps extends Omit<FowerHTMLProps<'div'>, 'children'> {
  x?: number
}

const MotionBox = styled(motion(Box))

export const TranslatorContainer: FC<PopoverContentProps> = forwardRef(function Content(
  props: PopoverContentProps,
  propRef,
) {
  const { ...rest } = props
  const state = usePopoverContext()

  const containerX = useMotionValue(0)
  const containerY = useMotionValue(0)

  const ref = useMemo(() => mergeRefs([state.floating, propRef]), [state.floating, propRef])

  return (
    <FloatingPortal>
      {state.isOpen && (
        <FloatingFocusManager context={state.context} modal={state.modal}>
          <MotionBox
            ref={ref}
            black
            className="ai-translator-content"
            shadow
            shadow--dark="0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)"
            roundedLG
            outlineNone
            white--dark
            bgWhite
            overflowHidden
            bgGray800--dark
            border
            borderGray200
            borderTransparent--dark
            zIndex-10000
            style={{
              x: containerX,
              y: containerY,
              position: state.strategy,
              top: state.y ?? 0,
              left: state.x ?? 0,
              ...rest.style,
            }}
            aria-labelledby={state.labelId}
            aria-describedby={state.descriptionId}
            {...state.getFloatingProps(rest as any)}
          >
            <Translator containerX={containerX} containerY={containerY} />
          </MotionBox>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
})
