import { useState } from 'react'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'bone-ui'
import { isJsonContent, useMessages } from '@ai-translator/chat'
import { IconCopy, useCopyToClipboard } from '@ai-translator/widgets'

export const CopyContent = () => {
  const { message } = useMessages()
  const { copy } = useCopyToClipboard()
  const [copyTips, setCopyTips] = useState('Copy')

  return (
    <Tooltip placement="top">
      <TooltipTrigger>
        <Button
          size={28}
          p1
          variant="ghost"
          colorScheme="gray600"
          icon={<IconCopy gray600 strokeWidth={1} />}
          onClick={() => {
            if (isJsonContent(message.content)) {
              copy(JSON.stringify(message.content, null, 2))
            } else {
              copy(message.content)
            }
            setCopyTips('Copied')
          }}
        />
      </TooltipTrigger>
      <TooltipContent>{copyTips}</TooltipContent>
    </Tooltip>
  )
}
