import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import {
  MdOutlineMoreVert,
  MdOutlineLightMode,
  MdOutlineDarkMode
} from 'react-icons/md'
import { FiAlertCircle, FiGithub } from 'react-icons/fi'
import { useDApp } from '../../contexts'
import { formatAddress } from '../../utils'
import Logo from '../Logo'
import WalletModal from '../WalletModal'
import AccountModal from '../AccountModal'

const ButtonToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Toggle color theme"
      colorScheme="purple"
      shadow="md"
      isRound
      icon={colorMode === 'light'
        ? <MdOutlineDarkMode size="2rem" />
        : <MdOutlineLightMode size="2rem" />}
    />
  )
}

const ButtonInfo = () => {
  const links = [
    {
      text: 'About',
      icon: FiAlertCircle
    },
    {
      text: 'Github',
      icon: FiGithub
    }
  ]

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        shadow="md"
        aria-label="Open more info dropdown"
        colorScheme="purple"
        isRound
        icon={<MdOutlineMoreVert size="2rem" />}
      />
      <MenuList>
        {links.map(({ icon: Icon, text }, index) => (
          <MenuItem
            key={index}
            icon={<Icon size="1rem" />}
          >
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

const ButtonAccount = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { active, account } = useDApp()

  return (
    <>
      {active && account &&
        <>
          <Button
            shadow="md"
            rounded="full"
            colorScheme="purple"
            onClick={onOpen}
          >
            {formatAddress(account)}
          </Button>
          <AccountModal
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      }
      {!active &&
        <>
          <Button
            shadow="md"
            rounded="full"
            colorScheme="purple"
            onClick={onOpen}
          >
            Connect wallet
          </Button>
          <WalletModal
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      }
    </>
  )
}

const Header = () => (
  <Flex h="16" alignItems="center">
    <Box>
      <Logo />
    </Box>
    <Spacer />
    <Box experimental_spaceX="4">
      <ButtonAccount />
      <ButtonToggleTheme />
      <ButtonInfo />
    </Box>
  </Flex>
)

export default Header
