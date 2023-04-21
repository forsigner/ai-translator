import { Button } from '@bone-ui/button'
import { useSettingsVisible } from '@src/stores/settings.store'
import { CogSolid } from 'bone-ui'

export function SettingsButton() {
  const { setVisible } = useSettingsVisible()
  return (
    <Button
      p1
      transitionAll
      size={28}
      variant="ghost"
      colorScheme="gray800"
      bgGray100--hover
      icon={<CogSolid gray400 size={16} />}
      onClick={async () => {
        setVisible(true)
      }}
    />
  )
}
