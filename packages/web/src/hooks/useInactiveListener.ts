import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from './../connectors'

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('andling "connect" event')
        activate(injected)
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log('andling "chainChanged" event with payload', chainId)
        activate(injected)
      }

      const handleAccountsChanged = (accounts: string[]) => {
        console.log('andling "accountsChanged" event with payload', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      const handleNetworkChanged = (networkId: string | number) => {
        console.log('andling "networkChanged" event with payload', networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}
