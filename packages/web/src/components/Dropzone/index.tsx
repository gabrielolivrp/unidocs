import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import DocumentIcon from '../DocumentIcon'

type State =
  | 'Active'
  | 'Reject'
  | 'Default'

const getDropzoneColor = (state: State) => {
  switch (state) {
    case 'Active':
      return 'green.200'
    case 'Reject':
      return 'red.200'
    case 'Default':
      return 'blackAlpha'
  }
}

const getDropzoneBorderColor = (state: State) => {
  switch (state) {
    case 'Active':
      return 'green.200'
    case 'Reject':
      return 'red.200'
    case 'Default':
      return 'blackAlpha.400'
  }
}

const getDropzoneText = (state: State) => {
  switch (state) {
    case 'Active':
      return 'Drop the file here...'
    case 'Reject':
      return 'Invalid file type'
    case 'Default':
      return 'Click to browse or drag and drop your files'
  }
}

interface FilePreviewProps {
  file: File
  onRemove: () => void
}

const FilePreview = ({ file, onRemove }: FilePreviewProps) => (
  <Box
    h="70%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    position="relative"
    borderRadius="xl"
    shadow="md"
  >
    <DocumentIcon
      size="90%"
      mimiType={file.type}
    />
    <IconButton
      aria-label="asdas"
      size="xs"
      icon={<MdClose />}
      top="0"
      right="0"
      bgColor="transparent"
      position="absolute"
      onClick={onRemove}
    />
  </Box>
)

export interface DropzoneProps {
  onFileUploaded: (file: File) => void
}

const Dropzone = ({ onFileUploaded }: DropzoneProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [state, setState] = useState<State>('Default')

  const onDrop = useCallback(acceptedFiles => {
    setSelectedFile(acceptedFiles[0])
    onFileUploaded(acceptedFiles[0])
  }, [onFileUploaded])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    noClick: selectedFile !== null,
    onDrop,
    maxFiles: 1
  })

  useEffect(() => {
    if (isDragReject) {
      setState('Reject')
    } else {
      if (isDragActive) {
        setState('Active')
      } else {
        setState('Default')
      }
    }
  }, [isDragActive, isDragReject])

  const onRemove = () => {
    setSelectedFile(null)
  }

  return (
    <Box
      p="5"
      h="64"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="3px"
      borderRadius="xl"
      borderStyle="dashed"
      borderColor={getDropzoneBorderColor(state)}
      color={getDropzoneColor(state)}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {selectedFile
        ? <FilePreview file={selectedFile} onRemove={onRemove} />
        : <Text>{getDropzoneText(state)}</Text>}
    </Box >
  )
}

export default Dropzone
