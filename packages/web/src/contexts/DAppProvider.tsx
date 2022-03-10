import { useWeb3React } from '@web3-react/core'
import { createContext, useContext, useState } from 'react'
import { SupportedChainId } from '../constants/chains'
import { SUPPORTED_WALLETS, WalletInfo } from '../constants/wallets'
import { useBalance } from '../hooks'

export interface DAppContextData {
  chain: SupportedChainId
  wallet: WalletInfo
  setWallet: (wallet: WalletInfo) => void,
  active: boolean
  account: string | null
  balance: any | null
}

export const dAppContextDefaultValues: DAppContextData = {
  chain: SupportedChainId.LOCALHOST,
  wallet: SUPPORTED_WALLETS.METAMASK,
  setWallet: () => { },
  active: false,
  account: null,
  balance: null
}

export const DAppContext = createContext<DAppContextData>(
  dAppContextDefaultValues
)

export interface DAppProviderProps {
  children: React.ReactNode
}

export const DAppProvider = ({ children }: DAppProviderProps) => {
  const [wallet, setWallet] = useState(SUPPORTED_WALLETS.METAMASK)
  const balance = useBalance()
  const { active, account, chainId } = useWeb3React()

  return (
    <DAppContext.Provider value={{
      active,
      wallet,
      setWallet,
      account: account!,
      chain: chainId!,
      balance
    }}>
      {children}
    </DAppContext.Provider>
  )
}

export const useDApp = () => useContext(DAppContext)
