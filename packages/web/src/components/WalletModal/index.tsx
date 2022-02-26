import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { MdOutlineDataUsage } from 'react-icons/md'
import { SUPPORTED_WALLETS, WalletInfo } from './../../constants/wallets'
import Modal from './../../components/Modal'

interface WalletProps {
  wallet: WalletInfo
  onClick: () => void
}

const Wallet = ({ wallet, onClick }: WalletProps) => (
  <div
    className="flex justify-between items-center cursor-pointer p-3 rounded-lg border border-gray-200 dark:border-gray-700"
    onClick={onClick}>
    <label className="font-medium text-md text-gray-700 dark:text-gray-50 cursor-pointer">
      {wallet.name}
    </label>
    <img className="w-8 h-8" src={wallet.iconURL} alt={wallet.name} />
  </div>
)

export interface WalletModalProps {
  show: boolean
  onClose: () => void
}

const WalletModal = ({ show, onClose }: WalletModalProps) => {
  const { activate } = useWeb3React()
  const [hasError, setHasError] = useState(false)
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [pendding, setPendding] = useState(false)

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    if (connector) {
      setPendding(true)

      activate(connector, undefined, true)
        .then(() => onClose())
        .catch(() => setHasError(true))
        .finally(() => setPendding(false))
    }
  }

  const handleActivation = async (wallet: WalletInfo) => {
    setWallet(wallet)
    await tryActivation(wallet?.connector)
  }

  const tryActivationAgain = async () => {
    setHasError(false)
    // TODO: Problem in wallet
    await tryActivation(wallet?.connector)
  }

  const handleClose = () => {
    onClose()
    setHasError(false)
    setPendding(false)
    setWallet(null)
  }

  return (
    <Modal title="Connect a wallet" open={show} onClose={handleClose}>
      <div className="flex flex-col space-y-4">
        {!pendding && !hasError &&
          Object.keys(SUPPORTED_WALLETS).map(key => {
            const wallet = SUPPORTED_WALLETS[key]
            return (
              <Wallet
                key={key}
                wallet={wallet}
                onClick={() => handleActivation(wallet)}
              />
            )
          })}
      </div>
      {pendding && (
        <div className="flex flex-col">
          <p className="font-medium text-left text-md text-gray-700 dark:text-gray-50">
            Waiting your permission for connection in your <b>{wallet?.name}</b>
          </p>
          <div className="flex items-center mt-4">
            <MdOutlineDataUsage size="1rem" className="animate-spin text-gray-700 dark:text-gray-50" />
            <label className="ml-2 font-medium text-left text-sm text-gray-700 dark:text-gray-50">Waiting...</label>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center">
          <label className="font-medium text-left text-md text-gray-700 dark:text-gray-50">
            Error connecting
            <span className="ml-1 text-blue-500 cursor-pointer" onClick={tryActivationAgain}>Try again</span>.
          </label>
        </div>
      )}
    </Modal>
  )
}

export default WalletModal
