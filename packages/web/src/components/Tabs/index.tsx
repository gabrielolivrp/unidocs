import { Tab } from '@headlessui/react'

interface TabItemsProps {
  children: React.ReactNode
}

export const TabItems = ({ children }: TabItemsProps) => (
  <Tab.List className="flex p-1 space-x-1 bg-gray-200 dark:bg-gray-800 rounded-full">
    {children}
  </Tab.List>
)

interface TabItemProps {
  children: React.ReactNode
}

export const TabItem = ({ children }: TabItemProps) => (
  <Tab className={({ selected }) => {
    const base = 'w-full py-2 text-md leading-5 font-semibold rounded-full dark:text-gray-50'
    return selected
      ? `${base} text-white bg-primary`
      : `${base} text-gray-700`
  }}>
    {children}
  </Tab>
)

interface TabPanelsProps {
  children: React.ReactNode
}

export const TabPanels = ({ children }: TabPanelsProps) => (
  <Tab.Panels className="mt-4">
    {children}
  </Tab.Panels>
)

interface TabPanelProps {
  children: React.ReactNode
}

export const TabPanel = ({ children }: TabPanelProps) => (
  <Tab.Panel className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-50 rounded-xl">
    <div className="space-y-4 p-3 focus:outline-none">
      {children}
    </div>
  </Tab.Panel>
)

interface TabsProps {
  children: React.ReactNode
}

const Tabs = ({ children }: TabsProps) => (
  <Tab.Group defaultIndex={0}>
    {children}
  </Tab.Group>
)

export default Tabs
