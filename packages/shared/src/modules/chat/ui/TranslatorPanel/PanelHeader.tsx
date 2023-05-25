import { SwitchHorizontalOutline } from '@bone-ui/icons'
import { Box } from '@fower/react'
import { Option, Select } from './Select'
import { Button } from 'bone-ui'
import { useChat, Language, BotSlugs, useFromTo } from '@ai-translator/chat'

export function PanelHeader() {
  const { chat } = useChat()
  const languages = Language.getLanguages(chat.slug === BotSlugs.CodeTranslator ? 'CODE' : 'TEXT')
  const options: Option[] = languages.map(([value, label]) => ({ label, value }))

  const { from, to, setFrom, setTo, reverse } = useFromTo()

  return (
    <Box toCenterY h-48 borderBottom-1 borderGray200>
      <Select placement="top-start" options={options} value={from} onChange={setFrom} />
      <Button
        roundedFull
        size="sm"
        variant="ghost"
        colorScheme="gray500"
        icon={
          <SwitchHorizontalOutline
            onClick={() => {
              reverse()
            }}
          />
        }
      ></Button>
      <Select placement="top-end" options={options} value={to} onChange={setTo} />
    </Box>
  )
}
