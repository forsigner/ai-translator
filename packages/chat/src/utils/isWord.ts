const chineseLangs = ['zh-cn', 'zh-tw', 'wyw', 'yue']

export function isChinesLang(text: string) {
  return chineseLangs.includes(text)
}

export function isWord(lang: string, text: string) {
  const Segmenter = (Intl as any).Segmenter

  if (!Segmenter) {
    const regex = new RegExp('^\\b[a-zA-Z]+\\b$')
    return regex.test(text)
  }

  const segmenter = new Segmenter(lang, { granularity: 'word' })
  const iterator = segmenter.segment(text)[Symbol.iterator]()
  const is = iterator.next().value?.segment === text
  return is
}
