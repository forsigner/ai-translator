import { TokenProvider } from '@boter/api-sdk'
import { toast } from 'bone-ui'
import { Node, useForm } from 'fomir'
import { useMySettings } from './useMySettings'
import { useEffect } from 'react'
import { useUpdateSetting } from './useUpdateSetting'

interface Values {
  tokenProvider: TokenProvider
  openaiApiKey: string
}

export function useSettingsForm() {
  const { data } = useMySettings()
  const { updateSetting } = useUpdateSetting()

  let nodes: Node[] = [
    {
      label: 'OpenAI API Key',
      component: 'Input',
      name: 'openaiApiKey',
      value: '',
      componentProps: {
        placeholder: 'sk-****',
      },
    },

    {
      label: 'Token 消耗方式',
      component: 'RadioGroup',
      name: 'tokenProvider',
      value: '',
      options: [
        {
          label: '免费',
          value: TokenProvider.Free,
        },
        {
          label: 'OpenAI API Key',
          value: TokenProvider.OpenAiApiKey,
        },
      ],
      componentProps: {},
    },
    {
      component: 'Submit',
      text: 'Save',
    },
  ]

  const form = useForm<Values>({
    async onSubmit(values) {
      await updateSetting(values)
    },

    onError(e) {
      console.log('e:', e)
    },
    children: nodes,
  })

  useEffect(() => {
    if (data) {
      form.setValues(data as any)
    }
  }, [data, form])

  return form
}
