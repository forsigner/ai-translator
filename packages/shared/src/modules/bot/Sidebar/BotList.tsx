import { Box } from '@fower/react'
import { BotItem } from './BotItem'
import { useMyBots } from '../hooks/useMyBots'

export const BotList = () => {
  const { loading, data: bots = [] } = useMyBots()

  if (loading) return null

  if (!bots.length) {
    return (
      <Box px6 gray400>
        <Box bgSlate100 p3 roundedLG>
          You have no running bot applications
        </Box>
      </Box>
    )
  }

  return (
    <Box column rowGap-1>
      {bots.map((item) => (
        <BotItem key={item.id} bot={item} />
      ))}
    </Box>
  )
}
