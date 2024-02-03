"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import ConfirmDialog from "@/components/confirm-dialog";

export type ConfirmParams = {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

type ConfirmContextProps = (data: ConfirmParams) => void;

const ConfirmContext = createContext<ConfirmContextProps | null>(null);

interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [open, setOpen] = useState(false);
  const [confirmParams, setConfirmParams] = useState<ConfirmParams | null>(
    null
  );

  const confirm = useCallback((params: ConfirmParams) => {
    setOpen(true);
    setConfirmParams(params);
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirmParams) {
      confirmParams.onConfirm();
      setOpen(false);
      setConfirmParams(null);
    }
  }, [confirmParams]);

  const handleCancel = useCallback(() => {
    if (confirmParams) {
      if (confirmParams.onCancel) {
        confirmParams.onCancel();
      }
      setOpen(false);
      setConfirmParams(null);
    }
  }, [confirmParams]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {confirmParams && (
        <ConfirmDialog
          title={confirmParams.title}
          message={confirmParams.message}
          open={open}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmContextProps => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmContextProvider");
  }

  return context;
};
