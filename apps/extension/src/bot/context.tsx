import { FC, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react'
import { Bot } from './bot.domain'
import { mutate } from 'stook'

export const botContext = createContext<Bot>({} as Bot)

export const BotProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = botContext
  const botRef = useRef(new Bot())

  useEffect(() => {
    mutate('BOTER_BOT', botRef.current)
  }, [])

  return <Provider value={botRef.current}>{children}</Provider>
}

export function useBotContext() {
  return useContext(botContext)
}
