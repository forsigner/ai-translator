export function isWord(text: string = '') {
  if (!/^[a-z]+$/.test(text)) return false
  const Segmenter = Intl.Segmenter
  if (!Segmenter) return false
  const segmenter = new Segmenter('en', { granularity: 'word' })
  const iterator = segmenter.segment(text)[Symbol.iterator]()
  const is = iterator.next().value?.segment === text
  return is
}
