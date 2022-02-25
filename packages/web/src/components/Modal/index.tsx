import { Fragment } from 'react'
import { MdClose } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'

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
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className='inline-block align-bottom bg-white dark:bg-gray-700 rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full'>
              <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <Dialog.Title as="h3" className="flex items-center justify-between leading-6 ">
                      <label className='font-semibold text-lg text-gray-700 dark:text-gray-50'>{title}</label>
                      <button onClick={onClose}>
                        <MdClose className="h-6 w-6 text-gray-700 dark:text-gray-50" aria-hidden="true" />
                      </button>
                    </Dialog.Title>
                    <div className="py-4 w-full text-gray-700 dark:text-gray-50">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
