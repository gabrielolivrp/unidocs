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
  const [accessControl, setAccessControl] =
    useState<Unidocs.AccessControl | null>(null);
  const [permission, setPermission] = useState<Unidocs.Permission>("READ");
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
  const { shareFile, revokeFileAccess, updateAccessPermission } = useUnidocs();

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
        permission,
      })
    );
  };

  const handleRemove = (accessControl: Unidocs.AccessControl) =>
    writeTx(() =>
      revokeFileAccess({
        fileId: file.fileId,
        account: accessControl.account,
      })
    );

  const handleOpenAccessUpdate = (accessControl: Unidocs.AccessControl) => {
    setAccessUpdateModal(true);
    setPermission(accessControl.permission);
    setAccessControl(accessControl);
  };

  const handleUpdateAccessPermission = () => {
    if (!accessControl) return;

    return writeTx(() =>
      updateAccessPermission({
        fileId: file.fileId,
        ...accessControl,
        permission,
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
                    defaultValue={permission}
                    onValueChange={(value) =>
                      setPermission(value as Unidocs.Permission)
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
              {file.accessControls.map((accessControl, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <AccountAvatar
                        address={accessControl.account as Address}
                      />
                      <Hash text={accessControl.account as Address} />
                    </div>
                  </td>
                  <td>
                    <Badge className="lowercase">
                      {accessControl.account === address
                        ? "OWNER"
                        : accessControl.permission}
                    </Badge>
                  </td>
                  <td>
                    {accessControl.account !== address && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Icon name="MoreVertical"></Icon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleRemove(accessControl)}
                          >
                            Remove
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenAccessUpdate(accessControl)
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

      {accessControl && (
        <Dialog open={accessUpdateModal} onOpenChange={setAccessUpdateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Update Access <Hash text={accessControl.account} />
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col">
              <FormItem className="col-span-2">
                <FormLabel>Permission</FormLabel>
                <Select
                  defaultValue={permission}
                  onValueChange={(value) =>
                    setPermission(value as Unidocs.Permission)
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
              <Button onClick={handleUpdateAccessPermission}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export { ShareFileDialog };
