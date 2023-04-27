import { RefetchOptions, fetcher } from "stook-graphql";
import { ChatSettings, Message, User, Token, Visit, QueryMessagesArgs, QuerySearchUsersArgs, QueryTokensArgs } from "./types";
import { CHAT_SETTINGS, MESSAGES, SEARCH_USERS, TOKENS, VISIT } from "./gql";

class RefetcherService {
  async refetchChatSettings(args: any = {} as any, opt: RefetchOptions = {}): Promise<ChatSettings> {

    const key = opt.key ? opt.key : CHAT_SETTINGS
    if (!fetcher.get(key)) {
      return console.warn('fetcher找不到' + key) as any
    }
    if (Object.keys(args).length) opt.variables = args
    if (!opt.showLoading) opt.showLoading = false
    return await fetcher.get(key).refetch(opt)

  }

  async refetchMessages(args: QueryMessagesArgs = {} as QueryMessagesArgs, opt: RefetchOptions = {}): Promise<Message[]> {

    const key = opt.key ? opt.key : MESSAGES
    if (!fetcher.get(key)) {
      return console.warn('fetcher找不到' + key) as any
    }
    if (Object.keys(args).length) opt.variables = args
    if (!opt.showLoading) opt.showLoading = false
    return await fetcher.get(key).refetch(opt)

  }

  async refetchSearchUsers(args: QuerySearchUsersArgs = {} as QuerySearchUsersArgs, opt: RefetchOptions = {}): Promise<User[]> {

    const key = opt.key ? opt.key : SEARCH_USERS
    if (!fetcher.get(key)) {
      return console.warn('fetcher找不到' + key) as any
    }
    if (Object.keys(args).length) opt.variables = args
    if (!opt.showLoading) opt.showLoading = false
    return await fetcher.get(key).refetch(opt)

  }

  async refetchTokens(args: QueryTokensArgs = {} as QueryTokensArgs, opt: RefetchOptions = {}): Promise<Token[]> {

    const key = opt.key ? opt.key : TOKENS
    if (!fetcher.get(key)) {
      return console.warn('fetcher找不到' + key) as any
    }
    if (Object.keys(args).length) opt.variables = args
    if (!opt.showLoading) opt.showLoading = false
    return await fetcher.get(key).refetch(opt)

  }

  async refetchVisit(args: any = {} as any, opt: RefetchOptions = {}): Promise<Visit> {

    const key = opt.key ? opt.key : VISIT
    if (!fetcher.get(key)) {
      return console.warn('fetcher找不到' + key) as any
    }
    if (Object.keys(args).length) opt.variables = args
    if (!opt.showLoading) opt.showLoading = false
    return await fetcher.get(key).refetch(opt)

  }
}

export const Refetcher = new RefetcherService();
