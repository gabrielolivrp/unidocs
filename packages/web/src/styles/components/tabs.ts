import { Tabs as Tabs_ } from '@chakra-ui/theme/components'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

type TabsProps = typeof Tabs_

export const Tabs: TabsProps = {
  ...Tabs_,
  variants: {
    'soft-rounded': (props: StyleFunctionProps) => ({
      root: {
        bgColor: 'transparent'
      },
      tablist: {
        rounded: 'full',
        bgColor: 'blackAlpha.200'
      },
      tabpanels: {
        mt: '5',
        rounded: 'lg',
        bgColor: 'blackAlpha.200'
      },
      tab: {
        py: '3',
        color: 'blackAlpha'
      }
    })
  }
}
