import { BotSlugs, Message, MessageJson, useBot } from '@ai-translator/bot'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import reactFastCompare from 'react-fast-compare'
import { Box } from '@fower/react'
import { memo } from 'react'
import { Markdown } from '../Markdown'
import { YoudaoDictWord } from './YoudaoDictWord'

interface Props {
  content: any
}

const MessageContent = ({ content }: Props) => {
  const { bot } = useBot()

  const lang = 'javascript'

  if (typeof content === 'object') {
    return <YoudaoDictWord data={content.data} />
  }

  if (bot.slug === BotSlugs.CodeTranslator) {
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

  return <Markdown content={content} />
}

export default memo(MessageContent, (prev, next) => {
  return reactFastCompare(prev.content, next.content)
})
