import { Options, useQuery, useMutation } from "stook-graphql";
import { ChatSettings, Message, User, Token, Visit, QueryMessagesArgs, QuerySearchUsersArgs, QueryTokensArgs } from "./types";
import { CHAT_SETTINGS, MESSAGES, SEARCH_USERS, TOKENS, VISIT } from "./gql";

class HooksService {
  useChatSettings(args?: any | (() => any), opt: Options = {}) {
    return useQuery<ChatSettings, any>(CHAT_SETTINGS, { ...opt, variables: args })
  }

  useMessages(args?: QueryMessagesArgs | (() => QueryMessagesArgs), opt: Options = {}) {
    return useQuery<Message[], QueryMessagesArgs>(MESSAGES, { ...opt, variables: args })
  }

  useSearchUsers(args?: QuerySearchUsersArgs | (() => QuerySearchUsersArgs), opt: Options = {}) {
    return useQuery<User[], QuerySearchUsersArgs>(SEARCH_USERS, { ...opt, variables: args })
  }

  useTokens(args?: QueryTokensArgs | (() => QueryTokensArgs), opt: Options = {}) {
    return useQuery<Token[], QueryTokensArgs>(TOKENS, { ...opt, variables: args })
  }

  useVisit(args?: any | (() => any), opt: Options = {}) {
    return useQuery<Visit, any>(VISIT, { ...opt, variables: args })
  }
}

export const Hooks = new HooksService();
