import { useParams } from './useParams'

export function useFromTo() {
  const { params, updateParams } = useParams()

  function setTo(to: string) {
    updateParams(
      {
        ...params,
        to,
      },
      true,
    )
  }

  function setFrom(from: string) {
    updateParams(
      {
        ...params,
        from,
      },
      true,
    )
  }

  function reverse() {
    const to = params.to
    const from = params.from
    updateParams(
      {
        from: to,
        to: from,
      },
      true,
    )
  }

  return {
    ...params,
    setTo,
    setFrom,
    reverse,
    setFromTo: updateParams,
  }
}
