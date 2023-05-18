import { Box } from '@fower/react'
import { ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader } from 'bone-ui'
import { useModal } from '@ai-translator/easy-modal'
import { useSettingsForm } from '../hooks/useSettingsForm'
import { Form } from 'fomir'

export const ModalSettings = () => {
  const { register } = useModal()
  const form = useSettingsForm()

  return (
    <Modal {...register('bone-ui')}>
      <ModalOverlay />
      <ModalContent w-500--i>
        <ModalCloseButton />
        <ModalHeader>Settings</ModalHeader>
        <Box px8 py2>
          <Box fontBold textXL leadingLoose mb2></Box>
          <Form form={form} />
        </Box>
      </ModalContent>
    </Modal>
  )
}
