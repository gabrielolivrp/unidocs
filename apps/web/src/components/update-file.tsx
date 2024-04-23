import { toast } from "sonner";
import { useState } from "react";
import {
  Button,
  FormItem,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
  FormLabel,
} from "@unidocs/ui";
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { useTransactor } from "@/hooks";
import { ConfirmTxDialog } from "./confirm-tx-dialog";
import { Dropzone } from "./dropzone";

interface UpdateFileProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateFile = ({ file, open, onOpenChange }: UpdateFileProps) => {
  const [nodeFile, setNodeFile] = useState<File | null>(null);
  const [confirmTxDialog, setConfirmTxDialog] = useState(false);

  const { updateFile } = useUnidocs();

  const writeTx = useTransactor({
    onStart: () => {
      onOpenChange(false);
      setConfirmTxDialog(false);
    },
    onError: (err) => {
      onOpenChange(true);
      toast(err);
    },
    onSuccess: () => {
      onOpenChange(false);
      handleReset();
      toast("Transaction completed successfully");
    },
  });

  const handleReset = () => {
    setNodeFile(null);
  };

  const handleConfirmTransaction = async () => {
    if (!nodeFile) return;
    return writeTx(() =>
      updateFile({
        file,
        nodeFile: nodeFile,
      })
    );
  };

  const handleReview = () => {
    if (!nodeFile) {
      toast.error("File is required");
      return;
    }
    setConfirmTxDialog(true);
  };

  const handleDropAccepted = (file: File) => setNodeFile(file);

  const handleDropRejected = () => console.log("onDropRejected");

  const handleDropRemove = () => setNodeFile(null);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update File</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <FormItem>
              <FormLabel>
                File <span className="text-red-500">*</span>
              </FormLabel>
              <Dropzone
                onAccept={handleDropAccepted}
                onReject={handleDropRejected}
                onRemove={handleDropRemove}
              />
            </FormItem>

            <SheetFooter>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button disabled={!nodeFile} onClick={handleReview}>
                Upload
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {nodeFile && (
        <ConfirmTxDialog
          file={nodeFile}
          open={confirmTxDialog}
          onConfirmTransaction={handleConfirmTransaction}
          onOpenChange={setConfirmTxDialog}
        />
      )}
    </>
  );
};

export { UpdateFile };
