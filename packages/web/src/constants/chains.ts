export enum SupportedChainId {
  MAINNET = 1,
  LOCALHOST = 31337,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.LOCALHOST
]

interface ChainInfo {
  readonly name: string
  readonly explorer: string
}

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    name: 'MainNet',
    explorer: 'https://etherscan.io/'
  },
  [SupportedChainId.LOCALHOST]: {
    name: 'Localhost',
    explorer: ''
  }
} as { [chainId: number]: ChainInfo }
