import { useSessionContext } from '../../hooks'
import { UserAvatarPopover } from '../../components/UserAvatarPopover'
import { ThirdPartyLogin } from '../../modules/home/ThirdPartyLogin'

export const LoginStatus = () => {
  const session = useSessionContext()
  if (session) {
    return <UserAvatarPopover />
  }
  return <ThirdPartyLogin />
}
