import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineFileUnknown,
  AiOutlineFileZip
} from 'react-icons/ai'

export interface DocumentIconProps {
  mimiType: string,
  size?: string | undefined
}

const DocumentIcon = ({ mimiType, size }: DocumentIconProps) => {
  if (mimiType.startsWith('image')) {
    return <AiOutlineFileImage size={size} />
  }
  if (mimiType.includes('application/pdf')) {
    return <AiOutlineFilePdf size={size} />
  }
  if (mimiType.includes('zip')) {
    return <AiOutlineFileZip size={size} />
  }
  return <AiOutlineFileUnknown size={size} />
}

export default DocumentIcon
