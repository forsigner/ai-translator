import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@fower/react'
import { useModal } from '@ai-translator/easy-modal'
import { Settings, isExtension, useSettings } from '@ai-translator/chat'
import { Button, toast } from 'bone-ui'
import { Node, useForm } from 'fomir'
import { useEffect } from 'react'

export function useSettingsForm() {
  const { settings, updateSettings } = useSettings()
  const { hide } = useModal()
  const { t } = useTranslation('common')

  const nodes: Node[] = [
    {
      label: 'Use AI mode',
      component: 'Switch',
      name: 'aiMode',
      value: settings.aiMode || false,
    },

    {
      label: (
        <Box toCenterY spaceX2>
          <Box>{t('openai-api-key')}</Box>
          <Button
            as="a"
            px2
            size={28}
            textDecoration="none"
            variant="light"
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            {t('get-api-key')}
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
    //   label: t('token-provider'),
    //   component: 'RadioGroup',
    //   name: 'tokenProvider',
    //   options: [
    //     { label: t('free'), value: 'Free' },
    //     { label: t('api-key'), value: 'ApiKey' },
    //   ],
    //   value: settings.tokenProvider || '',
    // },
  ]

  if (isExtension) {
    // nodes.push({
    //   label: t('theme'),
    //   name: 'theme',
    //   component: 'Select',
    //   options: [
    //     { label: 'Light', value: 'light' },
    //     { label: 'Dark', value: 'dark' },
    //     // { label: 'System theme', value: 'system' },
    //   ],
    //   value: settings.theme || '',
    //   componentProps: {},
    // })

    nodes.push({
      label: t('language'),
      name: 'lang',
      component: 'Select',

      options: [
        { label: 'English', value: 'en' },
        { label: '简体中文', value: 'zh-CN' },
        { label: 'Japanese', value: 'ja' },
      ],
      value: settings.lang || '',
    })
  }

  const form = useForm<Settings>({
    async onSubmit(values) {
      updateSettings({ ...settings, ...values })
      toast.success('Settings saved')
    },
    children: nodes,
  })

  useEffect(() => {
    if (Object.keys(settings).length === 0) return
    form.setValues(settings)
  }, [settings, form])

  return form
}
