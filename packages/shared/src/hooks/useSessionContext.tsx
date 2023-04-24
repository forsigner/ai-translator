import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { LoginSuccessPayload } from '@langpt/api-sdk'

type useSessionProviderProps = {
  session: LoginSuccessPayload
}

export const sessionContext = createContext<LoginSuccessPayload>({} as LoginSuccessPayload)

export const SessionProvider: FC<PropsWithChildren<useSessionProviderProps>> = ({
  children,
  session,
}) => {
  const { Provider } = sessionContext
  return <Provider value={session}>{children}</Provider>
}

export function useSessionContext() {
  return useContext(sessionContext)
}
