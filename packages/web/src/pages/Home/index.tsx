import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import Dropzone from '../../components/Dropzone'
import Header from '../../components/Header'
import Documents from '../../components/Documents'
import ConfirmTransactionModal from '../../components/ConfirmTransactionModal'

const documents = [
  { name: 'photo.jpg', size: '600kb', mimiType: 'image' },
  { name: 'doc.pdf', size: '600kb', mimiType: 'application/pdf' },
  { name: 'video.mp4', size: '600kb', mimiType: 'video' },
  { name: 'audio.mp3', size: '600kb', mimiType: 'audio' }
]

const Home = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <VStack spacing="40">
      <Container maxW="container.lg">
        <Header />
      </Container>
      <Container
        maxW="container.lg"
        centerContent
      >
        <Box
          rounded="xl"
          shadow="md"
          border="1px"
          borderColor="blackAlpha.300"
          width="2xl"
          px="5"
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="purple"
            isFitted
          >
            <Box
              py="5"
              borderBottom="1px"
              borderColor="blackAlpha.300"
            >
              <TabList>
                <Tab>Upload Document</Tab>
                <Tab>My Documents</Tab>
              </TabList>
            </Box>
            <Box pb="5">
              <TabPanels bgColor="transparent">
                <TabPanel>
                  <Dropzone onFileUploaded={() => { }} />
                  <Box mt="5">
                    <Button
                      size="lg"
                      width="full"
                      rounded="full"
                      colorScheme="purple"
                      onClick={onOpen}
                    >
                      Upload
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Documents documents={documents} />
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
          <ConfirmTransactionModal
            isOpen={isOpen}
            onClose={onClose}
          />
        </Box>
      </Container>
    </VStack>
  )
}

export default Home
