import * as React from "react";
import { Dialog, DialogContent, Typography, Loader } from "@unidocs/ui";

interface LoadingDialogProps {
  title: string;
  body?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoadingDialog = ({
  title,
  body,
  open,
  onOpenChange,
}: LoadingDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="py-20 max-w-sm">
      <div className="flex justify-center">
        <Loader className="animate-spin" />
      </div>
      <Typography variant="h5" className="text-center">
        {title}
      </Typography>
      {!!body && body}
    </DialogContent>
  </Dialog>
);

export { LoadingDialog };
