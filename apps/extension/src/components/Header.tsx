import { Box } from '@fower/react'
import { LangFromTo } from './LangFromTo/LangFromTo'
import { HEADER_HEIGHT } from '@src/common/constants'
import { IconLogo } from './IconLogo'
import { SettingsButton } from './SettingsButton'
import { BotSelect } from './BotSelect'
import { IconLogoLight } from './IconLogoLight'

interface Props {
  showSettings: boolean
}

export function Header({ showSettings }: Props) {
  return (
    <Box
      toCenterY
      toBetween
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
      px4
      h={HEADER_HEIGHT}
    >
      <Box toCenterY toBetween columnGap-4>
        <Box bgBrand500 square7 rounded2XL toCenter>
          <IconLogoLight
            size={24}
            white
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </Box>
        <BotSelect />
      </Box>
      <Box toCenterY columnGap-8>
        <LangFromTo />
        {showSettings && <SettingsButton></SettingsButton>}
      </Box>
    </Box>
  )
}
