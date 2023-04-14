import { Hooks } from '@ai-translator/api-sdk'

export function useTeam() {
  const { data: team, ...rest } = Hooks.useActiveTeam()

  return {
    ...rest,
    team,
  }
}
