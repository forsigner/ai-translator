import { useTranslation } from 'react-i18next'
import {
  Button,
  ChevronDownOutline,
  Menu,
  MenuItem,
  PencilOutline,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TrashOutline,
} from 'bone-ui'
import { useUser } from '../../../stores'
import { useClearMessages } from '../hooks/useClearMessages'
import { EasyModal } from '@ai-translator/easy-modal'
import { ModalClearMessages } from '../modals/ModalClearMessages'
import { IconClear } from '../../../icons/IconClear'
import { ModalBot } from '../modals/ModalBot'
import { useBot } from '@ai-translator/bot'

export const BotMenu = () => {
  const { user } = useUser()
  const { bot } = useBot()
  const { t } = useTranslation('common')
  const { clearMessages } = useClearMessages()

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          colorScheme="gray400"
          variant="ghost"
          size={24}
          black
          icon={<ChevronDownOutline />}
        />
      </PopoverTrigger>
      <PopoverContent w-200>
        {({ close }) => (
          <Menu>
            <MenuItem
              icon={<PencilOutline size={18} />}
              onClick={() => {
                EasyModal.show(ModalBot, bot)
                close()
              }}
            >
              Edit bot
            </MenuItem>
            <MenuItem
              icon={<IconClear gray500 size={20} />}
              onClick={() => {
                EasyModal.show(ModalClearMessages)
                close()
              }}
            >
              Clear messages
            </MenuItem>
            <MenuItem
              icon={<TrashOutline size={18} />}
              red500
              onClick={() => {
                close()
              }}
            >
              Delete bot
            </MenuItem>
          </Menu>
        )}
      </PopoverContent>
    </Popover>
  )
}
