import { FC, PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { LoginSuccessPayload } from '@langpt/api-sdk'
import { storage } from '../services/storage'

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
    if (session) storage.setToken(session.token)
  }, [session])

  return <Provider value={session}>{children}</Provider>
}

export function useSessionContext() {
  return useContext(sessionContext)
}
