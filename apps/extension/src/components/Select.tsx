import { Box } from '@fower/react'
import { ChevronDownOutline } from '@bone-ui/icons'
import { Popover, PopoverTrigger, PopoverContent, Menu, MenuItem } from 'bone-ui'
import { CARD_HEIGHT, HEADER_HEIGHT } from '@src/common/constants'

export interface Option {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange(value: string): any
}

export function Select({ value, onChange, options }: SelectProps) {
  const containerHeight = CARD_HEIGHT - HEADER_HEIGHT - 10
  const selected = options.find((item) => item.value == value)
  return (
    <Popover portal={false}>
      <PopoverTrigger>
        <Box text-14 px1 py2 rounded gray600 gray700--hover cursorPointer toCenterY columnGap-4>
          <Box>{selected?.label}</Box>
          <ChevronDownOutline size={12} />
        </Box>
      </PopoverTrigger>
      <PopoverContent h={containerHeight} overflowAuto>
        {({ close }) => (
          <Menu>
            {options.map((item) => (
              <MenuItem
                text-14
                key={item.value}
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(item.value)
                  close()
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </PopoverContent>
    </Popover>
  )
}
