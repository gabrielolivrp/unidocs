import { useState } from "react";
import { Icon } from "./icon";

interface CopyProps {
  text: string;
  children: React.ReactNode;
  onCopied?: () => void;
}

const Copy = ({ children, text, onCopied }: CopyProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    // @ts-ignore
    navigator.clipboard.writeText(text);
    onCopied && onCopied();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center transition-all cursor-pointer group/item"
    >
      {children}
      <Icon
        name={copied ? "CopyCheck" : "Copy"}
        className="bg-transparent group-hover/item:inline-block hidden ml-1 w-5 h-5"
      />
    </button>
  );
};

export { Copy };
