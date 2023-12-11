import {
  Table,
  Tbody,
  Td,
  Tr,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { MdOutlineMoreVert } from 'react-icons/md'
import DocumentIcon from '../DocumentIcon'

interface Document {
  name: string,
  size: string,
  mimiType: string
}

interface DocumentItemProps {
  document: Document
}

const DocumentItem = ({ document }: DocumentItemProps) => (
  <Tr px="0">
    <Td>
      <DocumentIcon mimiType={document.mimiType} />
    </Td>
    <Td>
      {document.name}
    </Td>
    <Td>
      <Badge>{document.size}</Badge>
    </Td>
    <Td>
      <Menu>
        <MenuButton
          as={IconButton}
          size="xs"
          bgColor="transparent"
          aria-label="Open more info dropdown"
          icon={<MdOutlineMoreVert size="1.5rem" />}
        />
        <MenuList>
          <MenuItem>Show</MenuItem>
          <MenuItem>Transfer</MenuItem>
        </MenuList>
      </Menu>
    </Td>
  </Tr>
)

export interface ListDocumentsProps {
  documents: Document[]
}

const Documents = ({ documents }: ListDocumentsProps) => (
  <Table p="0">
    <Tbody p="0">
      {documents.map((doc, index) =>
        <DocumentItem document={doc} key={index} />
      )}
    </Tbody>
  </Table>
)

export default Documents
