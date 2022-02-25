import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from './../../hooks'
import { getErrorMessage } from './../../utils'

export interface Web3ManagerProps {
  children: JSX.Element
}

const Web3Manager = ({ children }: Web3ManagerProps) => {
  const { active, error } = useWeb3React()

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager)

  if (triedEager && !active && error) {
    const errorMessage = getErrorMessage(error)

    return <div>{errorMessage}</div>
  }

  return children
}

export default Web3Manager
