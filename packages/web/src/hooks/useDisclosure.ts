import { useState } from 'react'

export function useDisclosure () {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)
  const handleToggle = () => setIsOpen(open => !open)

  return { isOpen, handleOpen, handleClose, handleToggle }
}
