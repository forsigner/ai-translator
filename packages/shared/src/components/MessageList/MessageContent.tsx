import { BotSlugs, Message, MessageJson, useChat } from '@ai-translator/chat'
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

  if (typeof content === 'object') {
    return <YoudaoDictWord data={content.data} />
  }

  if (chat.slug === BotSlugs.CodeTranslator) {
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
          {content}
        </SyntaxHighlighter>
      </Box>
    )
  }

  return <>{content}</>
}

export default memo(MessageContent, (prev, next) => {
  return reactFastCompare(prev.content, next.content)
})
