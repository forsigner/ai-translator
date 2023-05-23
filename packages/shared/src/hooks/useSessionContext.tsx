import { FC, PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { LoginSuccessPayload } from '@ai-translator/api-sdk'
import { TokenStorage } from '@ai-translator/chat'

type useSessionProviderProps = {
  session: LoginSuccessPayload
}

export const sessionContext = createContext<LoginSuccessPayload>({} as LoginSuccessPayload)

export const SessionProvider: FC<PropsWithChildren<useSessionProviderProps>> = ({
  children,
  session,
}) => {
  const { Provider } = sessionContext

  useEffect(() => {
    if (session) {
      TokenStorage.set(session.token)
    }
  }, [session])

  return <Provider value={session}>{children}</Provider>
}

export function useSessionContext() {
  return useContext(sessionContext)
}
