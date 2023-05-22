import { Box } from '@fower/react'
import { ChevronDownOutline } from '@bone-ui/icons'
import { Popover, PopoverTrigger, PopoverContent, Menu, MenuItem } from 'bone-ui'
import { CARD_HEIGHT, HEADER_HEIGHT } from '../common'
import { botList, useChat } from '@ai-translator/chat'

export function BotSelect() {
  const containerHeight = CARD_HEIGHT - HEADER_HEIGHT - 10
  const { chat } = useChat()
  return (
    <Popover portal={false}>
      <PopoverTrigger>
        <Box text-14 px3 py2 rounded gray600 cursorPointer toCenterY columnGap-4>
          <Box>{chat.name}</Box>
          <ChevronDownOutline size={12} />
        </Box>
      </PopoverTrigger>
      <PopoverContent h={containerHeight} overflowAuto>
        {({ close }) => (
          <Menu>
            {botList.map((item) => (
              <MenuItem
                text-14
                key={item.slug}
                onClick={(e) => {
                  e.stopPropagation()
                  chat.selectBot(item)
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
