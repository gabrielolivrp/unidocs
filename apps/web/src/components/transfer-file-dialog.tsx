import { toast } from "sonner";
import { Address, isAddress } from "viem";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormLabel,
  FormItem,
  Input,
  FormMessage,
} from "@unidocs/ui";
import { Unidocs, useTransferFile } from "@unidocs/use-unidocs";
import { useTransactor } from "@/hooks";

interface TransferFileProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransferFile = ({ file, open, onOpenChange }: TransferFileProps) => {
  const [account, setAccount] = useState("");
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
  const { transferFile } = useTransferFile();

  useEffect(() => setFormError(""), [account]);

  const onSubmit = () => {
    if (!account || !isAddress(account)) {
      setFormError("Invalid account address");
      return;
    }

    return writeTx(() =>
      transferFile({
        file,
        account: account as Address,
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <FormItem>
            <FormLabel>Account address</FormLabel>
            <Input
              placeholder="0x..."
              onChange={(e) => setAccount(e.target.value)}
            />
            <FormMessage>{formError}</FormMessage>
          </FormItem>
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button disabled={!account} onClick={onSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { TransferFile };
