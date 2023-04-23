import { useSession } from '../../hooks'
import { UserAvatarPopover } from '../../components/UserAvatarPopover'
import { ThirdPartyLogin } from '../../modules/home/ThirdPartyLogin'

export const LoginStatus = () => {
  const session = useSession()
  if (session) {
    return <UserAvatarPopover />
  }
  return <ThirdPartyLogin />
}
