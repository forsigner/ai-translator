export function isWord(text: string = '') {
  if (!/^[a-z]+$/.test(text)) return false
  const Segmenter = Intl.Segmenter

  if (!Segmenter) {
    const regex = new RegExp('^\\b[a-zA-Z]+\\b$')
    return regex.test(text)
  }

  const segmenter = new Segmenter('en', { granularity: 'word' })
  const iterator = segmenter.segment(text)[Symbol.iterator]()
  const is = iterator.next().value?.segment === text
  return is
}
