import { apiService } from '@ai-translator/api-sdk'

export function useUpdateMessage() {
  async function updateMessage(id: number, content: string) {
    await apiService.updateMessage({
      where: { id },
      data: { content },
    })
  }

  return { updateMessage }
}
