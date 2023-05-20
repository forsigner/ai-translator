import { Box } from '@fower/react'
import { BotItem } from './BotItem'
import { bots } from '@ai-translator/bot'

export const BotList = () => {
  return (
    <Box column rowGap-1>
      {bots.map((item) => (
        <BotItem key={item.slug} bot={item} />
      ))}
    </Box>
  )
}
