import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'bone-ui'
import { useMessages } from '@ai-translator/chat'
import { IconCopy, useCopyToClipboard } from '@ai-translator/widgets'
import { useState } from 'react'

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
            copy(message.content)
            setCopyTips('Copied')
          }}
        />
      </TooltipTrigger>
      <TooltipContent>{copyTips}</TooltipContent>
    </Tooltip>
  )
}
