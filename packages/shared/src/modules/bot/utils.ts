import { isProd } from '../../common'

export function getOpenaiProxy() {
  if (isProd) return 'https://www.boter.app'
  return 'http://localhost:9000'
}
