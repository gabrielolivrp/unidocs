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

interface UpdateFileDescriptionDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateFileDescriptionDialog = ({
  file,
  open,
  onOpenChange,
}: UpdateFileDescriptionDialogProps) => {
  const [description, setDescription] = useState(
    file.currentVersion.description
  );
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
  const { updateFileDescription } = useUnidocs();

  useEffect(() => setFormError(""), [description]);

  const onSubmit = () => {
    if (!description || description === file.currentVersion.description) {
      setFormError("Description is required");
      return;
    }
    return writeTx(() =>
      updateFileDescription({
        file,
        description,
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Description</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormMessage>{formError}</FormMessage>
          </FormItem>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Cancel
          </Button>
          <Button
            disabled={
              !description || description === file.currentVersion.description
            }
            onClick={onSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { UpdateFileDescriptionDialog };
