import { useEffect, useState } from 'react'
import { parseEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

const DEFAULT_BALANCE = '0'

export function useBalance () {
  const { account, library, chainId } = useWeb3React<Web3Provider>()
  const [balance, setBalance] = useState(parseEther(DEFAULT_BALANCE))

  useEffect(() => {
    if (!!account && !!library) {
      library.on('block', () => {
        library.getBalance(account)
          .then(newBalance => {
            if (!newBalance.eq(balance)) {
              setBalance(newBalance)
            }
          })
      })
    }
  }, [account, library, chainId])

  return balance
}
