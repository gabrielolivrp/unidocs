import * as React from "react";
import { Dialog, DialogContent, Icon, Loader, Typography } from "@unidocs/ui";

interface AlertDialogProps {
  variant: "success" | "error";
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const icon = (variant: "success" | "error") => {
  switch (variant) {
    case "success":
      return "CheckCircle";
    case "error":
      return "XCircle";
  }
};

const AlertDialog = ({
  variant,
  children,
  open,
  onOpenChange,
}: AlertDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="py-20 max-w-sm">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Typography variant="h3">Success</Typography>
        <Icon name={icon(variant)} size="5rem" />
      </div>
      {children}
    </DialogContent>
  </Dialog>
);

export { AlertDialog };
