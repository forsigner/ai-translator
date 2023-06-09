import { Popover, PopoverContent, PopoverTrigger } from '@bone-ui/popover'
import { CogOutline } from '@bone-ui/icons'
import { useTranslation } from 'react-i18next'
import { Button } from 'bone-ui'
import { Settings } from '@ai-translator/widgets'

export const SettingsPopover = () => {
  const { t } = useTranslation('common')
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          colorScheme="gray800"
          roundedFull
          size="sm"
          variant="light"
          bgGray100
          bgGray200--hover
          icon={<CogOutline size={20} gray400 rotate-180 />}
          mr2
        />
      </PopoverTrigger>
      <PopoverContent>
        <Settings title="AI Translator" />
      </PopoverContent>
    </Popover>
  )
}
