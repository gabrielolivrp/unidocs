import { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  FormItem,
  Input,
  FormLabel,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetFooter,
} from "@unidocs/ui";
import { useUnidocs } from "@unidocs/use-unidocs";
import { useTransactor } from "@/hooks";
import { Dropzone } from "./dropzone";
import { ConfirmTxDialog } from "./confirm-tx-dialog";

interface UploadFileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadFile = ({ open, onOpenChange }: UploadFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [confirmTxDialog, setConfirmTxDialog] = useState(false);
  const { storeFile } = useUnidocs();

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
      onReset();
      toast("Transaction completed successfully");
    },
  });

  const onDropRejected = () => console.log("rejected");
  const onDropAccepted = (file: File) => {
    setFile(file);
    setFilename(file.name.split(".").slice(0, -1).join("."));
  };
  const onDropRemove = () => setFile(null);

  const onReset = () => {
    setFile(null);
    setDescription("");
  };

  const onSubmit = () => {
    if (!file) {
      toast.error("File is required");
      return;
    }
    setConfirmTxDialog(true);
  };

  const onConfirm = async () => {
    if (!file) return;
    return writeTx(() =>
      storeFile({
        file,
        filename,
        description,
      })
    );
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Upload File</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormItem>

            <FormItem>
              <FormLabel>
                File <span className="text-red-500">*</span>
              </FormLabel>
              <Dropzone
                onAccept={onDropAccepted}
                onReject={onDropRejected}
                onRemove={onDropRemove}
              />
            </FormItem>

            <SheetFooter>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button disabled={!file} onClick={onSubmit}>
                Upload
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
      {file && (
        <ConfirmTxDialog
          file={file}
          filename={filename}
          description={description}
          open={confirmTxDialog}
          onConfirmTransaction={onConfirm}
          onOpenChange={setConfirmTxDialog}
        />
      )}
    </>
  );
};

export { UploadFile };
