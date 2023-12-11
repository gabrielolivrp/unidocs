import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected } from './../connectors'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
}

export const SUPPORTED_WALLETS: {
  [key: string]: WalletInfo
} = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: '/assets/images/metamask.png'
  },
  METAMASK2: {
    connector: injected,
    name: 'MetaMask2',
    iconURL: '/assets/images/metamask.png'
  }
}
