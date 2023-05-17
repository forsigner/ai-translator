import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconInvite: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg viewBox="0 0 20 20" fill="${color}" class="user-add w-6 h-6"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}
