import { MdCallMade } from 'react-icons/md'
import {
  Box,
  Text,
  TagLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  VStack
} from '@chakra-ui/react'
import { formatAddress } from './../../utils'
import { useDApp } from '../../contexts'
import Transactions from '../Transactions'

export interface AccountModalProps {
  isOpen: boolean,
  onClose: () => void
}

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  const { wallet, account } = useDApp()

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            isFitted
            colorScheme="purple"
            variant="soft-rounded"
          >
            <TabList bgColor="blackAlpha.200">
              <Tab>Details</Tab>
              <Tab>Transactions</Tab>
            </TabList>
            <TabPanels bgColor="blackAlpha.200">
              <TabPanel>
                <VStack alignItems="start">
                  <Text>
                    Connected with <TagLabel fontWeight="bold">{wallet.name}</TagLabel>
                  </Text>
                  <Text fontWeight="bold">{formatAddress(account!)}</Text>
                  <Button
                    as="a"
                    cursor="pointer"
                    variant="link"
                    target="_blank" rel="noreferrer"
                  >
                    View on explorer
                    <MdCallMade />
                  </Button>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Transactions />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}

export default AccountModal
