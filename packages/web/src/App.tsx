import { ChakraProvider } from '@chakra-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider
} from '@ethersproject/providers'
import { DAppProvider } from './contexts'
import Web3Manager from './components/Web3Manager'
import Home from './pages/Home'
import theme from './styles/theme'

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider)

  library.detectNetwork()
    .then((network) =>
      console.log('Detected Network ', network)
    )

  return library
}

const App = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3Manager>
      <DAppProvider>
        <ChakraProvider theme={theme}>
          <Home />
        </ChakraProvider>
      </DAppProvider>
    </Web3Manager>
  </Web3ReactProvider>
)

export default App
