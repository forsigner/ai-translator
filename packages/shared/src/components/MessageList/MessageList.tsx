import { Box } from '@fower/react'
import { Message } from '@ai-translator/bot'
import MessageItem from './MessageItem'

interface Props {
  messages: Message[]
}

export const MessageList = ({ messages }: Props) => {
  return (
    <Box column rowGap-10>
      {messages.map((item, index) => (
        <MessageItem key={index} message={item} />
      ))}
    </Box>
  )
}
