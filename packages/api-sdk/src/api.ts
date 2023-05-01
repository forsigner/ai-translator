import { Options, query } from "stook-graphql";
import { Message, Token, LoginSuccessPayload, User, AddMessageInput, AddTokenInput, DeleteTokenInput, MutationLoginByGithubArgs, MutationLoginByGoogleArgs, MutationLoginByPersonalTokenArgs, RemoveMessagePairInput, UpdateChatSettingsInput, UpdateMessageInput, UpdateUserInput, UpdateVisitInput } from "./types";
import { ADD_MESSAGE, ADD_TOKEN, DELETE_TOKEN, LOGIN_BY_GITHUB, LOGIN_BY_GOOGLE, LOGIN_BY_PERSONAL_TOKEN, REMOVE_MESSAGE_PAIR, UPDATE_CHAT_SETTINGS, UPDATE_MESSAGE, UPDATE_USER, UPDATE_VISIT } from "./gql";

class ApiService {
  async addMessage(args: AddMessageInput = {} as AddMessageInput, opt: Options = {}) {
    return await query<Message>(ADD_MESSAGE, { ...opt, variables: { input: args } })
  }

  async addToken(args: AddTokenInput = {} as AddTokenInput, opt: Options = {}) {
    return await query<Token>(ADD_TOKEN, { ...opt, variables: { input: args } })
  }

  async deleteToken(args: DeleteTokenInput = {} as DeleteTokenInput, opt: Options = {}) {
    return await query<boolean>(DELETE_TOKEN, { ...opt, variables: { input: args } })
  }

  async loginByGithub(args: MutationLoginByGithubArgs = {} as MutationLoginByGithubArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_GITHUB, { ...opt, variables: args })
  }

  async loginByGoogle(args: MutationLoginByGoogleArgs = {} as MutationLoginByGoogleArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_GOOGLE, { ...opt, variables: args })
  }

  async loginByPersonalToken(args: MutationLoginByPersonalTokenArgs = {} as MutationLoginByPersonalTokenArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_PERSONAL_TOKEN, { ...opt, variables: args })
  }

  async removeMessagePair(args: RemoveMessagePairInput = {} as RemoveMessagePairInput, opt: Options = {}) {
    return await query<boolean>(REMOVE_MESSAGE_PAIR, { ...opt, variables: { input: args } })
  }

  async updateChatSettings(args: UpdateChatSettingsInput = {} as UpdateChatSettingsInput, opt: Options = {}) {
    return await query<boolean>(UPDATE_CHAT_SETTINGS, { ...opt, variables: { input: args } })
  }

  async updateMessage(args: UpdateMessageInput = {} as UpdateMessageInput, opt: Options = {}) {
    return await query<Message>(UPDATE_MESSAGE, { ...opt, variables: { input: args } })
  }

  async updateUser(args: UpdateUserInput = {} as UpdateUserInput, opt: Options = {}) {
    return await query<User>(UPDATE_USER, { ...opt, variables: { input: args } })
  }

  async updateVisit(args: UpdateVisitInput = {} as UpdateVisitInput, opt: Options = {}) {
    return await query<boolean>(UPDATE_VISIT, { ...opt, variables: { input: args } })
  }
}

export const apiService = new ApiService();
