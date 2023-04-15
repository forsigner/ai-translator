import { Box } from '@fower/react'
import { IconChatLoading } from './IconChatLoading'
import { Markdown } from './Markdown'
import { ReactNode } from 'react'

interface Props {
  streaming: boolean
  content: ReactNode
}

export const TranslatorContent = ({ streaming, content }: Props) => {
  if (streaming) {
    return (
      <Box>
        <IconChatLoading />
      </Box>
    )
  }

  if (typeof content === 'string') {
    return <Markdown content={content} />
  }
  return <>{content}</>
}
