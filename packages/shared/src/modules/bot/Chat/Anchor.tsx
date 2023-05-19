import { useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { useBotContext } from '@ai-translator/bot'

export const Anchor = () => {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const bot = useBotContext()

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

    bot.emitter.on('SCROLL_ANCHOR', () => {
      setTimeout(() => {
        scroll(dom!)
      }, 0)
    })
  }, [])

  return <Box as="div" ref={anchorRef} h4 bgTransparent />
}
