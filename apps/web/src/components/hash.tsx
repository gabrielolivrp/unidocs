import { Copy, Typography } from "@unidocs/ui";
import { toast } from "sonner";

interface HashProps {
  text: string;
}

const format = (text: string) => {
  const prefix = text.substring(0, 4);
  const suffix = text.substring(text.length - 6);
  return `${prefix}...${suffix}`;
};

const Hash = ({ text }: HashProps) => (
  <Copy onCopied={() => toast.success("Copied successfully")} text={text}>
    <Typography variant="p">{format(text)}</Typography>
  </Copy>
);

export { Hash };
