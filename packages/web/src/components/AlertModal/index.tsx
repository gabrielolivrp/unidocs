import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import {
  AiOutlineWarning,
  AiOutlineLike,
  AiOutlineInfoCircle
} from 'react-icons/ai'
import { CgDanger } from 'react-icons/cg'

type AlertType =
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'

const getIcon = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <AiOutlineLike size="40%" />
    case 'danger':
      return <CgDanger size="40%" />
    case 'info':
      return <AiOutlineInfoCircle size="40%" />
    case 'warning':
      return <AiOutlineWarning size="40%" />
  }
}

export interface AlertModalProps {
  type: AlertType
  message: string
  isOpen: boolean
  onClose: () => void
}

const AlertModal = ({ isOpen, onClose, type, message }: AlertModalProps) => (
  <Modal size="xs" isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader textTransform="capitalize">{type}</ModalHeader>
      <ModalCloseButton />
      <ModalBody textAlign="center">
        <Box mb="2" display="flex" color="green.300" justifyContent="center">
          {getIcon(type)}
        </Box>
        {message}
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default AlertModal
