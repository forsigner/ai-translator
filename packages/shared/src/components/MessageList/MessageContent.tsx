import { BotSlugs, isDictContent, isJsonContent, useChat } from '@ai-translator/chat'
import { YoudaoDictWord } from '@ai-translator/widgets'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import reactFastCompare from 'react-fast-compare'
import { Box } from '@fower/react'
import { memo } from 'react'

interface Props {
  content: any
}

const MessageContent = ({ content }: Props) => {
  const { chat } = useChat()

  const lang = 'javascript'

  if (isDictContent(content)) {
    return <YoudaoDictWord data={content.data} />
  }

  // if (isJsonContent(content)) {
  //   return <Box as="pre">{JSON.stringify(content, null, 2)}</Box>

  // }

  if (chat.slug === BotSlugs.CodeTranslator || isJsonContent(content)) {
    return (
      <Box
        rounded2XL
        overflowHidden
        css={{
          pre: {
            background: 'transparent !important',
            m: 0,
            px: '2px !important',
            py: '2px !important',
          },
          code: {
            background: 'transparent !important',
          },
        }}
      >
        <SyntaxHighlighter language={lang.toLowerCase()} style={oneLight}>
          {isJsonContent(content) ? JSON.stringify(content, null, 2) : content}
        </SyntaxHighlighter>
      </Box>
    )
  }

  return (
    <Box
      as="pre"
      style={{
        margin: 0,
        fontSize: chat.text.length > 100 ? 14 : 24,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      {content}
    </Box>
  )
}

export default memo(MessageContent, (prev, next) => {
  return reactFastCompare(prev.content, next.content)
})
