import { Box } from '@fower/react'
import { IconSponsor } from '@ai-translator/widgets'
import { Button } from '@bone-ui/button'
import { Avatar } from '@bone-ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@bone-ui/tooltip'
import { useSettingsVisible } from '../stores/settings.store'

export function Footer() {
  const { setVisible } = useSettingsVisible()
  return (
    <Box toCenterY toBetween>
      <Avatar name={'U'} bgGray300 size={24} cursorPointer />
      <Box toCenterY columnGap-4>
        <Tooltip>
          <TooltipTrigger>
            <Button
              p-6
              p-5--hover
              transitionAll
              colorScheme="white"
              size={28}
              icon={<IconSponsor fill="#bf3989" size={20} />}
              onClick={() => {
                setVisible(true)
              }}
            />
          </TooltipTrigger>
          <TooltipContent>Go to sponsor the maker</TooltipContent>
        </Tooltip>
      </Box>
    </Box>
  )
}
