import { Box } from '@fower/react'
import { Placement } from '@floating-ui/react'
import { SearchOutline, XCircleSolid } from '@bone-ui/icons'
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
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LangItem from './LangItem'
import { usePanelWidth } from './usePanelWidth'

export interface Option {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  value: string
  placement: Placement
  onChange(value: string): any
}

export function Select({ value, placement, onChange, options }: SelectProps) {
  const { t } = useTranslation('common')
  const selected = options.find((item) => item.value == value)
  const [searchedValue, setSearchedValue] = useState('')

  const { panelWidth } = usePanelWidth()

  let filteredOptions = options.filter((i) => {
    const reg = new RegExp(`${searchedValue}`, 'i')
    return (
      reg.test((i.value || '').toString().toLowerCase()) ||
      (typeof i.label === 'string' && reg.test(i.label.toLowerCase()))
    )
  })

  return (
    <Popover portal={false} placement={placement}>
      <PopoverTrigger>
        <Box
          flex-1
          textLG
          h-100p
          gray600
          gray700--hover
          cursorPointer
          bgGray100--T20--hover
          toCenterY
          columnGap-4
          flexShrink-0
          toCenter
          transitionColors
        >
          <Box gray900>{selected?.label}</Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent w={panelWidth}>
        {({ close }) => (
          <Box>
            <Box sticky top0 bgWhite borderBottom borderGray100>
              <InputGroup>
                <InputElement>
                  <SearchOutline size={20} gray500 />
                </InputElement>
                <Input
                  borderNone
                  placeholder={t('search')}
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

            <Box grid gridTemplateColumns={[3, 3, 3, 5]} p4>
              {filteredOptions.map((item) => (
                <LangItem
                  key={item.label}
                  item={item}
                  onClick={() => {
                    onChange(item.value)
                    close()
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </PopoverContent>
    </Popover>
  )
}
