import { Box } from '@fower/react'
import { Button } from 'bone-ui'
import { Node, useForm } from 'fomir'
import { useMode } from './useMode'
import { useEffect } from 'react'
import { useSettings } from '../stores/settings.store'
import { Settings } from '../services/storage'
import { isExtension } from '../common'
import { useTranslation } from 'react-i18next'
import { useLang } from './useLang'

export function useSettingsForm() {
  const { setMode } = useMode()
  const { setLang } = useLang()
  const { settings, setSettings } = useSettings()
  const { t } = useTranslation('common')

  const nodes: Node[] = [
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
    {
      label: t('token-provider'),
      component: 'RadioGroup',
      name: 'tokenProvider',
      options: [
        { label: t('free'), value: 'Free' },
        { label: t('api-key'), value: 'ApiKey' },
      ],
      value: settings.tokenProvider,
    },
  ]

  if (isExtension) {
    nodes.push({
      label: t('theme'),
      name: 'theme',
      component: 'Select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        // { label: 'System theme', value: 'system' },
      ],
      value: settings.theme || '',
      componentProps: {},
    })
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
    watch: {
      '*.value': (val) => {
        const values = val as any as Settings
        setSettings(values)
      },

      'theme.value': (val) => {
        const theme = val as any as string
        if (!theme) return
        console.log('theme:', theme)
        setMode(theme)
      },

      'lang.value': (val) => {
        const lang = val as any as string
        if (!lang) return
        setLang(lang)
      },
    },
    async onSubmit(values) {
      //
    },
    children: nodes,
  })

  useEffect(() => {
    form.setValues(settings)
  }, [settings, form])

  return form
}
