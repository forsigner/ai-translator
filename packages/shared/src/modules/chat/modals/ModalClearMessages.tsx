import { Box } from '@fower/react'
import {
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
} from 'bone-ui'
import { useModal } from '@ai-translator/easy-modal'

export const ModalClearMessages = () => {
  const { hide, register } = useModal()

  return (
    <Modal {...register('bone-ui')}>
      <ModalOverlay />
      <ModalContent w-300--i>
        <ModalCloseButton />
        <ModalHeader pb3--i>Clear all messages?</ModalHeader>
        <ModalBody>
          <Box>Clear all messages of this bot</Box>
          <Box toCenterY spaceX2 toRight mt5>
            <Button size="sm" variant="light" colorScheme="gray500" onClick={hide}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="red500"
              onClick={async () => {
                // await clearMessages()
                hide()
              }}
            >
              Clear
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
