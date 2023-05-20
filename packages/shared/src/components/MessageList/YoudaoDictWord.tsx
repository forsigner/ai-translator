import { YoudaoDictResult } from '@ai-translator/bot'
import { Box } from '@fower/react'
import { IconSpeaker } from '../../icons/IconSpeaker'

type ExplainsProps = {
  explains: string[]
}

function Explains({ explains }: ExplainsProps) {
  return (
    <Box column rowGap-8 mt4>
      {explains.map((item) => {
        const [, type = '', explain = ''] = item.match(/^([a-z]+\.)(.+)$/) || []
        return (
          <Box key={item} toTop columnGap-4 textSM>
            <Box gray400>{type}</Box>
            <Box fontMedium>{explain}</Box>
          </Box>
        )
      })}
    </Box>
  )
}

type PhraseProps = {
  phrases: YoudaoDictResult['web']
}

function Phrase({ phrases }: PhraseProps) {
  return (
    <Box mt4>
      <Box textLG fontBold mb2>
        短语
      </Box>
      <Box column rowGap-8>
        {phrases.map((item) => {
          return (
            <Box key={item.key} column rowGap-4>
              <Box textBase>{item.key}</Box>
              <Box gray500 textXS>
                {item.value}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

type WfsProps = {
  wfs: YoudaoDictResult['basic']['wfs']
}

function Wfs({ wfs }: WfsProps) {
  return (
    <Box toCenterY columnGap-16 rowGap-4 mt4 flexWrap>
      {wfs.map((item, index) => {
        return (
          <Box key={index} toCenter columnGap-4>
            <Box textBase>{item.wf.value}</Box>
            <Box gray500 textXS flexShrink-0>
              ({item.wf.name})
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

interface Props {
  data: YoudaoDictResult
}

export const YoudaoDictWord = ({ data }: Props) => {
  const { basic } = data

  function play(src: string) {
    const audio = new Audio(src)
    audio.play()
  }

  return (
    <Box column rowGap-4>
      <Box textLG fontBold>
        {data.query}
      </Box>
      <Box toCenterY columnGap-12>
        {basic['uk-phonetic'] && (
          <Box toCenterY columnGap-4>
            <Box textXS gray600>
              英
            </Box>
            <Box>{` / ${basic['uk-phonetic']} /`}</Box>
            <IconSpeaker
              cursorPointer
              size={16}
              gray500
              gray900--hover
              onClick={() => {
                play(`https://dict.youdao.com/dictvoice?audio=${data.query}&type=1`)
              }}
            />
          </Box>
        )}

        {basic['us-phonetic'] && (
          <Box toCenterY columnGap-4>
            <Box textXS gray600>
              美
            </Box>
            <Box>{` / ${basic['us-phonetic']} /`}</Box>

            <IconSpeaker
              cursorPointer
              gray500
              gray900--hover
              size={16}
              onClick={() => {
                play(`https://dict.youdao.com/dictvoice?audio=${data.query}&type=2`)
              }}
            />
          </Box>
        )}
      </Box>
      <Explains explains={basic.explains} />
      {basic?.wfs?.length && <Wfs wfs={basic.wfs} />}
      {data?.web?.length && <Phrase phrases={data.web} />}
    </Box>
  )
}
