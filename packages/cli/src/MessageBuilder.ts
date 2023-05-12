import { ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum } from 'openai'
import { isWord } from './isWord'

interface Options {
  text: string
  to: string
}

export class MessageBuilder {
  text: string

  to: string

  isWord = false

  messages: ChatCompletionRequestMessage[] = []

  constructor(private opt: Options) {
    this.text = opt.text
    this.to = opt.to || 'English'
    this.isWord = isWord(opt.text)
  }

  buildMessages = () => {
    this.messages = [
      {
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: this.isWord ? this.createWordPrompt() : this.createLangPrompt(),
      },
    ]

    return this.messages
  }

  createLangPrompt() {
    const { text } = this.opt
    const toName = this.to
    return `
    You are a translation engine that can only translate text and cannot interpret it.

    Example translating original text to 简体中文:

    Original text:
    hello world

    简体中文:
    你好，世界

    Original text:
    ${text}

    ${toName}(Only response translated result):
    `
  }

  createWordPrompt = () => {
    const { text } = this.opt
    const toName = this.to

    const prompt = `请翻译这个单词，请给出单词原始形态（如果有）、单词的语种、对应的音标（如果有）、所有含义（含词性）、双语示例(至少三条例句)，请严格按照下面格式给到翻译结果(注意的是翻译结果使用${toName}展示)：
                <原始文本>
                [<语种>] · / <单词音标>
                [<词性缩写>] <中文含义>]
                双语例句：
                <序号><例句>(例句翻译)

      translate this word to ${toName}: "${text}"
      `

    return prompt
  }
}
