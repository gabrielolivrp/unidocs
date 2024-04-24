import { Address } from "viem";
import { Avatar, AvatarFallback, AvatarImage } from "@unidocs/ui";

interface AccountAvatarProps {
  address: Address | string;
  className?: string;
}

const AccountAvatar = ({ address, className }: AccountAvatarProps) => {
  const fallback = address.substring(2, 4);
  return (
    <Avatar className={className}>
      <AvatarImage src={`https://effigy.im/a/${address}.png`} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export { AccountAvatar };
