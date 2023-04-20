import { Bot } from './bot.domain'
import { BotSlugs } from './constants'

export function createPrompt(bot: Bot) {
  if (bot.slug === BotSlugs.TextTranslator) {
    //
  } else if (bot.slug === BotSlugs.CodeInterpreter) {
    //
  }
}
