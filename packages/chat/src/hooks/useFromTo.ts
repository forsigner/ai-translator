import { useParams } from './useParams'

export function useFromTo() {
  const { params, updateParams } = useParams()

  function setTo(to: string) {
    updateParams({
      ...params,
      to,
    })
  }

  function setFrom(from: string) {
    updateParams({
      ...params,
      from,
    })
  }

  function reverse() {
    const to = params.to
    const from = params.from
    updateParams({
      from: to,
      to: from,
    })
  }

  return {
    ...params,
    setTo,
    setFrom,
    reverse,
    setFromTo: updateParams,
  }
}
