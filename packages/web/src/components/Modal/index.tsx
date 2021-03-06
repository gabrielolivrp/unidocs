import { Fragment } from 'react'
import { MdClose } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'
import Card from '../Card'

interface CloseModalButtonProps {
  onClick: () => void
}

const CloseModalButton = ({ onClick }: CloseModalButtonProps) => (
  <button onClick={onClick}>
    <MdClose className="h-6 w-6 text-gray-700 dark:text-gray-50" aria-hidden="true" />
  </button>
)

export interface ModalProps {
  children: React.ReactNode
  title: string
  open: boolean
  onClose: () => void
}

const Modal = ({ children, title, open = false, onClose }: ModalProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-8 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-40 transition-opacity" />
          </Transition.Child>
          <span className="hidden" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="overflow-hidden transform transition-all w-full sm:max-w-md">
              <Card
                title={title}
                action={<CloseModalButton onClick={onClose} />}
              >
                {children}
              </Card>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
