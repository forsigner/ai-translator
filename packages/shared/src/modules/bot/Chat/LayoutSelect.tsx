import { Box } from '@fower/react'
import { LayoutType, useBot } from '@ai-translator/bot'
import { ChatSolid } from 'bone-ui'

function IconTwoColumn() {
  return (
    <Box columnGap-2 toCenter>
      <Box w-6 h-14 rounded-2 bgGray500></Box>
      <Box w-6 h-14 rounded-2 bgGray500></Box>
    </Box>
  )
}

export const LayoutSelect = () => {
  const { bot } = useBot()

  return (
    <Box toCenterY bgGray100 rounded-6 p-3 h-40>
      <Box
        rounded
        px3
        toCenterY
        columnGap-4
        h-100p
        cursorPointer
        bgWhite={!bot.isChatLayout}
        shadow={!bot.isChatLayout}
        bgTransparent={bot.isChatLayout}
        onClick={() => {
          bot.setLayout(LayoutType.TwoColumn)
        }}
      >
        <IconTwoColumn />
        <Box textSM>Panel mode</Box>
      </Box>
      <Box
        rounded
        px3
        cursorPointer
        toCenterY
        columnGap-2
        h-100p
        shadow={bot.isChatLayout}
        bgWhite={bot.isChatLayout}
        bgTransparent={!bot.isChatLayout}
        onClick={() => {
          bot.setLayout(LayoutType.Chat)
        }}
      >
        <ChatSolid size={20} gray500 />
        <Box textSM>Chat mode</Box>
      </Box>
    </Box>
  )
}
