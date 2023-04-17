import { createParser } from 'eventsource-parser'
import { Box } from '@fower/react'
import { Button } from 'bone-ui'

async function send() {
  const url = 'http://localhost:8001/api/free/completions'

  const TIME_OUT_MS = 60 * 1000
  const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS)

  const controller = new AbortController()
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: '珠海的邮编是什么？',
    }),
    signal: controller.signal,
  })

  clearTimeout(reqTimeoutId)

  if (!res.ok || !res.body) {
    // TODO: need to improve
    const errorRes = await res.json()
    console.log('errorRes:', errorRes)

    return
  }

  const parser = createParser((event) => {
    if (event.type !== 'event') return

    try {
      const json = JSON.parse(event.data)
      console.log('json:', json)
    } catch (e) {
      console.log('e:', e)

      //
    }
  })

  const reader = res.body.getReader()

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const str = new TextDecoder().decode(value)
      parser.feed(str)
    }
  } finally {
    reader.releaseLock()
  }
}

export function SendMessageBox() {
  return (
    <Box toCenter column mb-80 minH-70vh>
      <Button
        onClick={async () => {
          await send()
        }}
      >
        Send
      </Button>
    </Box>
  )
}
