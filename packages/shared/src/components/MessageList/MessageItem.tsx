import { Message, MessageJson } from '@ai-translator/chat'
import reactFastCompare from 'react-fast-compare'
import { Box } from '@fower/react'
import {
  Avatar,
  Button,
  ClipboardCopyOutline,
  RefreshOutline,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'bone-ui'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { memo, useState } from 'react'
import { useUser } from '../../stores'
import { Markdown } from '../Markdown'
import { IconChatLoading } from '../../icons/IconChatLoading'
import { IconChatgpt } from '../../icons/IconChatgpt'
import { useCopyToClipboard } from '../../hooks'
import RemoveMessage from './RemoveMessage'
import { useHover } from '../../hooks/useHover'
import { IconCopy } from '../../icons/IconCopy'
import MessageContent from './MessageContent'

interface Props {
  message: MessageJson
}

const MessageItem = ({ message }: Props) => {
  const isUser = ChatCompletionResponseMessageRoleEnum.User === message.role
  const { user } = useUser()
  const { copy } = useCopyToClipboard()
  const [copyTips, setCopyTips] = useState('Copy')
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  return (
    <Box toLeft ref={hoverRef}>
      <Box mr-10>
        {!isUser && <IconChatgpt />}
        {isUser && <Avatar size={24} roundedLG src={user?.avatar} name={user?.nickname || 'U'} />}
      </Box>

      <Box flex-1>
        <Box bgGray100={!isUser} bgBrand100={isUser} rounded2XL px4 py3 inlineFlex mb1>
          {message.streaming && <IconChatLoading />}
          {!message.streaming && <MessageContent content={message.content} />}
        </Box>

        <Box mb2 toCenterY toBetween h-30>
          {isHovered && (
            <Box toCenterY columnGap-8 transitionAll h-28>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <Button
                    size={28}
                    p1
                    variant="filled"
                    colorScheme="white"
                    icon={<IconCopy gray600 strokeWidth={1} />}
                    onClick={() => {
                      copy(message.content)
                      setCopyTips('Copied')
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>{copyTips}</TooltipContent>
              </Tooltip>

              {/* {!isUser && (
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button
                      size={28}
                      p1
                      variant="filled"
                      colorScheme="white"
                      icon={<RefreshOutline gray600 />}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Regenerate response</TooltipContent>
                </Tooltip>
              )} */}

              {!isUser && <RemoveMessage message={message} />}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(MessageItem, (prev, next) => {
  return reactFastCompare(prev.message, next.message)
})
