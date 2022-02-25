export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  LOCALHOST = 31337,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.LOCALHOST,
  SupportedChainId.GOERLI,
  SupportedChainId.RINKEBY,
  SupportedChainId.KOVAN,
  SupportedChainId.ROPSTEN,
  SupportedChainId.MAINNET
]
