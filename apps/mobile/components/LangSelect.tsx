import React, { memo, useState } from 'react'
import { styled } from '@fower/styled'
import { TouchableOpacity } from 'react-native'
import { ScrollView, Text, TextInput, View } from '@fower/react-native'
import { supportLanguages } from '@ai-translator/bot'

const Opacity = styled(TouchableOpacity)

interface Props {
  value: string
  onChange: (value: string) => void
}

interface LangSelectItemProps {
  langName: string
  langCode: string
  selected: boolean
  onClick: (value: string) => void
}

const LangSelectItem = memo(
  function LangSelectItem({ langName, langCode, selected, onClick }: LangSelectItemProps) {
    return (
      <Opacity
        row
        toBetween
        py2
        px6
        onPress={() => {
          onClick(langCode)
        }}
      >
        <View>
          <Text textLG fontBold={selected} brand500={selected}>
            {langName}
          </Text>
        </View>
        <Text gray400 brand500={selected}>
          {langCode}
        </Text>
      </Opacity>
    )
  },
  (prev, cur) => {
    if (prev.langCode === cur.langCode && prev.selected === cur.selected) return true
    return false
  },
)

export function LangSelect({ value, onChange }: Props) {
  const [searchedValue, setSearchedValue] = useState('')

  let filtered = supportLanguages.filter((item) => {
    const reg = new RegExp(`${searchedValue}`, 'i')
    return (
      reg.test((item[0] || '').toString().toLowerCase()) ||
      (typeof item[1] === 'string' && reg.test(item[1].toLowerCase()))
    )
  })

  return (
    <View>
      <View px6>
        <TextInput
          px4
          py2
          roundedFull
          border-2
          placeholder="Search"
          onChangeText={(text) => setSearchedValue(text)}
        />
      </View>
      <ScrollView>
        <View column flex-1 pt2>
          {filtered.map((lang) => {
            const selected = lang[0] === value
            return (
              <LangSelectItem
                key={lang[0]}
                langCode={lang[0]}
                langName={lang[1]}
                selected={selected}
                onClick={onChange}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
