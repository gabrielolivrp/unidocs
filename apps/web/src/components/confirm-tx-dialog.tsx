import { useAccount } from "wagmi";
import { Icon, Typography } from "@unidocs/ui";
import { formatBytes } from "@/helpers";
import ConfirmDialog from "./confirm-dialog";

interface ConfirmTxDialogProps {
  file: File;
  open: boolean;
  filename?: string;
  description?: string;
  onConfirmTransaction: () => void;
  onOpenChange: (open: boolean) => void;
}

const ConfirmTxDialog = ({
  file,
  filename,
  description,
  open,
  onConfirmTransaction,
  onOpenChange,
}: ConfirmTxDialogProps) => {
  const { chain, connector } = useAccount();

  return (
    <ConfirmDialog
      open={open}
      title="Review Upload"
      onOpenChange={onOpenChange}
      onConfirm={onConfirmTransaction}
    >
      <div className="flex justify-center my-4">
        <Icon name="UploadCloud" className="w-14 h-14" />
      </div>
      <table className="table">
        <tbody>
          {!!filename && (
            <tr>
              <td className="p-1">
                <Typography variant="p">Filename</Typography>
              </td>
              <td className="p-1 text-right">
                <Typography variant="p">{filename}</Typography>
              </td>
            </tr>
          )}
          {!!description && (
            <tr>
              <td className="p-1">
                <Typography variant="p">Description</Typography>
              </td>
              <td className="p-1 text-right">
                <Typography variant="p">{description}</Typography>
              </td>
            </tr>
          )}
          <tr>
            <td className="p-1">
              <Typography variant="p">Filesize</Typography>
            </td>
            <td className="p-1 text-right">
              <Typography variant="p">{formatBytes(file.size)}</Typography>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="bg-secondary rounded-lg p-1">
        <table className="table w-full">
          <tbody>
            <tr>
              <td className="p-1">
                <Typography variant="p">Network</Typography>
              </td>
              <td className="p-1 text-right">
                <Typography variant="p">{chain?.name}</Typography>
              </td>
            </tr>
            <tr>
              <td className="p-1">
                <Typography variant="p">Wallet used</Typography>
              </td>
              <td className="p-1 text-right">
                <Typography variant="p">{connector?.name}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ConfirmDialog>
  );
};

export { ConfirmTxDialog };
