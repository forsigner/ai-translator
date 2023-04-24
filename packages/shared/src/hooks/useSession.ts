import { LoginSuccessPayload } from '@langpt/api-sdk'
import { useEffect } from 'react'
import { useStore } from 'stook'

type State = {
  loading: boolean
  session: LoginSuccessPayload | null
}

const key = 'LANGPT_SESSION'

export function useSession() {
  const [{ loading, session }, setSession] = useStore<State>(key, {
    loading: true,
    session: null,
  })

  async function loadSession() {
    try {
      const session = await fetchSession()
      if (session) {
        setSession((s) => {
          s.loading = false
          s.session = session
        })
      } else {
        setSession((s) => {
          s.loading = false
        })
      }
    } catch {
      setSession((s) => {
        s.loading = false
      })
    }
  }

  useEffect(() => {
    loadSession()
  }, [])

  return {
    loading,
    session,
  }
}

export async function fetchSession() {
  const url = `${process.env.WEB_HOST}/api/session`
  try {
    const res = await fetch(url)
    const session: LoginSuccessPayload = await res.json()

    if (session?.token) return session
    return null
  } catch {
    return null
  }
}
