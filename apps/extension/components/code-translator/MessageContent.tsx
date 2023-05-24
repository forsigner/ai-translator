import { Box } from '@fower/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
// import SyntaxHighlighter from 'react-syntax-highlighter'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
  message: any
}

export function MessageContent({ message }: Props) {
  const { extra } = message
  const isUser = ChatCompletionResponseMessageRoleEnum.User === message.role
  const lang: string = (isUser ? extra?.from : extra?.to) || ''

  return (
    <Box
      rounded2XL
      css={{
        pre: {
          background: 'transparent !important',
        },
        code: {
          background: 'transparent !important',
        },
      }}
    >
      <SyntaxHighlighter language={lang.toLowerCase()} style={oneLight}>
        {message.content}
      </SyntaxHighlighter>
    </Box>
  )
}
