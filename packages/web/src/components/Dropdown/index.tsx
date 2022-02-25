
import { Fragment } from 'react'
import { IconType } from 'react-icons'
import { Menu, Transition } from '@headlessui/react'

export interface DropdownItemProps {
  text: string
  icon?: IconType
  onClick: () => void
}

export const DropdownItem = ({ text, onClick, icon: Icon }: DropdownItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <button onClick={onClick} className={`${active && 'text-primary dark:text-primary'} group flex rounded-md items-center space-x-2 w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-50`}>
        {Icon && <Icon />}
        <label className="cursor-pointer">{text}</label>
      </button>
    )}
  </Menu.Item>
)

export interface DropdownProps {
  button: React.ReactNode,
  children: React.ReactNode
}

const Dropdown = ({ button, children }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div">{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right focus:outline-none">
          <div className="bg-white dark:bg-gray-800 divide-gray-100 shadow-lg px-1 py-1 rounded-md">
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
