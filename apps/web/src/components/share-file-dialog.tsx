import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@unidocs/ui";
import { formatBytes } from "@/helpers";
import { Hash } from "./hash";
import { AccountAvatar } from "./account-avatar";
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { Address, isAddress } from "viem";
import { useTransactor } from "@/hooks";

interface ShareFileDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareFileDialog = ({
  file,
  open,
  onOpenChange,
}: ShareFileDialogProps) => {
  const [account, setAccount] = useState("");
  const [permission, setPermission] = useState<Unidocs.Access>("READ");
  const [formError, setFormError] = useState("");
  const writeTx = useTransactor({
    onError: (err) => {
      toast(err);
    },
    onSuccess: () => {
      toast("Transaction completed successfully");
      onOpenChange(false);
    },
  });
  const { address } = useAccount();
  const { shareFile, revokeAccess } = useUnidocs();

  useEffect(() => setFormError(""), [account]);

  const onSubmit = () => {
    if (!account || !isAddress(account)) {
      setFormError("Invalid account address");
      return;
    }

    if (!permission) {
      setFormError("Permission is required");
      return;
    }

    return writeTx(() =>
      shareFile({
        fileId: file.fileId,
        account: account as Address,
        access: permission,
      })
    );
  };

  const handleRemove = (
    file: Unidocs.File,
    accountPermission: Unidocs.AccountAccess
  ) =>
    writeTx(() =>
      revokeAccess({
        fileId: file.fileId,
        account: accountPermission.account,
      })
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-4">
            <FormItem className="col-span-2">
              <FormLabel>Account address</FormLabel>
              <Input
                placeholder="0x..."
                onChange={(e) => setAccount(e.target.value)}
              />
            </FormItem>
            <div className="grid grid-cols-3 gap-4">
              <FormItem className="col-span-2">
                <FormLabel>Permission</FormLabel>
                <Select
                  defaultValue={permission}
                  onValueChange={(value) =>
                    setPermission(value as Unidocs.Access)
                  }
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="READ">Read</SelectItem>
                    <SelectItem value="WRITE">Write</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              <div className="flex items-end">
                <Button
                  disabled={!account || !permission}
                  variant="ghost"
                  size="icon"
                >
                  <Icon
                    name="Plus"
                    onClick={onSubmit}
                    className="cursor-pointer"
                  />
                </Button>
              </div>
            </div>
          </div>
          <FormMessage>{formError}</FormMessage>
        </div>

        <table className=" border-spacing-2">
          <tbody>
            {file.permissions.map((accountPermission, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <AccountAvatar
                      address={accountPermission.account as Address}
                    />
                    <Hash text={accountPermission.account as Address} />
                  </div>
                </td>
                <td>
                  <Badge className="lowercase">
                    {accountPermission.account === address
                      ? "OWNER"
                      : accountPermission.access}
                  </Badge>
                </td>
                <td>
                  {accountPermission.account !== address && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Icon name="MoreVertical"></Icon>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleRemove(file, accountPermission)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export { ShareFileDialog };
