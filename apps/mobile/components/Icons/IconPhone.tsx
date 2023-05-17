import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconPhone: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg viewBox="0 0 20 20" fill="${color}" class="device-mobile w-6 h-6"><path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}
