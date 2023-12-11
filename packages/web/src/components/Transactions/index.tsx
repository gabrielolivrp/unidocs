import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Badge
} from '@chakra-ui/react'

const Transaction = () => (
  <Tr>
    <Th>0x3ee2...dd1d</Th>
    <Th>
      <Badge colorScheme="blue">Pedding</Badge>
    </Th>
  </Tr>
)

export interface TransactionsProps { }

const Transactions = () => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Transaction</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </Tbody>
    </Table>
  )
}

export default Transactions
