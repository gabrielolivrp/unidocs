import { MdCallMade } from 'react-icons/md'
import { useWeb3React } from '@web3-react/core'
import { formatAddress } from './../../utils'
import Modal from './../../components/Modal'
import CopyToClipboard from './../../components/CopyToClipboard'
import Tabs, {
  TabItem,
  TabItems,
  TabPanels,
  TabPanel
} from './../../components/Tabs'
import { useDApp } from '../../contexts'

export interface AccountModalProps {
  open: boolean,
  onClose: () => void
}

const AccountModal = ({ onClose, open }: AccountModalProps) => {
  const { wallet, account } = useDApp()

  return (
    <Modal onClose={onClose} open={open} title="Account">
      <Tabs>
        <TabItems>
          <TabItem>
            Details
          </TabItem>
          <TabItem>
            Transactions
          </TabItem>
        </TabItems>
        <TabPanels>
          <TabPanel>
            <p className="font-semibold text-md">Connected with {wallet.name}</p>
            <h5 className="font-semibold text-md">{formatAddress(account!)}</h5>
            <div className="flex justify-between">
              <a
                className="flex items-center font-semibold text-xs"
                href="!#" // TODO: The link changes according to the selected network
                target="_blank" rel="noreferrer">
                View on explorer
                <MdCallMade className="ml-1" />
              </a>
              <CopyToClipboard text={account!}>
                <button className="flex items-center font-semibold text-xs">
                  Copy address
                </button>
              </CopyToClipboard>
            </div>
          </TabPanel>
          <TabPanel>
            <table className="w-full">
              <thead className="text-md">
                <tr className="flex justify-between">
                  <th>Transaction</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                <tr className="flex justify-between mt-2">
                  <th>0x3ee2...dd1d</th>
                  <th>Pedding</th>
                </tr>
                <tr className="flex justify-between mt-2">
                  <th>0x9ad1...AcDx</th>
                  <th>Pedding</th>
                </tr>
              </tbody>
            </table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Modal>
  )
}
export default AccountModal
