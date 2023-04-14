import { CogOutline } from '@bone-ui/icons'
import { Button } from '@bone-ui/button'
import { useSettingsVisible } from '@src/stores/settings.store'

export function SettingsButton() {
  const { setVisible } = useSettingsVisible()
  return (
    <Button
      p1
      p-3--hover
      transitionAll
      size={28}
      colorScheme="white"
      icon={<CogOutline gray400 size={16} />}
      onClick={async () => {
        setVisible(true)
      }}
    />
  )
}
