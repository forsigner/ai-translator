import { Box } from '@fower/react'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'
import { useMessage } from '@src/pages/content/stores/message.store'

export default function Translator() {
  const { content, streaming } = useMessage()

  return (
    <Box w-400 minH-100 column bgWhite borderGray200 shadowXL border rounded>
      <Header />
      <Box p5 pt5>
        {streaming && (
          <Box toCenter>
            <IconChatLoading />
          </Box>
        )}

        {content && <Box>{content}</Box>}
      </Box>
    </Box>
  )
}
