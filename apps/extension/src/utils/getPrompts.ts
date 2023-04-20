import { langMap } from '../common/constants'

export interface GetPromptsOptions {
  text: string
  selectedWord: string
  from: string
  to: string
}

export const isAWord = (lang: string, text: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Segmenter = (Intl as any).Segmenter
  if (!Segmenter) {
    return false
  }
  const segmenter = new Segmenter(lang, { granularity: 'word' })
  const iterator = segmenter.segment(text)[Symbol.iterator]()
  return iterator.next().value?.segment === text
}

const chineseLangs = ['zh-Hans', 'zh-Hant', 'wyw', 'yue']

export function getPrompts(opt: GetPromptsOptions) {
  const { from, to, text, selectedWord } = opt
  const fromChinese = chineseLangs.indexOf(from) >= 0

  const toChinese = chineseLangs.indexOf(to) >= 0
  let systemPrompt =
    'You are a translation engine that can only translate text and cannot interpret it.'
  let userPrompt = `translate from ${langMap.get(from) || from} to ${langMap.get(to) || to}`
  let isWordMode = false

  if (to === 'wyw' || to === 'yue') {
    userPrompt = `翻译成${langMap.get(to) || to}`
  }
  if (fromChinese) {
    if (to === 'zh-Hant') {
      userPrompt = '翻譯成台灣常用用法之繁體中文白話文'
    } else if (to === 'zh-Hans') {
      userPrompt = '翻译成简体白话文'
    } else if (text.length < 5 && toChinese) {
      // 当用户的默认语言为中文时，查询中文词组（不超过5个字），展示多种翻译结果，并阐述适用语境。
      systemPrompt = `你是一个翻译引擎，请将给到的文本翻译成${
        langMap.get(to) || to
      }。请列出3种（如果有）最常用翻译结果：单词或短语，并列出对应的适用语境（用中文阐述）、音标、词性、双语示例。按照下面格式用中文阐述：
                        <序号><单词或短语> · /<音标>
                        [<词性缩写>] <适用语境（用中文阐述）>
                        例句：<例句>(例句翻译)`
      userPrompt = ''
    }
  }
  if (toChinese && isAWord(from, text.trim())) {
    isWordMode = true
    // 翻译为中文时，增加单词模式，可以更详细的翻译结果，包括：音标、词性、含义、双语示例。
    systemPrompt = `你是一个翻译引擎，请将翻译给到的文本，只需要翻译不需要解释。当且仅当文本只有一个单词时，请给出单词原始形态（如果有）、单词的语种、对应的音标（如果有）、所有含义（含词性）、双语示例，至少三条例句，请严格按照下面格式给到翻译结果：
                <原始文本>
                [<语种>] · / <单词音标>
                [<词性缩写>] <中文含义>]
                例句：
                <序号><例句>(例句翻译)`
  }

  if (selectedWord) {
    // 在选择的句子中，选择特定的单词。触发语境学习功能。
    systemPrompt = `你是一位${langMap.get(from) || from}词义语法专家，你在教我${
      langMap.get(from) || from
    }，我给你一句${langMap.get(from) || from}句子，和这个句子中的一个单词，请用${
      langMap.get(to) || to
    }帮我解释一下，这个单词在句子中的意思和句子本身的意思,如果单词在这个句子中是习话的一部分，请解释这句句子中的习话，并举几个相同意思的${
      langMap.get(from) || from
    }例句,并用${langMap.get(to) || to}解释例句。如果你明白了请说同意，然后我们开始。`
    userPrompt = '好的，我明白了，请给我这个句子和单词。'

    // text = `句子是：${text}\n单词是：${selectedWord}`
  }

  return {
    systemPrompt,
    userPrompt,
    isWordMode,
  }
}
