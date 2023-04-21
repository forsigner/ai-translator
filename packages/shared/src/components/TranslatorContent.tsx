import { Box } from '@fower/react'
import { IconChatLoading } from './IconChatLoading'
import { Markdown } from './Markdown'
import { ReactNode } from 'react'

interface Props {
  streaming: boolean
  content: ReactNode
  isWordMode: boolean
}

function parseWordContent(content: string) {
  return content.split('\n')
}

export const TranslatorContent = ({ streaming, content, isWordMode }: Props) => {
  if (streaming) {
    return (
      <Box>
        <IconChatLoading />
      </Box>
    )
  }

  if (typeof content === 'string') {
    if (isWordMode) {
      const arr = parseWordContent(content)
      return (
        <Box leadingLoose>
          {arr.map((item, index) => (
            <Box key={index} fontBold={index == 0}>
              {item}
            </Box>
          ))}
        </Box>
      )
    }
    return <Markdown content={content} />
  }
  return <>{content}</>
}
