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
  children: React.ReactNode;
  open: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void | Promise<void>;
};

const ConfirmDialog = ({
  title,
  open,
  children,
  onConfirm,
  onCancel,
  onOpenChange,
}: ConfirmDialogProps) => {
  const handleCancel = () => {
    onOpenChange(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button autoFocus variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
