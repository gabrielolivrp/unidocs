import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import AlertModal from '../AlertModal'

export interface ConfirmTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfirmTransactionModal = ({ isOpen, onClose }: ConfirmTransactionModalProps) => {
  const {
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
    onOpen: onOpenAlert
  } = useDisclosure()

  const handleClose = () => {
    onClose()
    onOpenAlert()
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
            Nisi a rem magni molestiae, in illum
            nesciunt commodi ducimus placeat exercitationem
            obcaecati incidunt quidem culpa qui quam,
            perspiciatis, excepturi dolorem inventore!
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="purple"
              onClick={handleClose}
              width="full"
              rounded="full"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertModal
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        type="success"
        message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
      />
    </>
  )
}

export default ConfirmTransactionModal
