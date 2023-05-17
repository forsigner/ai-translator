
import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface Props extends ViewProps {
  size?: number
  color?: string
}

export const IconStats: FC<Props> = ({ size = 20, color = '#000' }) => {
  const xml = `
<svg viewBox="0 0 1024 1024" ><path d="M599.978667 509.013333h271.36a64.426667 64.426667 0 0 1 63.061333 76.245334 426.666667 426.666667 0 0 1-753.664 189.525333 426.666667 426.666667 0 0 1 257.365333-685.482667 64.512 64.512 0 0 1 76.544 63.061334v271.36a85.333333 85.333333 0 0 0 85.333334 85.333333z" fill="#FFB531" p-id="2350"></path><path d="M840.576 183.082667a343.978667 343.978667 0 0 1 92.501333 166.954666 64 64 0 0 1-62.848 77.525334H681.386667a85.333333 85.333333 0 0 1-85.333334-85.333334V153.472a64 64 0 0 1 77.568-62.848A343.978667 343.978667 0 0 1 840.533333 183.04z" fill="#030835" p-id="2351"></path></svg>
`

  return <SvgXml xml={xml} width={size} height={size} />
}

