import { useState, useMemo, useCallback, useRef } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  useClick,
  useFocus,
  arrow,
} from '@floating-ui/react'

export interface PopoverOptions {
  /**
   * 初始化时是否打开
   */
  initialOpened?: boolean

  placement?: Placement

  offset?: number

  modal?: boolean

  isOpen?: boolean

  onOpenChange?: (isOpen: boolean) => void

  afterOpenChange?: (isOpen: boolean) => void
}

export function usePopover({
  initialOpened = false,
  placement = 'bottom',
  modal = true,
  offset: offsetSize = 8,
  isOpen: controlledOpen,
  onOpenChange: setControlledOpen,
  afterOpenChange,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpened)

  const [labelId, setLabelId] = useState<string | undefined>()

  const [descriptionId, setDescriptionId] = useState<string | undefined>()

  const arrowRef = useRef(null)

  const isOpen = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: (isOpen) => {
      setOpen(isOpen)
      afterOpenChange(isOpen)
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetSize),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  const context = data.context

  const click = useClick(context, {
    enabled: true,
  })

  const dismiss = useDismiss(context, {})

  const focus = useFocus(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([role, dismiss, click, focus])

  const open = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const close = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return useMemo(
    () => ({
      isOpen,
      setOpen,

      close,
      open,

      ...interactions,
      ...data,
      modal,

      labelId,
      setLabelId,

      descriptionId,
      setDescriptionId,

      arrowRef,
    }),
    [isOpen, setOpen, interactions, data, modal, labelId, descriptionId, open, close],
  )
}
