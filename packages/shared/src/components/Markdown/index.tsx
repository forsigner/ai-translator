import { FC, PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkMath from 'remark-math'
import RemarkGfm from 'remark-gfm'
import { Box } from '@fower/react'
import './markdown.scss'

interface MarkdownProps {
  content: string
}

export const Markdown: FC<PropsWithChildren<MarkdownProps>> = ({ content }) => {
  return (
    <Box className="markdown-body" text-14 leadingNormal>
      <ReactMarkdown remarkPlugins={[RemarkMath, RemarkGfm]}>{content}</ReactMarkdown>
    </Box>
  )
}
