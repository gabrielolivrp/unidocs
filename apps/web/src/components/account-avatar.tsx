import { Address } from "viem";
import { Avatar, AvatarFallback, AvatarImage } from "@unidocs/ui";

interface AccountAvatarProps {
  address: Address | string;
}

const AccountAvatar = ({ address }: AccountAvatarProps) => {
  const fallback = address.substring(2, 4);
  return (
    <Avatar>
      <AvatarImage src={`https://effigy.im/a/${address}.png`} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export { AccountAvatar };
