import { Box } from '@fower/react'
import { Button } from 'bone-ui'
import { Node, useForm } from 'fomir'
import { useMode } from './useMode'
import { useEffect } from 'react'
import { useSettings } from '../stores/settings.store'
import { Settings } from '../services/storage'

export function useSettingsForm() {
  const { setMode } = useMode()
  const { settings, setSettings } = useSettings()

  console.log('settings-----:', settings)

  const nodes: Node[] = [
    {
      label: (
        <Box toCenterY spaceX2>
          <Box>OpenAI API Key</Box>
          <Button
            as="a"
            px2
            size={28}
            textDecoration="none"
            variant="light"
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            Get API Key
          </Button>
        </Box>
      ),
      component: 'Input',
      name: 'apiKey',
      value: settings.apiKey || '',
      componentProps: {
        // textCenter: true,
        placeholder: 'sk-*******',
      },
    },
    {
      label: 'Token 消耗方式',
      component: 'Select',
      name: 'tokenProvider',
      options: [
        { label: '免费 Token', value: 'Free' },
        { label: 'API Key Token', value: 'ApiKey' },
      ],
      value: settings.tokenProvider,
    },
    {
      label: '主题',
      name: 'theme',
      component: 'Select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        // { label: 'System theme', value: 'system' },
      ],
      value: settings.theme || '',
      componentProps: {},
    },
    {
      label: '语言',
      name: 'lang',
      component: 'Select',

      options: [
        { label: 'English', value: 'en' },
        { label: '简体中文', value: 'zh-CN' },
      ],
      value: settings.lang || '',
    },
  ]

  const form = useForm<Settings>({
    watch: {
      '*.value': (val) => {
        const values = val as any as Settings
        console.log('values:', val)
        setSettings(values)
      },

      'theme.value': (val) => {
        const theme = val as any as string
        console.log('valu:', val)
        setMode(theme)
      },
    },
    async onSubmit(values) {
      console.log('values:', values)
    },
    children: nodes,
  })

  useEffect(() => {
    form.setValues(settings)
    console.log('-====settings:', settings)
  }, [settings, form])

  return form
}
