import { Box } from '@fower/react'
import { ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader } from 'bone-ui'
import { useModal } from '@ai-translator/easy-modal'
import { Form } from 'fomir'
import { Bot } from '@boter/api-sdk'
import { useBotForm } from '../hooks/useBotForm'

export const ModalBot = () => {
  const { register, data } = useModal<Bot>()
  const form = useBotForm()

  return (
    <Modal {...register('bone-ui')}>
      <ModalOverlay />
      <ModalContent w-500--i>
        <ModalCloseButton />
        <ModalHeader>{!data ? 'Create a bot' : 'Edit bot'}</ModalHeader>
        <Box px8 py2>
          <Box fontBold textXL leadingLoose mb2></Box>
          <Form form={form} />
        </Box>
      </ModalContent>
    </Modal>
  )
}
