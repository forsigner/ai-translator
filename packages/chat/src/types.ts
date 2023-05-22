export type YoudaoDictResult = {
  tSpeakUrl: string
  basic: {
    wfs: Array<{
      wf: { name: string; value: string }
    }>

    explains: string[]
    phonetic: string
    exam_type: string[]
    'uk-speech': string
    'us-speech': string
    'uk-phonetic': string
    'us-phonetic': string
  }
  web: Array<{
    value: string[]
    key: string
  }>
  requestId: string
  query: string
  translation: string[]
  mTerminalDict: {
    url: string
  }
  errorCode: string
  dict: {
    url: string
  }
  webdict: {
    url: string
  }
  l: string
  isWord: boolean
  speakUrl: string
}
