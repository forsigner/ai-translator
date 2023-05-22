import { Box } from '@fower/react'
import { Button, toast } from 'bone-ui'
import { useText } from '../../stores/text.store'
import { SettingsStorage } from '../../services/SettingsStorage'
import { useChatContext } from '@ai-translator/chat'

export const UseFreeTokenErrorTips = () => {
  const { text } = useText()
  const chat = useChatContext()

  return (
    <Box toCenterY spaceX2>
      <Box>免费翻译功能，暂时无法使用，建议暂时启用 API Key 模式翻译</Box>
      <Button
        size="sm"
        onClick={async () => {
          const settings = await SettingsStorage.get()

          await SettingsStorage.set({
            ...settings,
            tokenProvider: 'ApiKey',
          })

          toast.success('已设置为 API Key 模式')
          await chat.sendMessage()
        }}
      >
        开启 API key 模式
      </Button>
    </Box>
  )
}
