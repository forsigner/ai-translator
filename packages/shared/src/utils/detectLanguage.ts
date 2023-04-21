import browser from 'webextension-polyfill'
// import ISO6391 from 'iso-639-1'

export async function detectLanguageCode(text: string): Promise<string | null> {
  const res = await browser.i18n.detectLanguage(text)
  // console.log('res:', res, text)
  const code = res?.languages?.[0]?.language

  if (code) {
    // console.log(ISO6391.getName(code))
    return code
  }
  return null
}
