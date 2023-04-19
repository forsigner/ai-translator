import { Options, query } from 'stook-graphql'
import gql from 'gql-tag'

export const SEND_TRANSLATION_MESSAGE = gql`
  mutation sendTranslationMessage($input: SendTranslationMessageInput!) {
    sendTranslationMessage(input: $input)
  }
`

/** 创建 */
export type SendTranslationMessageInput = {
  content: string
}

export async function sendTranslationMessage(
  args: SendTranslationMessageInput = {} as SendTranslationMessageInput,
  opt: Options = {},
) {
  return await query<boolean>(SEND_TRANSLATION_MESSAGE, { ...opt, variables: { input: args } })
}
