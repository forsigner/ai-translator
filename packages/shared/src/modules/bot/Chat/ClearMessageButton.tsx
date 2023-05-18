import { Button, RefreshOutline, Spinner, StopSolid } from 'bone-ui'
import { Box } from '@fower/react'
import { useRegenerateResponse } from '../hooks/useRegenerateResponse'
import { useChatStatus } from '../hooks/useChatStatus'
import { emitter } from '../../../common/emitter'
import { useMessages } from '../hooks/useMessages'
import { IconTrash } from '../../../icons'
import { TrashOutline } from '@bone-ui/icons'
import { useBotContext } from '@ai-translator/bot'

export const ClearMessageButton = () => {
  const bot = useBotContext()
  return (
    <Box toCenter>
      <Button
        leftIcon={<TrashOutline size={20}></TrashOutline>}
        roundedFull
        colorScheme="white"
        shadow
        borderNone
        gray500--i
        gray100--hover
        onClick={async () => {
          bot.clearMessages()
        }}
      >
        Clear history
      </Button>
    </Box>
  )
}
