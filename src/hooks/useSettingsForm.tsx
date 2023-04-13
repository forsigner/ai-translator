import { Box } from '@fower/react'
import { Button } from 'bone-ui'
import { Node, useForm } from 'fomir'

interface Values {
  apiKey?: string
}

export function useSettingsForm() {
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
      value: '',
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
      value: 'light',
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
      value: 'en',
    },
  ]

  const form = useForm<Values>({
    watch: {
      '*.value': (values) => {
        console.log('values:', values)
      },
    },
    async onSubmit(values) {
      //
      console.log('values:', values)
    },
    children: nodes,
  })

  return form
}
