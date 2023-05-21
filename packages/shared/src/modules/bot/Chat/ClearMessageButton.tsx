import { Button, RefreshOutline, Spinner, StopSolid } from 'bone-ui'
import { Box } from '@fower/react'
import { TrashOutline } from '@bone-ui/icons'
import { useBotContext } from '@ai-translator/bot'
import { IconClear } from '../../../icons/IconClear'

export const ClearMessageButton = () => {
  const bot = useBotContext()
  return (
    <Box toCenter>
      <Button
        leftIcon={<IconClear size={20} />}
        roundedFull
        colorScheme="white"
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
