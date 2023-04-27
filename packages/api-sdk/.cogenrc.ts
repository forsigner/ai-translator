import { CogenConfig } from '@cogen/cli'
import { StookGraphqlConfig, ConfigItem } from 'cogen-stook-graphql'
import { join } from 'path'

const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'

export const getEndpoint = () => {
  if (isProd) return 'https://www.langpt.ai/graphql'
  return 'http://localhost:8001/graphql'
}

const gqlConfig: ConfigItem[] = [
  { name: 'logout', actions: ['query', 'useMutation'] },
  { name: 'loginByGithub', actions: ['query'] },
  { name: 'loginByGoogle', actions: ['query'] },
  { name: 'loginByPersonalToken', actions: ['query'] },

  { name: 'tokens', actions: ['useQuery', 'refetch'] },
  { name: 'addToken', actions: ['query'] },
  { name: 'deleteToken', actions: ['query'] },

  { name: 'searchUsers', actions: ['useQuery', 'refetch'] },
  { name: 'updateUser', actions: ['query'] },

  { name: 'visit', actions: ['useQuery', 'refetch', 'mutator'] },
  { name: 'updateVisit', actions: ['query'] },

  { name: 'chatSettings', actions: ['useQuery', 'refetch', 'mutator'] },
  { name: 'updateChatSettings', actions: ['query'] },

  { name: 'messages', actions: ['useQuery', 'refetch', 'mutator'] },
  { name: 'addMessage', actions: ['query'] },
  { name: 'updateMessage', actions: ['query'] },
  { name: 'removeMessagePair', actions: ['query'] },
]

const dirName = 'src'

const generatedDir = join(process.cwd(), dirName)

const config: CogenConfig = {
  generatedDir: join(process.cwd(), dirName),
  plugins: ['cogen-stook-graphql'],

  stookGraphql: {
    httpModule: 'stook-graphql',
    gql: gqlConfig,
    codegen: {
      schema: [
        {
          [getEndpoint()]: {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjAsImlhdCI6MTU3ODM4MjMxNywiZXhwIjoxNTgwOTc0MzE3fQ.-du3lqLdO2TEkM4_YwqgTtS99d0F_48Se4ZOW0j6w0o',
            },
          },
        },
      ],
      generates: {
        [`${generatedDir}/types.ts`]: {
          plugins: ['typescript'],
        },
        [`${generatedDir}/schema.graphql`]: {
          plugins: ['schema-ast'],
        },
      },
    },
  } as StookGraphqlConfig,
}

export default config
