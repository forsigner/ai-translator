import { Box } from '@fower/react'
import { Message, MessageJson } from '@ai-translator/bot'
import MessageItem from './MessageItem'

interface Props {
  messages: MessageJson[]
}

export const MessageList = ({ messages }: Props) => {
  return (
    <Box column rowGap-4>
      {messages.map((item, index) => (
        <MessageItem key={index} message={item} />
      ))}
    </Box>
  )
}
