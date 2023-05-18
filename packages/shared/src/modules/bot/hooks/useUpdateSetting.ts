import { apiService, Refetcher, UpdateSettingDataInput } from '@boter/api-sdk'
import { toast } from 'bone-ui'
import { useUser } from '../../../stores'
import { useModal } from '@ai-translator/easy-modal'

export function useUpdateSetting() {
  const { user } = useUser()
  const { hide } = useModal()
  async function updateSetting(data: UpdateSettingDataInput) {
    const toaster = toast.loading('Saving...')
    try {
      await apiService.updateSetting({
        where: { userId: user.id },
        data,
      })
      await Refetcher.refetchMySettings()
      toaster.update('Saved', { type: 'success' })
      hide()
    } catch (error) {}
  }

  return { updateSetting }
}
