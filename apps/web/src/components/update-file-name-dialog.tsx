import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@unidocs/ui";
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { useTransactor } from "@/hooks";

interface UpdateFileNameDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateFileNameDialog = ({
  file,
  open,
  onOpenChange,
}: UpdateFileNameDialogProps) => {
  const [filename, setFilename] = useState(file.currentVersion.filename);
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
  const { updateFileName } = useUnidocs();

  useEffect(() => setFormError(""), [filename]);

  const onSubmit = () => {
    if (!filename || filename === file.currentVersion.filename) {
      setFormError("Filename is required");
      return;
    }
    return writeTx(() =>
      updateFileName({
        file,
        filename,
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Filename</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <Input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <FormMessage>{formError}</FormMessage>
          </FormItem>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!filename || filename === file.currentVersion.filename}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { UpdateFileNameDialog };
