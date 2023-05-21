import { Box } from '@fower/react'
import { CodeFromTo } from './CodeFromTo'
import { useParams } from '@ai-translator/bot'

export function CodeTranslatorSelector() {
  const { params, updateParams } = useParams()
  return (
    <Box>
      <CodeFromTo
        value={[params.from || 'JavaScript', params.to || '']}
        onChange={([from, to]) => {
          updateParams({ ...params, from, to })
        }}
      />
    </Box>
  )
}
