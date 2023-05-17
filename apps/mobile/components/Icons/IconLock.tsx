import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconLock: FC<Props> = ({ color = '#000', size = 20 }) => {
  const xml = `
<svg viewBox="0 0 20 20" fill="${color}" class="lock-closed w-6 h-6"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
`
  return <SvgXml xml={xml} width={size} height={size} />
}
