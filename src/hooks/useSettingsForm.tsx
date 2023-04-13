import { Box } from '@fower/react'
import { Button } from 'bone-ui'
import { Node, useForm } from 'fomir'
import { useMode } from './useMode'
import { Settings, useSettings } from '@src/stores/settings.store'
import { useEffect } from 'react'

type Values = Settings

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
    // {
    //   label: '开启了吗',
    //   component: 'Switch',
    //   name: 'lang',
    //   value: true,
    // },
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

  const form = useForm<Values>({
    watch: {
      '*.value': (val) => {
        const values = val as any as Values
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
      //

      console.log('values:', values)
    },
    children: nodes,
  })

  useEffect(() => {
    if (settings) {
      form.setValues(settings)
    }
  }, [settings])

  return form
}