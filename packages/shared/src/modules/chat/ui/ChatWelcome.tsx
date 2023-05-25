import { Box } from '@fower/react'

export const ChatWelcome = () => {
  return (
    <Box pt10 column>
      <Box text4XL fontBold mb4>
        Welcome to
        <Box as="span" brand500>
          {' '}
          AI Translator
        </Box>
      </Box>
      <Box textLG gray500>
        Translator powered by AI
      </Box>
    </Box>
  )
}
