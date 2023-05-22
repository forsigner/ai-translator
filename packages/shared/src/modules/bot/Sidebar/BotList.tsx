import { Box } from '@fower/react'
import { useBots } from '@ai-translator/bot'
import { BotItem } from './BotItem'

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
