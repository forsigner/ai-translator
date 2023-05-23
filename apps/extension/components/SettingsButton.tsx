import { Button } from '@bone-ui/button'
import { CogSolid } from 'bone-ui'
import { useSettingsVisible } from '@ai-translator/widgets'

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
