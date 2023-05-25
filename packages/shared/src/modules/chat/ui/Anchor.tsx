import { useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { useChatContext } from '@ai-translator/chat'

export const Anchor = () => {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const chat = useChatContext()

  useEffect(() => {
    const dom = anchorRef.current
    function scroll(dom: HTMLDivElement) {
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }

    if (dom) {
      setTimeout(() => {
        scroll(dom)
      }, 200)
    }

    chat.emitter.on('SCROLL_ANCHOR', () => {
      setTimeout(() => {
        scroll(dom!)
      }, 0)
    })
  }, [chat])

  return <Box as="div" ref={anchorRef} h4 bgTransparent />
}
