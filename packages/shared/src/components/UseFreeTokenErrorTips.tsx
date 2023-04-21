import { Box } from '@fower/react'
import { useSendMessage } from '@src/hooks/useSendMessage'
import { storage } from '@src/services/storage'
import { useText } from '@src/stores/text.store'
import { Button, toast } from 'bone-ui'

export const UseFreeTokenErrorTips = () => {
  const { text } = useText()
  const sendMessage = useSendMessage()

  return (
    <Box toCenterY spaceX2>
      <Box>免费翻译功能，暂时无法使用，建议暂时启用 API Key 模式翻译</Box>
      <Button
        size="sm"
        onClick={async () => {
          const settings = await storage.getSettings()
          await storage.setSettings({
            ...settings,
            tokenProvider: 'ApiKey',
          })
          toast.success('已设置为 API Key 模式')
          sendMessage(text)
        }}
      >
        开启 API key 模式
      </Button>
    </Box>
  )
}
