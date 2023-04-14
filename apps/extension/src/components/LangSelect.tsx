import { Select, RenderSearch } from '@bone-ui/select'
import { CARD_HEIGHT, HEADER_HEIGHT, LANG_SELECT_WIDTH, supportLanguages } from '@src/common/constants'

import { Box } from '@fower/react'
import { ChevronDownOutline, SearchOutline, XCircleSolid } from '@bone-ui/icons'
import { Input, InputElement, InputGroup } from '@bone-ui/input'

import { RadioRenderProps, DefaultRender } from '@bone-ui/radio'
import { MenuItem } from '@bone-ui/menu'

export const defaultRenderItem: DefaultRender = ({ checked, disabled, item }: RadioRenderProps) => {
  const props: any = {}
  if (item?.icon && typeof item?.icon === 'string') {
    props.icon = <Box as="img" src={item.icon} h-100p />
  }
  return (
    <MenuItem
      w-100p
      cursorNotAllowed={disabled}
      opacity-50={disabled}
      selected={checked}
      h={36}
      {...props}
    >
      {item?.label}
    </MenuItem>
  )
}

export const defaultRenderSearch: RenderSearch = ({ setValue, ...searchProps }) => (
  <Box borderBottom-1 borderBottomGray100 borderBottomGray800--dark>
    <InputGroup>
      <InputElement>
        <SearchOutline size={20} gray500 />
      </InputElement>
      <Input size="md" variant="unstyled" roundedNone borderLeft-0--i {...searchProps} />
      <InputElement>
        {searchProps.value && (
          <XCircleSolid
            onClick={() => setValue('')}
            gray400
            gray500--hover
            size={16}
            cursorPointer
          />
        )}
      </InputElement>
    </InputGroup>
  </Box>
)

interface Option {
  label: string
  value: string
}

interface Props {
  value: string
  onChange(value: string): any
  options?: Option[]
}

export function LangSelect({ value, onChange }: Props) {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  // const containerHeight = `calc(100vh - ${HEADER_HEIGHT + 10}px)`
  const containerHeight = CARD_HEIGHT - HEADER_HEIGHT + 10

  return (
    <Select
      icon={<ChevronDownOutline size={12} />}
      searchPlaceholder="Search"
      renderSearch={defaultRenderSearch}
      renderItem={defaultRenderItem}
      options={options}
      size="sm"
      textXS
      value={value}
      width={LANG_SELECT_WIDTH}
      useTriggerWidth={false}
      containerWidth={140}
      containerMaxHeight={containerHeight}
      onChange={(v: string) => onChange(v)}
    />
  )
}
