import { Box } from '@fower/react'
import { BotItem } from './BotItem'
import { useBots } from '@ai-translator/bot'

export const BotList = () => {
  const { bots } = useBots()

  return (
    <Box column rowGap-1>
      {bots.map((item) => (
        <BotItem key={item.slug} item={item} />
      ))}
    </Box>
  )
}
