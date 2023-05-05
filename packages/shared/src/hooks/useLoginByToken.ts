import { toast } from 'bone-ui'
import { useRouter } from 'next/router'
import { useToken, useUser } from '../stores'
import { apiService } from '@ai-translator/api-sdk'

export function useLoginByToken() {
  const { setUser } = useUser()
  const { setToken } = useToken()
  const { push } = useRouter()
  async function login(token: string) {
    if (!token) return toast.warning('Please input your personal token')
    const payload = await apiService.loginByPersonalToken({ token })
    setToken(payload.token)
    setUser(payload.user)
    push('/')
  }
  return { login }
}
