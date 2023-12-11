import { Modal as Modal_ } from '@chakra-ui/theme/components'

type ModalProps = typeof Modal_

export const Modal: ModalProps = {
  ...Modal_,
  baseStyle: () => ({
    dialog: {
      pb: '5',
      rounded: 'xl',
      shadow: 'md',
      border: '1px',
      borderColor: 'blackAlpha.300'
    }
  })
}
