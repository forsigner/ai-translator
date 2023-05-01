import { Box } from '@fower/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  ArrowRightOutline,
} from 'bone-ui'
import { useModal } from '@langpt/easy-modal'
import { PlanIntervalSelect } from './PlanIntervalSelect'
import { useState } from 'react'
import { PlanInterval } from '@langpt/api-sdk'
import { UpgradeCard } from './UpgradeCard'
import { PlanFeatures } from './PlanFeatures'

export const ModalUpgrade = () => {
  const { register } = useModal()

  const [value, setValue] = useState(PlanInterval.Month)

  return (
    <Modal {...register('bone-ui')}>
      <ModalOverlay />
      <ModalContent w={[600]}>
        <ModalCloseButton />
        <Box px8 py2>
          <Box toCenterX column mb3>
            <Box fontBold textXL leadingLoose>
              Upgrade to Plus
            </Box>
            <Box gray400>Get more words per month by upgrading to Plus!</Box>
          </Box>
          <Box toCenterX>
            <PlanIntervalSelect value={value} onChange={setValue} />
          </Box>
          <Box toTop toBetween mt8 columnGap-20>
            <Box flex-1>
              <UpgradeCard planInterval={value} />
            </Box>
            <PlanFeatures />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}
