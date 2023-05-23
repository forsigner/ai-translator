import { Box } from '@fower/react'
import { ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader } from 'bone-ui'
import { useModal } from '@ai-translator/easy-modal'
import { Settings } from '@ai-translator/widgets'

export const ModalSettings = () => {
  const { register } = useModal()

  return (
    <Modal {...register('bone-ui')}>
      <ModalOverlay />
      <ModalContent w-500--i>
        <ModalCloseButton />
        <Settings width="100%" title="Settings" />
      </ModalContent>
    </Modal>
  )
}
