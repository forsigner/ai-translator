import { isExtension } from '../common'
// import ISO6391 from 'iso-639-1'

export async function detectLanguageCode(text: string): Promise<string | null> {
  if (!isExtension) return null
  const browser = await import('webextension-polyfill')
  const res = await browser.i18n.detectLanguage(text)
  const code = res?.languages?.[0]?.language

  if (code) {
    return code
  }
  return null
}
