import { Hooks, Refetcher } from '@boter/api-sdk'

export function useMyBots() {
  const result = Hooks.useMyBots()
  const { data: bots = [] } = result

  return {
    bots,
    ...result,
  }
}

export async function refetchMyBots() {
  await Refetcher.refetchMyBots()
}
