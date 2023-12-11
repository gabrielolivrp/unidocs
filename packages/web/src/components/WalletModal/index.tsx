import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import {
  Box,
  Text,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  HStack
} from '@chakra-ui/react'
import {
  SUPPORTED_WALLETS,
  WalletInfo
} from './../../constants/wallets'
import { useDApp } from '../../contexts'

export interface WalletProps {
  wallet: WalletInfo
  onClick: () => void
}

const Wallet = ({ wallet, onClick }: WalletProps) => (
  <HStack
    p="2"
    border="1px"
    borderColor="blackAlpha.300"
    rounded="lg"
    width="full"
    cursor="pointer"
    justifyContent="space-between"
    onClick={onClick}
  >
    <Text
      fontSize="md"
      fontWeight="bold"
    >
      {wallet.name}
    </Text>
    <Box boxSize="10">
      <Image src={wallet.iconURL} alt={wallet.name} />
    </Box>
  </HStack>
)

export interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const { wallet, setWallet } = useDApp()
  const { activate } = useWeb3React()
  const [hasError, setHasError] = useState(false)
  const [pendding, setPendding] = useState(false)

  const tryActivation = async (connector: AbstractConnector) => {
    setPendding(true)

    activate(connector, undefined, true)
      .then(() => onClose())
      .catch(() => setHasError(true))
      .finally(() => setPendding(false))
  }

  const handleActivation = async (wallet: WalletInfo) => {
    setWallet(wallet)
    if (wallet?.connector) {
      await tryActivation(wallet.connector)
    }
  }

  const tryActivationAgain = async () => {
    setHasError(false)
    if (wallet?.connector) {
      await tryActivation(wallet.connector)
    }
  }

  const handleClose = () => {
    onClose()
    setHasError(false)
    setPendding(false)
  }

  return (
    <Modal
      isCentered
      size="sm"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent pb="5" rounded="xl">
        <ModalHeader>Connect a wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!pendding && !hasError &&
            <VStack spacing="2">
              {Object.keys(SUPPORTED_WALLETS).map(key => {
                const wallet = SUPPORTED_WALLETS[key]
                return (
                  <Wallet
                    key={key}
                    wallet={wallet}
                    onClick={() => handleActivation(wallet)}
                  />
                )
              })}
            </VStack>
          }
          {pendding && (
            <VStack p="2" border="1px" borderColor="blackAlpha.300" rounded="lg">
              <Text>
                Waiting your permission for connection in your <Text as="span">
                  {wallet?.name}
                </Text>
              </Text>
              <HStack width="full">
                <Spinner size="sm" color='purple' />
                <Text>Waiting...</Text>
              </HStack>
            </VStack>
          )}
          {hasError && (
            <Text>
              Error connecting <Text
                as="span"
                fontWeight="bold"
                cursor="pointer"
                onClick={tryActivationAgain}
              >
                Try again
              </Text>.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WalletModal
