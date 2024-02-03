"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@unidocs/ui";

type ConfirmDialogProps = {
  title: string;
  message: string;
  open: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
};

const ConfirmDialog = ({
  title,
  open,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <p>{message}</p>
      <DialogFooter>
        <Button autoFocus variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ConfirmDialog;
