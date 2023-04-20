import { Box } from '@fower/react'
import { ChevronDownOutline } from '@bone-ui/icons'
import { Popover, PopoverTrigger, PopoverContent, Menu, MenuItem } from 'bone-ui'
import { CARD_HEIGHT, HEADER_HEIGHT, bots } from '@src/common/constants'
import { useBot } from '@src/bot'

export function BotSelect() {
  const containerHeight = CARD_HEIGHT - HEADER_HEIGHT - 10
  const { bot } = useBot()
  return (
    <Popover portal={false}>
      <PopoverTrigger>
        <Box text-14 px3 py2 rounded gray600 cursorPointer toCenterY columnGap-4>
          <Box>{bot.name}</Box>
          <ChevronDownOutline size={12} />
        </Box>
      </PopoverTrigger>
      <PopoverContent h={containerHeight} overflowAuto>
        {({ close }) => (
          <Menu>
            {bots.map((item) => (
              <MenuItem
                text-14
                key={item.slug}
                onClick={(e) => {
                  e.stopPropagation()
                  bot.selectBot(item)
                  close()
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </PopoverContent>
    </Popover>
  )
}
