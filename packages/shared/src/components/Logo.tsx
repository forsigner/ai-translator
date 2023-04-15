import { Box } from '@fower/react'
import { IconLogo } from '../icons/IconLogo'
import { StyledLink } from './StyledLink'

interface Props {
  size?: number
  to?: string
  showText?: boolean
}

export const Logo = ({ showText = true, to, size = 32 }: Props) => {
  const content = (
    <>
      <Box bgBrand500 square8 roundedFull>
        <IconLogo size={size} white />
      </Box>
      {showText && (
        <Box>
          <Box textXL black fontBold>
            AI Translator
          </Box>
        </Box>
      )}
    </>
  )
  if (to) {
    return (
      <StyledLink href={to} toCenterY gray800--hover black spaceX1>
        {content}
      </StyledLink>
    )
  }
  return (
    <Box toCenterY gray800--hover black spaceX1>
      {content}
    </Box>
  )
}
