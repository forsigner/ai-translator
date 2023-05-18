import { Node, useForm } from 'fomir'
import { Bot } from '@boter/api-sdk'
import { useTranslation } from 'react-i18next'
import { useModal } from '@ai-translator/easy-modal'
import { useUser } from '../../../stores'
import { useAddBot } from './useAddBot'
import { useUpdateBot } from './useUpdateBot'
import { useRouter } from 'next/router'

interface Values {
  slug: string
  desc: string
  prompt: string
}

export function useBotForm() {
  const { t } = useTranslation('common')
  const { hide, data: bot = {} as Bot } = useModal<Bot>()
  const { user } = useUser()
  const { push } = useRouter()
  const { addBot } = useAddBot()
  const { updateBot } = useUpdateBot()
  const isEditing = Object.keys(bot).length

  const nodes: Node[] = [
    {
      label: 'Bot name',
      component: 'Input',
      name: 'slug',
      value: bot?.slug || '',
      intercept(value: string, node) {
        if (value === '') return value
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) return node.value
        return value
      },
      validators: { required: 'Please input bot name' },
    },

    {
      label: 'Introduction',
      component: 'AutoSizeTextarea',
      name: 'desc',
      value: bot?.desc || '',
    },

    {
      label: 'Prompt',
      component: 'AutoSizeTextarea',
      name: 'prompt',
      value: bot?.prompt || '',
      componentProps: {
        minRows: 2,
      },
    },

    {
      component: 'Submit',
      text: isEditing ? 'Edit bot' : 'Create a bot',
    },
  ]

  const form = useForm<Values>({
    async onSubmit(values) {
      let bot: Bot
      try {
        if (isEditing) {
          bot = await updateBot(values)
        } else {
          bot = await addBot({
            ...values,
            userId: user.id,
          })
        }
        hide()
        push(`/${bot.slug}`)
      } catch (error) {
        console.log('error:', error)
      }
    },
    children: nodes,
  })

  return form
}
