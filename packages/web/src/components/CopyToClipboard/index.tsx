import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import Tooltip from './../../components/Tooltip'

export interface CopyToClipboardProps {
  text: string
  children: React.ReactNode
}

const CopyToClipboard = ({ text, children }: CopyToClipboardProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  const handleTooltip = () => {
    setIsDisplayed(true)
    setTimeout(() => {
      setIsDisplayed(false)
    }, 1000)
  }

  const handleCopy = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(text).then(() => handleTooltip())
    } else {
      // TODO: Make copy...
    }
  }

  return (
    <div className="flex items-center cursor-pointer space-x-1 relative" onClick={handleCopy}>
      {children}
      <MdContentCopy className="h-4 w-4" />
      <Tooltip isDisplayed={isDisplayed}>Copied</Tooltip>
    </div>
  )
}

export default CopyToClipboard
