import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { getContract } from './../utils'

export function useContract<T extends Contract = Contract> (
  address: string,
  ABI: ContractInterface,
  withSignerIfPossible = true
) {
  const { library, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      throw new Error('Invalid paramters')
    }

    const contract = getContract(
      address,
      ABI,
      library,
      withSignerIfPossible && account ? account : undefined
    ) as T

    return contract
  }, [address, ABI, library, chainId, withSignerIfPossible, account])
}
