import { Box } from '@fower/react'
import { ChevronDownOutline, SearchOutline, XCircleSolid } from '@bone-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Menu,
  MenuItem,
  InputGroup,
  InputElement,
  Input,
} from 'bone-ui'
import { CARD_HEIGHT, HEADER_HEIGHT } from '../common/constants'
import { useState } from 'react'

export interface Option {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  value: string
  containerHeight?: number | string
  onChange(value: string): any
}

export function Select({
  value,
  onChange,
  options,
  containerHeight = CARD_HEIGHT - HEADER_HEIGHT - 10,
}: SelectProps) {
  const selected = options.find((item) => item.value == value)
  const [searchedValue, setSearchedValue] = useState('')

  let filteredOptions = options.filter((i) => {
    const reg = new RegExp(`${searchedValue}`, 'i')
    return (
      reg.test((i.value || '').toString().toLowerCase()) ||
      (typeof i.label === 'string' && reg.test(i.label.toLowerCase()))
    )
  })

  return (
    <Popover portal={false}>
      <PopoverTrigger>
        <Box text-14 px1 py2 rounded gray600 gray700--hover cursorPointer toCenterY columnGap-4>
          <Box gray900>{selected?.label}</Box>
          <ChevronDownOutline size={12} />
        </Box>
      </PopoverTrigger>
      <PopoverContent maxH={containerHeight} overflowYAuto className="langpt-select" w-180>
        {({ close }) => (
          <Box>
            <Box sticky top0 bgWhite>
              <InputGroup>
                <InputElement>
                  <SearchOutline size={20} gray500 />
                </InputElement>
                <Input
                  borderNone
                  placeholder="Search..."
                  variant="unstyled"
                  value={searchedValue}
                  onChange={(e) => setSearchedValue(e.target.value)}
                />
                {searchedValue && (
                  <InputElement>
                    <XCircleSolid
                      onClick={() => setSearchedValue('')}
                      gray400
                      gray500--hover
                      size={16}
                      cursorPointer
                    />
                  </InputElement>
                )}
              </InputGroup>
            </Box>

            <Menu>
              {filteredOptions.map((item) => (
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
          </Box>
        )}
      </PopoverContent>
    </Popover>
  )
}
