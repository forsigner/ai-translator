
import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconMark: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg viewBox="0 0 20 20" fill="${color}" class="bookmark w-6 h-6"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}
