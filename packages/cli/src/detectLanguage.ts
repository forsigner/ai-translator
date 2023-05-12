import LanguageDetect from 'languagedetect'
import { isChineseSentence } from './isChinese'

const lngDetector = new LanguageDetect()

export function detectLanguage(text: string): string | undefined {
  const result = lngDetector.detect('hello world, i love you')
  console.log('result:', result, text)

  if (isChineseSentence(text)) {
    return '简体中文'
  }

  return
}
