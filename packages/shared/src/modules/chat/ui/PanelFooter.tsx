import { Box } from '@fower/react'
import { Button, toast } from 'bone-ui'
import { IconChrome, IconIOS, IconWindows } from '@ai-translator/widgets'
import { useChat } from '@ai-translator/chat'

export const PanelFooter = () => {
  const { chat } = useChat()

  return (
    <Box pb4 px4 toCenterX columnGap-12>
      <Box>
        <Button
          as="a"
          colorScheme="white"
          roundedFull
          leftIcon={<IconChrome size={24} fillNone stroke-0 />}
          target="_blank"
          href="https://chrome.google.com/webstore/detail/ai-translator/pnmpobjegokhainajdpkndjldjcgflia?hl=zh-CN&authuser=0"
        >
          Chrome Extension
        </Button>
      </Box>

      <Box>
        <Button
          as="a"
          flex-1
          roundedFull
          colorScheme="white"
          leftIcon={<IconIOS fillBlack />}
          href="https://github.com/forsigner/own-chat/releases/download/own-chat-v0.0.8/Own.chat_0.1.0_x64.dmg"
        >
          Mac
        </Button>
      </Box>

      <Box>
        <Button
          as="a"
          colorScheme="white"
          flex-1
          roundedFull
          leftIcon={<IconWindows size={18} fillBlack />}
          href="https://github.com/forsigner/own-chat/releases/download/own-chat-v0.0.8/Own.chat_0.1.0_x64_en-US.msi"
        >
          Windows
        </Button>
      </Box>
    </Box>
  )
}
