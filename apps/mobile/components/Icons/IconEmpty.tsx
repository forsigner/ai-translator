import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconEmpty: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg fill="none" viewBox="0 0 24 24" stroke="${color}" class="cloud w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}
