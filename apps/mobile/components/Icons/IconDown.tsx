import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconDown: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg viewBox="0 0 1394 1024" fill="${color}" class="chevron-double-down w-6 h-6"><path fill-rule="evenodd" d="M808.665066 968.123525a139.174837 139.174837 0 0 1-222.989114 0L28.061551 224.448838A140.525626 140.525626 0 0 1 0 140.133462C0 62.746326 62.484883 0 139.567002 0h1115.228801c30.283817 0 59.739731 9.891261 83.944998 28.192273 61.569833 46.558646 73.901229 134.425289 27.538666 196.256565L808.665066 968.123525z" clip-rule="evenodd"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}
