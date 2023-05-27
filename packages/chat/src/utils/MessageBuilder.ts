import { ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum } from 'openai'
import type { Chat, Params } from '../domains/chat.domain'
import { BotSlugs } from '../constants'
import { langMap } from '../supportLanguages'

const chineseLangs = ['zh-cn', 'zh-tw', 'wyw', 'yue']

export class MessageBuilder {
  text: string

  params: Params

  messages: ChatCompletionRequestMessage[] = []

  constructor(private bot: Chat) {
    this.text = bot.text
    this.params = bot.params
  }

  buildMessages = (text?: string) => {
    const { to = '' } = this.params
    const { bot } = this
    const toChinese = chineseLangs.includes(to)

    if (bot.slug === BotSlugs.CodeTranslator) {
      this.messages.push({
        role: ChatCompletionResponseMessageRoleEnum.User,
        content: this.createCodeTranslatorPrompt(),
      })
    } else {
      this.messages = [
        {
          role: ChatCompletionResponseMessageRoleEnum.User,
          content: bot.isWord && toChinese ? this.createWordPrompt() : this.createLangPrompt(text),
        },
      ]
    }

    return this.messages
  }

  createLangPrompt(inputText?: string) {
    let text = this.bot.text
    if (inputText) text = inputText

    const { to = '' } = this.params
    const toName = langMap.get(to) || to
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
    const { text } = this.bot
    const { to = '' } = this.params
    const toName = langMap.get(to) || to

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

  createCodeTranslatorPrompt = () => {
    const { text } = this.bot
    const { from, to } = this.params

    if (from === 'Natural Language') {
      return `
    You are an expert programmer in all programming languages. Translate the natural language to "${to}" code. Do not include \`\`\`.

    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${text}

    ${to} code (no \`\`\`):
    `
    } else if (to === 'Natural Language') {
      return `
      You are an expert programmer in all programming languages. Translate the "${from}" code to natural language in plain English that the average adult could understand. Respond as bullet points starting with -.
  
      Example translating from JavaScript to natural language:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Natural language:
      Print the numbers 0 to 9.
      
      ${from} code:
      ${text}

      Natural language:
     `
    } else {
      return `
      You are an expert programmer in all programming languages. Translate the "${from}" code to "${to}" code. Do not include \`\`\`.
  
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${from} code:
      ${text}

      ${to} code (no \`\`\`):
     `
    }
  }
}
