import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
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
  const [formError, setFormError] = useState("");
  const [accountAccess, setAccountAccess] =
    useState<Unidocs.AccountAccess | null>(null);
  const [access, setAccess] = useState<Unidocs.Access>("READ");
  const [accessUpdateModal, setAccessUpdateModal] = useState(false);
  const writeTx = useTransactor({
    onError: (err) => {
      toast(err);
    },
    onSuccess: () => {
      toast("Transaction completed successfully");
      onOpenChange(false);
      setAccessUpdateModal(false);
    },
  });
  const { address } = useAccount();
  const { shareFile, revokeAccess, accessUpdate } = useUnidocs();

  useEffect(() => setFormError(""), [account]);

  const onSubmit = () => {
    if (!account || !isAddress(account)) {
      setFormError("Invalid account address");
      return;
    }

    if (!access) {
      setFormError("Permission is required");
      return;
    }

    return writeTx(() =>
      shareFile({
        fileId: file.fileId,
        account: account as Address,
        access,
      })
    );
  };

  const handleRemove = (accountPermission: Unidocs.AccountAccess) =>
    writeTx(() =>
      revokeAccess({
        fileId: file.fileId,
        account: accountPermission.account,
      })
    );

  const handleOpenAccessUpdate = (accountPermission: Unidocs.AccountAccess) => {
    setAccessUpdateModal(true);
    setAccess(accountPermission.access);
    setAccountAccess(accountPermission);
  };

  const handleAccessUpdate = () => {
    if (!accountAccess) return;

    return writeTx(() =>
      accessUpdate({
        fileId: file.fileId,
        account: accountAccess.account,
        access,
      })
    );
  };

  return (
    <>
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
                    defaultValue={access}
                    onValueChange={(value) =>
                      setAccess(value as Unidocs.Access)
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
                    disabled={!account || !access}
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
                            onClick={() => handleRemove(accountPermission)}
                          >
                            Remove
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenAccessUpdate(accountPermission)
                            }
                          >
                            Update Access
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

      {accountAccess && (
        <Dialog open={accessUpdateModal} onOpenChange={setAccessUpdateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Update Access <Hash text={accountAccess.account} />
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col">
              <FormItem className="col-span-2">
                <FormLabel>Permission</FormLabel>
                <Select
                  defaultValue={access}
                  onValueChange={(value) => setAccess(value as Unidocs.Access)}
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
              <FormMessage>{formError}</FormMessage>
            </div>
            <DialogFooter>
              <Button
                autoFocus
                variant="outline"
                onClick={() => setAccessUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAccessUpdate}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export { ShareFileDialog };
