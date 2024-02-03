"use client";
import * as React from "react";
import { Dialog, DialogContent, Typography, Loader } from "@unidocs/ui";

interface LoadingDialogProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const LoadingDialog = ({ message, open, onClose }: LoadingDialogProps) => (
  <Dialog size="sm" onClose={onClose} open={open}>
    <DialogContent className="py-20">
      <div className="flex justify-center">
        <Loader className="animate-spin" />
      </div>
      <Typography as="h5" className="text-center">
        {message}
      </Typography>
    </DialogContent>
  </Dialog>
);

export { LoadingDialog };
