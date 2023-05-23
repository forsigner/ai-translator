import { Box } from '@fower/react'
import Highlighter from 'react-highlight-words'
import { Tag } from 'bone-ui'
import { YoudaoDictWord, IconChatLoading } from '@ai-translator/widgets'

interface Props {
  streaming: boolean
  content: any
  isWordMode: boolean
  text: string
}

type Item = Common | OriginWord | WordType | Title | ExampleContent

type Common = {
  type: 'Common'
  value: string
}

type OriginWord = {
  type: 'OriginWord'
  value: string
}

type WordType = {
  type: 'WordType'
  value: [string, string]
}

type Title = {
  type: 'Title'
  value: string
}

type ExampleContent = {
  type: 'ExampleContent'
  value: [string, string, string]
}

const regExampleContent = /^(\d)\.(.+)[(（](.+)[)）]$/
const regWordType = /^\[([a-zA-Z.]+)\](.*)/

function parseWordContent(content: string) {
  const arr = content.split('\n')

  return arr.map<Item>((item, index) => {
    if (index == 0) return { type: 'OriginWord', value: item }

    if (regWordType.test(item)) {
      const matched = item.match(regWordType)
      if (matched?.length && matched?.length > 2) {
        return {
          type: 'WordType',
          value: [matched[1], matched[2].trim()],
        }
      }
    }

    if (regExampleContent.test(item)) {
      const matched = item.match(regExampleContent)
      if (matched?.length && matched?.length > 3) {
        return {
          type: 'ExampleContent',
          value: [matched[1], matched[2].trim(), matched[3]],
        }
      }
    }

    if (item.endsWith('：') || item.endsWith(':')) {
      return { type: 'Title', value: item.replace('：', '') }
    }

    return { type: 'Common', value: item }
  })
}

export const TranslatorContent = ({ streaming, content, isWordMode, text }: Props) => {
  if (streaming) {
    return (
      <Box>
        <IconChatLoading />
      </Box>
    )
  }

  if (!text) return null

  if (typeof content === 'object') {
    return <YoudaoDictWord data={content?.data} />
  }

  if (typeof content === 'string') {
    if (isWordMode) {
      const arr = parseWordContent(content)

      return (
        <Box leadingLoose>
          {arr.map((item, index) => {
            if (item.type === 'OriginWord') {
              return (
                <Box key={index} fontBold>
                  {item.value}
                </Box>
              )
            }
            if (item.type === 'WordType') {
              return (
                <Box key={index} toCenterY columnGap-4>
                  <Box textSM gray400>
                    {item.value[0]}
                  </Box>
                  <Box>{item.value[1]}</Box>
                </Box>
              )
            }

            if (item.type === 'Title') {
              return (
                <Tag variant="light" bgGray200 colorScheme="gray900" key={index} mt3 mb1>
                  {item.value}
                </Tag>
              )
            }

            if (item.type === 'ExampleContent') {
              return (
                <Box key={index} toTop columnGap-4 leadingNormal py1>
                  <Box>{item.value[0]}.</Box>
                  <Box
                    css={{
                      '.ai-hight-light-word': {
                        fontWeight: 'bold',
                        color: 'brand500',
                        background: 'transparent',
                      },
                    }}
                  >
                    <Highlighter
                      highlightClassName="ai-hight-light-word"
                      searchWords={[text]}
                      autoEscape={true}
                      textToHighlight={item.value[1]}
                    />
                    <Box textSM gray400>
                      {item.value[2]}
                    </Box>
                  </Box>
                </Box>
              )
            }

            return <Box key={index}>{item.value}</Box>
          })}
        </Box>
      )
    }
  }
  return <>{content}</>
}
