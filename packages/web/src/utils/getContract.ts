import { Web3Provider } from '@ethersproject/providers'
import { isAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract, ContractInterface } from '@ethersproject/contracts'

export const getSigner = (library: Web3Provider, account: string) =>
  library.getSigner(account).connectUnchecked()

export function getSignerOrProvider (library: Web3Provider, account?: string) {
  if (account) {
    return getSigner(library, account)
  }

  return library
}

export function getContract (
  address: string,
  ABI: ContractInterface,
  library: Web3Provider,
  account?: string
) {
  if (!isAddress(address) || address === AddressZero) {
    throw new Error(`Invalid 'address' parameter '${address}'.`)
  }

  const signerOrProvider = getSignerOrProvider(library, account)
  return new Contract(
    address,
    ABI,
    signerOrProvider
  )
}
