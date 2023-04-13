import { Box } from '@fower/react'
import { CogOutline } from '@bone-ui/icons'
import { IconSponsor } from './IconSponsor'
import { Button } from '@bone-ui/button'
import { Avatar } from '@bone-ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@bone-ui/tooltip'
import { useSettingsVisible } from '@src/stores/settings.store'

export function Footer() {
  const { setVisible } = useSettingsVisible()
  return (
    <Box toCenterY toBetween>
      <Avatar name={'U'} bgGray300 size={24} cursorPointer />
      <Box toCenterY columnGap-4>
        <Tooltip>
          <TooltipTrigger>
            <Button
              p1
              p-3--hover
              transitionAll
              size={28}
              colorScheme="white"
              icon={<CogOutline gray400 size={16} />}
              onClick={async () => {
                setVisible(true)

                await chrome.storage.sync.set({
                  settings: {
                    foo: 'bar',
                    now: Date.now(),
                  },
                })
              }}
            />
          </TooltipTrigger>
          <TooltipContent>Go to settings</TooltipContent>
        </Tooltip>

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
                console.log('========xxxxxxxxx..')
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
