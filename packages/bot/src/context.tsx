import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { mutate } from 'stook'
import { Bot } from './domains/bot.domain'

export const botContext = createContext<Bot>({} as Bot)

export const BotProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = botContext
  const botRef = useRef<Bot>()
  const [inited, forceUpdate] = useState(false)

  useEffect(() => {
    Bot.create().then((bot) => {
      botRef.current = bot
      mutate('BOTER_BOT', botRef.current)
      forceUpdate(true)
    })
  }, [])

  if (!botRef.current || !inited) return null

  return <Provider value={botRef.current}>{children}</Provider>
}

export function useBotContext() {
  return useContext(botContext)
}
