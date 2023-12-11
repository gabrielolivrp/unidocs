import {
  extendTheme,
  type Colors,
  type ThemeConfig
} from '@chakra-ui/react'
// import { StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Tabs, Modal } from './components'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const colors: Colors = {}

const theme = extendTheme({
  config,
  colors,
  components: {
    Tabs,
    Modal
  }
})

export default theme
