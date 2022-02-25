import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { useDisclosure, useBalance } from './../../hooks'
import { formatAddress } from './../../utils'
import { Theme, useTheme } from './../../contexts'
import { FiGithub, FiAlertCircle } from 'react-icons/fi'
import {
  MdOutlineMoreVert,
  MdOutlineLightMode,
  MdOutlineDarkMode
} from 'react-icons/md'
import Logo from './../../components/Logo'
import WalletModal from './../../components/WalletModal'
import Dropdown, { DropdownItem } from './../../components/Dropdown'
import AccountModal from './../../components/AccountModal'

interface ButtonMenuItemProps {
  children: React.ReactNode
  onClick?: () => void | undefined
}

const ButtonMenuItem = ({ children, onClick }: ButtonMenuItemProps) => (
  <button
    onClick={onClick}
    className="text-lg font-semibold p-2 shadow-lg rounded-full bg-gray-50 hover:bg-gray-50/80 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-400 dark:bg-gray-900/80 dark:hover:bg-gray-900"
  >
    {children}
  </button>
)

const ButtonToggleTheme = () => {
  const { toggleTheme, theme } = useTheme()

  return (
    <ButtonMenuItem onClick={toggleTheme}>
      {theme === Theme.LIGHT
        ? <MdOutlineDarkMode className="h-7 w-7" />
        : <MdOutlineLightMode className="h-7 w-7" />}
    </ButtonMenuItem>
  )
}

const ButtonInfo = () => (
  <Dropdown button={
    <ButtonMenuItem>
      <MdOutlineMoreVert className="h-7 w-7" />
    </ButtonMenuItem>
  }>
    <DropdownItem onClick={() => { }} text="About" icon={FiAlertCircle} />
    <DropdownItem onClick={() => { }} text="Github" icon={FiGithub} />
  </Dropdown>
)

const AccountButton = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure()
  const { account } = useWeb3React()
  const balance = useBalance()

  return (
    <div className="pl-4 text-lg font-semibold rounded-full shadow-lg bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
      <label>{formatEther(balance)} ETH</label>
      <button
        onClick={handleOpen}
        className="text-lg font-semibold px-4 py-2 ml-4 rounded-full text-gray-50 bg-primary">
        {formatAddress(account!)}
      </button>
      <AccountModal open={isOpen} onClose={handleClose} />
    </div>
  )
}

const Header = () => {
  const { isOpen, handleClose, handleOpen } = useDisclosure()
  const { active } = useWeb3React()

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className="h-24 flex items-center justify-between">
          <div className="flex items-center justify-start w-1/2">
            <Logo />
          </div>
          <div className="flex items-center justify-end space-x-4 w-1/2">
            {!active &&
              <ButtonMenuItem
                onClick={handleOpen}>
                Connect wallet
              </ButtonMenuItem>
            }
            {active && <AccountButton />}
            <ButtonToggleTheme />
            <ButtonInfo />
          </div>
        </div>
      </div>
      {!active && <WalletModal show={isOpen} onClose={handleClose} />}
    </div>
  )
}

export default Header
