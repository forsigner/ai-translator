import { Button, RefreshOutline, Spinner, StopSolid } from 'bone-ui'
import { Box } from '@fower/react'
import { useChatContext } from '@ai-translator/chat'
import { IconClear } from '@ai-translator/widgets'

export const ClearMessageButton = () => {
  const chat = useChatContext()
  return (
    <Box toCenter>
      <Button
        leftIcon={<IconClear size={20} />}
        roundedFull
        colorScheme="white"
        gray500--i
        gray100--hover
        onClick={async () => {
          chat.clearMessages()
        }}
      >
        Clear history
      </Button>
    </Box>
  )
}
