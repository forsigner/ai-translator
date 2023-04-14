import { useVisit } from './useVisit'
import { apiService, Refetcher, UpdateTeamDataInput } from '@ai-translator/api-sdk'

export function useUpdateTeam() {
  const { visit } = useVisit()

  async function updateTeam(input: UpdateTeamDataInput) {
    await apiService.updateTeam({
      where: { id: visit.activeTeamId },
      data: input,
    })
    await Refetcher.refetchMyTeams()
  }

  return { updateTeam }
}
